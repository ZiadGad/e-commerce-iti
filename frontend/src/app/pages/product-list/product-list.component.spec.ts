import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  itemsPerPage: any;
  onPageChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  noResults: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data.products;
        this.filteredProducts = this.products;
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
  }
}
