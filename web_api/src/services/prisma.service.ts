import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { LoggerService } from './logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private logger: LoggerService) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successful database conection', PrismaService.name);
      // await this.bootstrapData();
    } catch (err) {
      this.logger.error(
        'Fail on connect to database',
        err.stack,
        PrismaService.name,
      );
    }
  }

  async bootstrapData() {
    try {
      const data = fs.readFileSync('./data.json', 'utf8');
      const dataObj = JSON.parse(data);
      await this.user.create({ data: dataObj.user });
      await this.platform.createMany({ data: dataObj.platforms.map(p => ({ name: p })), skipDuplicates: true });
      await this.category.createMany({ data: dataObj.categories.map(c => ({ name: c })), skipDuplicates: true });
      for (let g of dataObj.games) {
        await this.game.create( { data: { 
          ...g, 
          categories: {
            connect: g.categories.map(c => ({ name: c }))
          },
          platforms: {
            connect: g.platforms.map(p => ({ name: p }))
          } 
        }})
      }
      await this.comment.createMany({ data: dataObj.comments });

      this.logger.log('Successful on bootstrap data', PrismaService.name);
    } catch (err) {
      this.logger.error(
        'Fail on bootstrap data',
        err.stack,
        PrismaService.name,
      );
    }
  }
}
