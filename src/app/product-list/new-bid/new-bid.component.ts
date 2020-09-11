import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/header/user.service';
import { environment } from 'src/environments/environment';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { Product, ProductService } from '../product.service';
import { Bid, BidService } from './../../bid-list/bid.service'

@Component({
  selector: 'app-new-bid',
  templateUrl: './new-bid.component.html',
  styleUrls: ['./new-bid.component.scss']
})
export class NewBidComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _bidService: BidService,
    private _userService: UserService,
    private dialogRef: MatDialogRef<NewBidComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product) { }

  public bidForm: FormGroup;

  private _createForm(): void {
    this.bidForm = this._formBuilder.group({
      price: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this._createForm();
  }

  public onAddClick() {
    if(!this._userService.LoggedUser){
      alert("cadastre seu usuario antes de realizar um lance");
      this.dialogRef.close()
      return;
    }
    if(!this.bidForm.value.price || this.bidForm.value.price <= this.product.price){
      alert("Seu lance deve ser maior que " + this.product.price);
      return;
    }

    let data: Bid = new Bid();
    console.log('lol',this.bidForm.value.price)
    data.price = this.bidForm.value.price;
    data.productId = this.product.id;
    data.userId = this._userService.LoggedUser.id;

    this._bidService.postBid(data).subscribe(() => {
      this.dialogRef.close()
    });
  }
}


