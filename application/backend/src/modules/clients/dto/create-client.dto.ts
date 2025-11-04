import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Empresa XPTO', description: 'Nome da empresa' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 4.75, description: 'Salário médio da empresa' })
  @IsNumber()
  @Min(0)
  salary!: number;

  @ApiProperty({ example: 900, description: 'Valor da empresa' })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => value, { toClassOnly: true })
  companyValue!: number;

  @ApiProperty({ example: 1, description: 'ID do usuário associado' })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => value, { toClassOnly: true })
  userId!: number;
}
