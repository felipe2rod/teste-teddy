terraform {
  backend "s3" {
    bucket = "terraform-states"
    key    = "hom/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
