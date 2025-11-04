resource "aws_secretsmanager_secret" "this" {
  name = var.name
}

resource "aws_secretsmanager_secret_version" "this" {
  secret_id     = aws_secretsmanager_secret.this.id
  secret_string = var.secret_string != "" ? var.secret_string : jsonencode({ username = "admin", password = random_password.pw.result })
}

resource "random_password" "pw" {
  length  = 16
  special = true
  override_characters = "!@#"
}
