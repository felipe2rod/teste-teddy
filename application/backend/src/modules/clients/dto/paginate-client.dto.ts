import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateClientDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página (inicia em 1)',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de registros por página',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    example: 'Empresa XPTO',
    description: 'Filtro opcional pelo nome do cliente',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
