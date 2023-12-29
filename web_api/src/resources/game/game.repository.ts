import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { GamePaginationDto } from './dto/game-pagination.dto';

@Injectable()
export class GameRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.game.findMany();
  }

  async findAllCategories() {
    return await this.prisma.category.findMany();
  }

  async findAllPlatforms() {
    return await this.prisma.platform.findMany();

  }

  async findPage({ page, size, orderBy, filter }: GamePaginationDto) {
    return await this.prisma.game.findMany({
      skip: page * size,
      take: size,
      orderBy: orderBy && {
        [orderBy]: 'asc',
      },
      where: filter && {
        platforms: filter.platforms && {
          some: {
            OR: filter.platforms.map(p => ({ name: p }))
          },
        },
        categories: filter.categories && {
          some: {
            OR: filter.categories.map(c => ({ name: c }))
          }
        },
        price: filter.price && {
          gt: filter.price.from && filter.price.from,
          lt: filter.price.to && filter.price.to
        }
      },
      include: {
        categories: true,
        platforms: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.game.findFirst({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                imgUrl: true
              }
            }
          }
        },
        platforms: true,
        categories: true
      },
    });
  }
}
