import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedModule, ProductsModule],
  exports: [CartComponent],
})
export class CartModule {}
