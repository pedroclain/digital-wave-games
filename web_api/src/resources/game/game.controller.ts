import { Controller, Get, Post, Body,  Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { GamePaginationDto } from './dto/game-pagination.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('store')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('game')
  findAll() {
    return this.gameService.findAll();
  }

  @Get('game/:id')
  @UseGuards(AuthGuard)
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
