import { Game } from "@prisma/client";

export class GamePaginationResponseDto {
  lastPage: number;
  games: Game[];
}
