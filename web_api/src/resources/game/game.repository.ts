import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { GamePaginationRequestDto } from './dto/game-pagination-request.dto';

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

  async findPage({ page, size, orderBy, filter }: GamePaginationRequestDto) {
    const whereQuery = filter && {
      platforms: filter.platforms && {
        some: {
          OR: filter.platforms.map((p) => ({ name: p })),
        },
      },
      categories: filter.categories && {
        some: {
          OR: filter.categories.map((c) => ({ name: c })),
        },
      },
      price: filter.price && {
        gt: filter.price.from && filter.price.from,
        lt: filter.price.to && filter.price.to,
      },
    }

    const result = await this.prisma.$transaction([
      this.prisma.game.findMany({
        skip: page * size,
        take: size,
        orderBy: orderBy && {
          [orderBy]: 'asc',
        },
        where: whereQuery,
        include: {
          categories: true,
          platforms: true,
        },
      }),
      this.prisma.game.count({ where: whereQuery }),
    ]);
    return {
      games: result[0],
      total: result[1]
    }
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
                imgUrl: true,
              },
            },
          },
        },
        platforms: true,
        categories: true,
      },
    });
  }
}
