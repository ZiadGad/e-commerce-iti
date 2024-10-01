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
  // Pagination variables
  currentPage: number = 1; // Default page
  itemsPerPage: number = 10; // Items per page
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  noResults: boolean = false; // Track no results
  sortOrder: 'asc' | 'desc' | null = null; // Sorting order (null means no sorting)

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data.products;
        this.filteredProducts = this.products;
        this.sortProducts(); // Sort products initially
        console.log('Filtered Products Length:', this.filteredProducts.length); //console.log
      },
      error: (err) => console.log(err),
    });
  }

  onSearchChange() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Check if there are no results
    this.noResults =
      this.filteredProducts.length === 0 && this.searchQuery !== '';
    this.sortProducts(); // Re-sort after filtering
  }

  // Method to sort products by price
  sortProducts() {
    if (this.sortOrder === null) return; // No sorting if sortOrder is null

    this.filteredProducts.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  // pagination
  onPageChange(page: number) {
    this.currentPage = page;
  }

  // Method to set sort order from dropdown
  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedSortOrder =
      target.value === 'asc' ? 'asc' : target.value === 'desc' ? 'desc' : null;

    // Toggle sorting
    if (this.sortOrder === selectedSortOrder) {
      this.sortOrder = null; // Reset sorting
      target.value = ''; // Reset dropdown to default
      this.filteredProducts = [...this.products]; // Reset to the original product list
    } else {
      this.sortOrder = selectedSortOrder; // Update sort order
      this.sortProducts(); // Sort after changing order
    }
  }
}
