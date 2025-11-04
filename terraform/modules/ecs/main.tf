resource "aws_ecs_cluster" "this" {
  name = "${var.environment}-ecs-cluster"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.environment}-task"
  requires_compatibilities  = ["FARGATE"]
  cpu                       = "512"
  memory                    = "1024"
  network_mode              = "awsvpc"
  execution_role_arn        = var.execution_role_arn != "" ? var.execution_role_arn : null
  task_role_arn             = var.task_role_arn != "" ? var.task_role_arn : null

  container_definitions = jsonencode([
    {
      name = "backend"
      image = var.image
      essential = true
      portMappings = [{ containerPort = 3000, protocol = "tcp" }]
      environment = [{ name = "NODE_ENV", value = var.environment }]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.environment}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "backend"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "app" {
  name            = "${var.environment}-svc"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnets
    security_groups  = [var.sg_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = var.alb_target_group_arn
    container_name   = "backend"
    container_port   = 3000
  }

  depends_on = []
}
