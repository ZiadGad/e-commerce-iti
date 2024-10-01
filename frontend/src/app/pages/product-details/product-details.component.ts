import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  alertMessage: string = ''; // Property for alert message
  alertVisible: boolean = false; // Property to manage alert visibility

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data.data.product;
        },
        error: (err) => console.error('Error fetching product:', err),
      });
    } else {
      console.error('Product ID is null. Unable to fetch product details.');
    }
  }

  // Method to submit product rating
  submitRating(rating: number): void {
    if (rating < 1 || rating > 5) {
      console.error('Invalid rating value:', rating);
      return;
    }

    const productId = this.product._id;

    console.log('Submitting rating:', rating);

    this.productService.updateProductRating(productId, rating).subscribe({
      next: (response) => {
        console.log('Rating submitted:', response);

        this.product = response.data.product;
      },
      error: (err) => {
        console.error('Error submitting rating:', err);
      },
    });
  }

  // Method to add product to cart
  addToCart(productId: string, quantity: number = 1): void {
    this.productService.addToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        // Set alert message and make it visible
        this.alertMessage = 'Product added to cart successfully!';
        this.alertVisible = true;
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        // Set alert message and make it visible
        this.alertMessage = 'Failed to add product to cart. Please try again.';
        this.alertVisible = true;
      },
    });
  }

  // Method to go back to the previous page
  goBack(): void {
    this.location.back();
  }
}
