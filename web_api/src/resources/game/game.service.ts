import { BadRequestException, Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { GamePaginationRequestDto } from './dto/game-pagination-request.dto';
import { Game } from '@prisma/client';
import { GamePaginationResponseDto } from './dto/game-pagination-response.dto';

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

  async findPage(pagination: GamePaginationRequestDto) {
    const { games, total } = await this.gameRepository.findPage(pagination);
    const lastPage = Math.ceil(total / pagination.size) - 1;

    return {
      lastPage,
      games
    } as GamePaginationResponseDto
  }
}
