resource "aws_db_subnet_group" "this" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = var.subnets
  tags = { Environment = var.environment }
}

resource "aws_rds_cluster" "this" {
  cluster_identifier      = "${var.environment}-aurora-cluster"
  engine                  = var.engine
  engine_version          = var.engine_version
  database_name           = "${var.environment}_db"
  master_username         = var.db_username
  master_password         = data.aws_secretsmanager_secret_version.db_secret.secret_string

  db_subnet_group_name    = aws_db_subnet_group.this.name
  skip_final_snapshot     = true
  apply_immediately       = true
}

resource "aws_rds_cluster_instance" "writer" {
  identifier          = "${var.environment}-aurora-writer"
  cluster_identifier  = aws_rds_cluster.this.id
  instance_class      = "db.t3.medium"
  engine              = aws_rds_cluster.this.engine
  engine_version      = aws_rds_cluster.this.engine_version
  publicly_accessible = false
}

resource "aws_rds_cluster_instance" "reader" {
  count               = var.replica_count
  identifier          = "${var.environment}-aurora-reader-${count.index}"
  cluster_identifier  = aws_rds_cluster.this.id
  instance_class      = "db.t3.medium"
  engine              = aws_rds_cluster.this.engine
  engine_version      = aws_rds_cluster.this.engine_version
  publicly_accessible = false
}

data "aws_secretsmanager_secret_version" "db_secret" {
  secret_id = var.db_password_secret_arn
}
