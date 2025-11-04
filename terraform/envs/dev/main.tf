terraform {
  required_version = ">=1.6.0"
  backend "s3" {
    bucket = "meu-terraform-states"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

locals {
  prefix = "${var.project}-${var.environment}"
  azs    = ["us-east-1a","us-east-1b"]
}

module "vpc" {
  source     = "../../modules/vpc"
  name       = "${local.prefix}-vpc"
  cidr_block = "10.10.0.0/16"
  azs        = local.azs
}

resource "aws_security_group" "ecs_sg" {
  name   = "${local.prefix}-ecs-sg"
  vpc_id = module.vpc.vpc_id
  description = "Allow outbound"
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["10.10.0.0/16"]
  }
}

module "alb" {
  source = "../../modules/alb"
  vpc_id = module.vpc.vpc_id
  subnets = module.vpc.public_subnets
  environment = var.environment
  certificate_arn = "" # se tiver ACM
}

module "secrets_db" {
  source = "../../modules/secrets"
  name = "${local.prefix}-db-secret"
  secret_string = jsonencode({ username = "dbadmin", password = "trocar_em_prod" })
}

module "rds" {
  source = "../../modules/rds"
  environment = var.environment
  subnets = module.vpc.private_subnets
  vpc_id = module.vpc.vpc_id
  db_username = "dbadmin"
  db_password_secret_arn = module.secrets_db.secret_arn
  replica_count = 1
}

module "redis" {
  source = "../../modules/redis"
  name = "${local.prefix}-redis"
  subnets = module.vpc.private_subnets
  security_group_id = aws_security_group.ecs_sg.id
}

module "rabbitmq" {
  source = "../../modules/rabbitmq"
  name = "${local.prefix}-mq"
  subnets = module.vpc.private_subnets
  security_groups = [aws_security_group.ecs_sg.id]
}

module "cloudfront" {
  source = "../../modules/cloudfront"
  s3_bucket_name = "${local.prefix}-frontend"
  certificate_arn = ""
}

module "ecs" {
  source = "../../modules/ecs"
  environment = var.environment
  subnets = module.vpc.private_subnets
  vpc_id = module.vpc.vpc_id
  alb_target_group_arn = module.alb.target_group_arn
  image = "nginx:latest" # substitua pela imagem real do backend
  sg_id = aws_security_group.ecs_sg.id
  execution_role_arn = ""
  task_role_arn = ""
  desired_count = 2
}

module "monitoring" {
  source = "../../modules/monitoring"
  environment = var.environment
}
