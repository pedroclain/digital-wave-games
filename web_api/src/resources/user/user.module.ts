import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SharedModule } from 'src/services/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
