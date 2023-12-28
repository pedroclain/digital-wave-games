import { BadRequestException, Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { GamePaginationDto } from './dto/game-pagination.dto';

@Injectable()
export class GameService {
  constructor(private gameRepository: GameRepository) {}

  async findAll() {
    return await this.gameRepository.findAll();
  }

  async findOne(id: number) {
    const game = await this.gameRepository.findOne(id);

    if (!game) throw new BadRequestException("Game not found");

    return game;
  }

  async findAllCategories() {
    return await this.gameRepository.findAllCategories();
  }

  async findAllPlatforms() {
    return await this.gameRepository.findAllPlatforms();
  }

  async findPage(pagination: GamePaginationDto) {
    return await this.gameRepository.findPage(pagination);
  }
}
