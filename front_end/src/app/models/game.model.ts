import { Category } from './category';
import { Comment } from './comment.model';
import { Platform } from './platform.model';

export interface Game {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
  price: number;
  platforms: Platform[];
  categories: Category[];
  comments: Comment[];
}
