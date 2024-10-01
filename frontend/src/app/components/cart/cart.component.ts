import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.productService.getCartItems().subscribe({
      next: (data) => {
        console.log('Fetched cart items:', data);
        if (data.data && Array.isArray(data.data.cartItems)) {
          this.cartItems = data.data.cartItems;

          // Fetch product details for each cart item
          const productRequests = this.cartItems.map(item =>
            this.productService.getProductById(item.productId).toPromise()
              .then(product => {
                console.log('Fetched product:', product);
                if (product.data && product.data.product) {
                  item.product = product.data.product;
                } else {
                  console.error('Product data structure is incorrect:', product);
                }
              })
          );

          Promise.all(productRequests).then(() => {
            this.calculateTotal();
          }).catch(err => console.error('Error fetching product details:', err));
        } else {
          console.error('Cart items data structure is incorrect:', data);
        }
      },
      error: (err) => console.error('Error fetching cart items:', err),
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      if (item.product && item.product.price) {
        return sum + (item.product.price * item.quantity);
      }
      return sum;
    }, 0);
  }

  removeFromCart(cartItemId: string) {
    this.productService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.loadCartItems();
      },
      error: (err) => console.error('Error deleting cart item:', err),
    });
  }

  updateQuantity(cartItemId: string, quantity: number) {
    if (quantity < 1) return; // منع الكميات الأقل من 1

    // ابحث عن العنصر الذي تريد تحديثه
    const itemToUpdate = this.cartItems.find(item => item._id === cartItemId);
    if (itemToUpdate) {
      // قم بتحديث الكمية في قاعدة البيانات
      this.productService.updateCartItemQuantity(cartItemId, quantity).subscribe({
        next: () => {
          itemToUpdate.quantity = quantity; // تحديث الكمية محليًا
          this.calculateTotal(); // إعادة حساب الإجمالي
        },
        error: (err) => console.error('Error updating cart item:', err),
      });
    }
  }
}
















