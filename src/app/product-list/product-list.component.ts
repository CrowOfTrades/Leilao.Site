import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { Product, ProductService } from './product.service'
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductService, private dialog: MatDialog) { }

  public ProductList: Product[];

  ngOnInit(): void {
    this.getProducts();
  }

  public addNewProduct(){
    let dialogRef = this.dialog.open(AddNewProductComponent, {width: '250px',})
    dialogRef.afterClosed()
      .subscribe(() =>
      this.getProducts()
      );
  }

  private getProducts(){
    this._productService.getProductList(10).subscribe((resp: Product[]) =>{
      this.ProductList = resp;
    });
  }

}
