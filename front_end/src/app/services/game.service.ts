import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './../models/game.model';
import { Category } from '../models/category';
import { Platform } from '../models/platform.model';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  findById(id: number) {
    return this.http.get<Game>('store/game/'+id);
  }

  findPaginate(paginate: PaginateType) {
    return this.http.post<{
      games: Game[],
      lastPage: number
    }>('store/game/pagination', paginate).pipe(delay(1000));
  }

  findCategories() {
    return this.http.get<Category[]>('store/category');
  }

  findPlatforms() {
    return this.http.get<Platform[]>('store/platform');
  }
}

export type PaginateType = {
  page: number;
  size: number;
  orderBy?: string,
  filter?: {
    name?: string;
    categories?: string[];
    platforms?: string[];
    price?: {
      from?: number;
      to?: number
    }
  };
};
