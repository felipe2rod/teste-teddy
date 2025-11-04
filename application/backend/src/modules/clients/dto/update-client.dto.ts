import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({
    example: 'Empresa Atualizada Ltda',
    description: 'Nome atualizado do cliente',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 5000,
    description: 'Novo salário médio do cliente',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary?: number;

  @ApiPropertyOptional({
    example: 120000,
    description: 'Novo valor da empresa',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  company_value?: number;
}
