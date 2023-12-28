import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
  
  async findByLogin(loginDto: LoginDto) {
    return await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      }
    })
  }
}
