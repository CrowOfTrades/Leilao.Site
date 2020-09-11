import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../header/user.service';
import { Bid, BidService } from './bid.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {

  constructor(private _bidService: BidService, private _userService: UserService, private activatedRouter: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  public bidList: Bid[];

  private getIdFromRoute(){
    
    this.activatedRouter.params.subscribe(params => {
      if(params.id)
        this.getBidsFromUser(params.id);
      else
        this.getAllBids();
    })
  }

  private getAllBids(){
    this._bidService.getBidList(10).subscribe((resp: Bid[]) =>{
      this.bidList = resp;
    });
  }

  private getBidsFromUser(id){
    this._bidService.getBidsFromUser(10, id).subscribe((resp: Bid[]) =>{
      this.bidList = resp;
    });
  }

}
