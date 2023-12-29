import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './../models/game.model';
import { Category } from '../models/category';
import { Platform } from '../models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  findById(id: number) {
    return this.http.get<Game>('store/game/'+id);
  }

  findPaginate(paginate: PaginateType) {
    return this.http.post<Game[]>('store/game/pagination', paginate);
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
    categories?: string[];
    platforms?: string[];
    price?: {
      from?: number;
      to?: number
    }
  };
};
