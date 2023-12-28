import { Controller, Get, Post, Body,  Param, HttpCode, HttpStatus } from '@nestjs/common';
import { GameService } from './game.service';
import { GamePaginationDto } from './dto/game-pagination.dto';

@Controller('store')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('game')
  findAll() {
    return this.gameService.findAll();
  }

  @Get('game/:id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Get('platform')
  findPlarforms() {
    return this.gameService.findAllPlatforms();
  }

  @Get('category')
  findCategories() {
    return this.gameService.findAllCategories();
  }

  @Post('game/pagination')
  @HttpCode(HttpStatus.OK)
  findPage(@Body() pagination: GamePaginationDto) {
    return this.gameService.findPage(pagination);
  }
}
