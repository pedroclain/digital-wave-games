import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { SharedModule } from 'src/services/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
