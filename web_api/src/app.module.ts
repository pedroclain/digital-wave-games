import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { GameModule } from './resources/game/game.module';
import { SharedModule } from './services/shared.module';

@Module({
  imports: [AuthModule, UserModule, GameModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
