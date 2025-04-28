import { CartProduct } from './../../models/cart-product';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { Product } from '../../../products/models/product'; // Adjust the path as needed
import { Cart } from '../../models/cart';
import { ProductsService } from '../../../products/services/products-service.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  CartProudcts: CartProduct[] = [];
  Products: Product[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;
  success: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _crarService: CartService,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
  getCartProducts() {
    console.log('Fetching cart products...');
    if ('cart' in localStorage) {
      this.Products = JSON.parse(localStorage.getItem('cart') ?? '{}');
      console.log(this.Products);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    console.log('total');
    this.totalPrice = 0;
    for (let i = 0; i < this.Products.length; i++) {
      this.totalPrice += this.Products[i].price * this.Products[i]?.quantity;
    }
  }

  addAmount(index: number): void {
    this.Products[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.Products));

    this.calculateTotalPrice();
  }
  minsAmount(index: number): void {
    this.Products[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(this.Products));
    if (this.Products[index].quantity <= 0) {
      this.Products[index].quantity = 1;
    }
    this.calculateTotalPrice();
  }

  deleteProduct(index: number): void {
    let product = this.Products[index];
    console.log(product);

    if (!product || !product.id) {
      console.error('Invalid product data');
      return; // Exit if product is invalid
    }

    this.isLoading = true; // Start loading before API call

    this.Products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.Products));
    this.calculateTotalPrice();

    this._crarService
      .removeProductFromCart({
        CartId: 4006, // You might want to check if CartId is dynamic or static
        ProductId: product.id,
      } as CartProduct)
      .subscribe({
        next: (res) => {
          this.isLoading = false; // Stop loading after the response
          alert('Product removed from cart');
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false; // Ensure loading state is stopped on error
          console.error('Error removing product from cart', err); // Log error details
        },
      });
  }
  clearCart(): void {
    this.Products = [];
    localStorage.removeItem('cart');
    this.calculateTotalPrice();
  }

  addCart(): void {
    let cart: Cart = {
      id: 0,
      date: new Date().toISOString(),
      products: [],
    };

    this._crarService.addCart(cart).subscribe({
      next: (res) => {
        this.isLoading = true;
        cart = res.data;
        for (const product of this.Products) {
          this.CartProudcts.push({
            CartId: cart.id,
            ProductId: product.id,
          } as CartProduct);
        }

        this._crarService.addProductsToCart(this.CartProudcts).subscribe({
          next: (res) => {
            this.isLoading = true;
            console.log(res);
          },
          error: (err) => {
            this.isLoading = false;
          },
        });

        this.isLoading = false;
        this.success = true;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        console.log('complete');
        this.isLoading = false;
      },
    });
  }
}
