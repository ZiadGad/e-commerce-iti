import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  noResults: boolean = false;
  sortOrder: 'asc' | 'desc' | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data.products;
        this.filteredProducts = this.products;
        this.sortProducts();
        console.log('Filtered Products Length:', this.filteredProducts.length);
      },
      error: (err) => console.log(err),
    });
  }

  onSearchChange() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.noResults =
      this.filteredProducts.length === 0 && this.searchQuery !== '';
    this.sortProducts();
  }

  sortProducts() {
    if (this.sortOrder === null) return;

    this.filteredProducts.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedSortOrder =
      target.value === 'asc' ? 'asc' : target.value === 'desc' ? 'desc' : null;

    if (this.sortOrder === selectedSortOrder) {
      this.sortOrder = null;
      target.value = '';
      this.filteredProducts = [...this.products];
    } else {
      this.sortOrder = selectedSortOrder;
      this.sortProducts();
    }
  }
}
