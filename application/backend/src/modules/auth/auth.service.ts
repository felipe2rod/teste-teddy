import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LokiLogger } from 'src/common/logger/loki-logger.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(LokiLogger) private readonly logger: LokiLogger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; user: { name: string; login: string } }> {
    const user = await this.usersService['usersRepository'].findByLogin(
      dto.login,
    );
    this.logger.log(
      `Tentativa de login ${JSON.stringify(dto)}`,
      AuthService.name,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, login: user.login };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: { name: user.name, login: user.login },
    };
  }
}
