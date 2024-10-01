import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ProductService } from '../../services/product.service'; // Import ProductService

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private productService: ProductService) {} // Inject ProductService

  // Method to add product to cart
  addToCart(productId: string, quantity: number = 1) {
    this.productService.addToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
      },
      error: (err) => console.error('Error adding product to cart:', err),
    });
  }
}

