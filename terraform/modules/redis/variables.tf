variable "name" { type = string }
variable "subnets" { type = list(string) }
variable "security_group_id" { type = string }
variable "replication_group_id" { type = string, default = null }
