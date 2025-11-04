import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Login do usuário (nome de usuário ou e-mail)',
  })
  @IsString()
  @IsNotEmpty()
  login!: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
