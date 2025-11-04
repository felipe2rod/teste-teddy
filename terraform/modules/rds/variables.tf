variable "environment" { type = string }
variable "subnets" { type = list(string) }
variable "vpc_id" { type = string }
variable "engine" { type = string, default = "aurora-postgresql" }
variable "engine_version" { type = string, default = "13.6" }
variable "replica_count" { type = number, default = 1 }
variable "db_username" { type = string }
variable "db_password_secret_arn" { type = string }
