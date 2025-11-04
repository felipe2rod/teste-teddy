resource "aws_elasticache_subnet_group" "this" {
  name       = "${var.name}-subnet-group"
  subnet_ids = var.subnets
}

resource "aws_elasticache_replication_group" "this" {
  replication_group_id          = var.replication_group_id != null ? var.replication_group_id : "${var.name}-rg"
  replication_group_description = "redis for ${var.name}"
  engine                        = "redis"
  node_type                     = "cache.t3.small"
  number_cache_clusters         = 1
  subnet_group_name             = aws_elasticache_subnet_group.this.name
  security_group_ids            = [var.security_group_id]
  automatic_failover_enabled    = false
}
