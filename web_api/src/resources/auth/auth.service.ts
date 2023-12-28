import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from 'src/services/jwt.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findByLogin(loginDto);

    if (!user) throw new UnauthorizedException();

    const correctPass = await bcrypt.compare(loginDto.password, user.password);

    if (!correctPass) throw new UnauthorizedException();

    const accessToken = this.jwtService.generateAccessToken({ username: user.username, imgUrl: user.imgUrl });

    return {
      accessToken
    }
  }
}
