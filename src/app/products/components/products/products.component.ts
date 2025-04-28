import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products-service.service';
import { Product } from '../../models/product'; // Adjust the path as needed
import { Category } from '../../models/categoty'; // Adjust the path as needed
import { Cart } from '../../../cart/models/cart';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  cartProducts: Product[] = [];
  isLoading: boolean = false;

  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    this.cartProducts = [];
    this.getAllCategories();
    this.getAllProducts();
  }
  onCategoryChange(event: any) {
    let value = event.target.value;
    value === 'all' ? this.getAllProducts() : this.getProductsByCategory(value);
  }

  getAllProducts() {
    console.log('Fetching all products...');
    this.isLoading = true;
    this._productService.geAlltProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }
  getAllCategories() {
    this.isLoading = true;
    this._productService.getAllCategories().subscribe({
      next: (response) => {
        console.log('Fetching all categories...');
        this.categories = response.data;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching all categories:', error.message);
        alert(
          'An error occurred while fetching all categories. Please try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  getProductsByCategory(category: string) {
    this.isLoading = true;
    this._productService.getProductsByCategory(category).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(this.products);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products by category:', error.message);
        alert(
          'An error occurred while fetching products by category. Please try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  reciveCategory(event: any) {
    let value = event.target.value;
    console.log(value);

    value === 'all' ? this.getAllProducts() : this.getProductsByCategory(value);
  }

  addToCart(product: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);

      let found = this.cartProducts.find((item) => item.id === product.id)!;
      if (found) {
        console.log('Product already in cart');
        alert('Product already in cart');
      } else {
        this.cartProducts.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        alert('Product added to cart');
      }
    } else {
      this.cartProducts.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
    console.log(this.cartProducts);
  }
}
