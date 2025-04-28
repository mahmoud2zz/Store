import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Product } from '../models/product';
import { ApiResponse } from '../../shared/models/api-response';
import { Category } from '../models/categoty'; // Add this import

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  geAlltProducts(): Observable<ApiResponse<Product[]>> {
    return this._httpClient.get<ApiResponse<Product[]>>(
      `${environment.baseUrl}/products`
    );
  }
  getAllCategories(): Observable<ApiResponse<Category[]>> {
    // This method fetches all categories from the API
    return this._httpClient.get<ApiResponse<Category[]>>(
      `${environment.baseUrl}/Categories`
    );
  }
  getProductsByCategory(category: string): Observable<ApiResponse<Product[]>> {
    return this._httpClient.get<ApiResponse<Product[]>>(
      `${environment.baseUrl}/products/${category}`
    );
  }
  getProductById(id: string): Observable<ApiResponse<Product>> {
    return this._httpClient.get<ApiResponse<Product>>(
      `${environment.baseUrl}/products/${id}`
    );
  }
}
