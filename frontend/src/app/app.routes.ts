// app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Adjusted to redirect to home
  { path: 'home', component: HomeComponent }, // Ensure you have a HomeComponent
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', component: NotFoundComponent },
  // Add more routes as needed
];


