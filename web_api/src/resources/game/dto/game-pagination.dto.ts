export class GamePaginationDto {
  page: number;
  size: number;
  orderBy?: string;
  filter?: {
    platforms?: string[];
    categories?: string[];
    price?: {
      from?: number
      to?: number
    }
  };
}
