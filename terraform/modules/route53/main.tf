resource "aws_route53_zone" "this" {
  name = var.domain_name
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = var.alb_dns_name
    zone_id                = data.aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}

data "aws_lb" "alb" {
  depends_on = []
  // cannot search by dns in data source easily; this is placeholder - in env main.tf prefer to pass ALB zone_id too
}
