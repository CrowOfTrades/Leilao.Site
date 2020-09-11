import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidListComponent } from './bid-list/bid-list.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'bids', component: BidListComponent },
  { path: 'bids/:id', component: BidListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
