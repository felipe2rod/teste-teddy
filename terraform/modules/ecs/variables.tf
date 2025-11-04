variable "environment" { type = string }
variable "subnets" { type = list(string) }
variable "vpc_id" { type = string }
variable "alb_target_group_arn" { type = string }
variable "image" { type = string }
variable "execution_role_arn" { type = string, default = "" }
variable "task_role_arn" { type = string, default = "" }
variable "sg_id" { type = string }
variable "desired_count" { type = number, default = 2 }
