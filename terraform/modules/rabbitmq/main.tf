resource "aws_mq_broker" "this" {
  broker_name = var.name
  engine_type = "RabbitMQ"
  engine_version = "3.8.6"
  host_instance_type = "mq.t3.micro"
  publicly_accessible = false

  subnet_ids = var.subnets
  security_groups = var.security_groups

  user {
    username = "admin"
    password = random_password.mq_password.result
  }
}

resource "random_password" "mq_password" {
  length  = 16
  special = true
}
