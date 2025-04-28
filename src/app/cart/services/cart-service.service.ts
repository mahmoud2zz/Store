import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { Cart } from '../models/cart';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpCleint: HttpClient) {}

  addCart(cart: Cart): Observable<ApiResponse<Cart>> {
    const formData = new FormData();
    formData.append('id', cart.id.toString());
    formData.append('date', cart.date); // should be ISO format or empty string
    return this._httpCleint.post<ApiResponse<Cart>>(
      `${environment.baseUrl}/Carts`,
      formData
    );
  }

  addProductsToCart(cartProduct: CartProduct[]): Observable<ApiResponse<Cart>> {
    return this._httpCleint.post<ApiResponse<Cart>>(
      `${environment.baseUrl}/Carts/add-products`,
      cartProduct
    );
  }

  removeProductFromCart(
    cartProduct: CartProduct
  ): Observable<ApiResponse<Cart>> {
    console.log(cartProduct);
    const params = new HttpParams()
      .set('CartId', cartProduct.CartId.toString())
      .set('ProductId', cartProduct.ProductId.toString());

    return this._httpCleint.delete<ApiResponse<Cart>>(
      `${environment.baseUrl}/Carts/remove-product`,
      { params }
    );
  }
}
