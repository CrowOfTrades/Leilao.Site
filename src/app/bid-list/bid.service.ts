import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment'

@Injectable({ providedIn: 'root' })
export class BidService {

    constructor(private http: HttpClient) { }

    /**
     * GET: get all bids
     */
    public getBidList(size: Number): Observable<Bid[]> {
        return this.http.get(environment.apiEndpoint + 'Bid/' + size)
            .pipe(
                map((resp: Bid[]) => {
                    return resp;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when getBidList on BidService =>", err);
                    return throwError(err);
                })
            );
    }

        /**
     * GET: get bid by user
     */
    public getBidsFromUser(size: Number, userId: string): Observable<Bid[]> {
        return this.http.get(environment.apiEndpoint + 'Bid/' + size+ '/user/' + userId)
            .pipe(
                map((resp: Bid[]) => {
                    return resp;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when getBidsFromUser on BidService =>", err);
                    return throwError(err);
                })
            );
    }

    /**
      * POST: POST a product
      */
    public postBid(bid: Bid): Observable<boolean> {
        return this.http.post(environment.apiEndpoint + 'Bid/', bid)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when postBid on BidService =>", err);
                    return throwError(err);
                })
            );
    }

}

export class Bid{
    public id: string;
    public userId: string;
    public productId: string;
    public price: number;
    public createOn: string;
    public userName: string;
    public productName: string;
  }