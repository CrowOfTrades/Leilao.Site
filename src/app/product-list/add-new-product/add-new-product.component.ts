import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private dialogRef: MatDialogRef<AddNewProductComponent>) { }

  public productForm: FormGroup;

  private _createForm(): void {
    this.productForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this._createForm();
  }

  public onAddClick() {
    this._productService.postProduct(this.productForm.value).subscribe(() => {
      this.dialogRef.close()
    });
  }

}
