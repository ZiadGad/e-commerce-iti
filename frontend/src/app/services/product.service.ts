import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:3000/api/v1/products';
  private cartUrl = 'http://127.0.0.1:3000/api/v1/cart';

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // getProducts(page: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}?limit=10&page=${page}`);
  // }

  // Get products by title
  getProductsByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?title=${title}`);
  }

  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add item to cart
  addToCart(productId: string, quantity: number) {
    return this.http.post(this.cartUrl, {
      productId,
      quantity,
    });
  }

  // Get all cart items
  getCartItems(): Observable<any> {
    return this.http.get(this.cartUrl);
  }

  // Delete cart item
  deleteCartItem(cartItemId: string): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${cartItemId}`);
  }

  // Update cart item quantity
  updateCartItemQuantity(
    cartItemId: string,
    quantity: number
  ): Observable<any> {
    return this.http.patch(`${this.cartUrl}/${cartItemId}`, { quantity });
  }

  // Update product rating
  updateProductRating(productId: string, newRating: number): Observable<any> {
    const body = { newRating: newRating };
    return this.http.patch(`${this.apiUrl}/rate/${productId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function updateProductRating(
  productId: any,
  string: any,
  newRating: any,
  number: any
) {
  throw new Error('Function not implemented.');
}
