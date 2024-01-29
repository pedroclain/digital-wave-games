export class GamePaginationRequestDto {
  page: number;
  size: number;
  orderBy?: string;
  filter?: {
    name?: string;
    platforms?: string[];
    categories?: string[];
    price?: {
      from?: number
      to?: number
    }
  };
}
