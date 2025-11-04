resource "aws_ecs_cluster" "this" {
  name = "ecs-${var.environment}"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "app-${var.environment}"
  requires_compatibilities  = ["FARGATE"]
  network_mode              = "awsvpc"
  cpu                       = "512"
  memory                    = "1024"
  execution_role_arn        = var.execution_role_arn
  task_role_arn             = var.task_role_arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = var.image
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      environment = [
        { name = "NODE_ENV", value = var.environment }
      ]
    }
  ])
}

resource "aws_ecs_service" "app" {
  name            = "svc-${var.environment}"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = var.subnets
    assign_public_ip = false
    security_groups  = [var.sg_id]
  }

  load_balancer {
    target_group_arn = var.alb_target_group_arn
    container_name   = "backend"
    container_port   = 3000
  }

  depends_on = [var.alb_target_group_arn]
}
