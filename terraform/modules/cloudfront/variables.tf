variable "s3_bucket_name" { type = string }
variable "domain" { type = string, default = "" }
variable "certificate_arn" { type = string, default = "" }
variable "allowed_methods" { type = list(string) default = ["GET", "HEAD"] }
