import { Product } from '../../products/models/product';

export interface Cart {
  id: number;
  date: string;
  products: Product[];
}
