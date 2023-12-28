import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { SharedModule } from 'src/services/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
