variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS cli profile"
  type        = string
  default     = "default"
}

variable "environment" {
  description = "Environment name (dev/hom/prod)"
  type        = string
  default     = "dev"
}

variable "project" {
  description = "Teste Tech-Lead Teddy"
  type        = string
  default     = "Teddy"
}
