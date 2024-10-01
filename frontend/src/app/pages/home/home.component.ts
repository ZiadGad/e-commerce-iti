import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {}
  featuredProducts: any = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data.data.products.slice(0, 3);
      },
      error: (err) => console.log(err),
    });
  }
}
