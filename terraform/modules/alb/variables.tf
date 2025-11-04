variable "vpc_id" { type = string }
variable "subnets" { type = list(string) }
variable "environment" { type = string }
variable "certificate_arn" { type = string, default = "" }
