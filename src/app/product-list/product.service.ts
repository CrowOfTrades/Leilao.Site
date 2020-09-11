import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private http: HttpClient) { }

    /**
     * GET: get all products
     */
    public getProductList(size: Number): Observable<Product[]> {
        return this.http.get(environment.apiEndpoint + 'Product/' + size)
            .pipe(
                map((resp: Product[]) => {
                    return resp;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when getProductList on ProductService =>", err);
                    return throwError(err);
                })
            );
    }

    /**
      * POST: POST a product
      */
    public postProduct(product: Product): Observable<boolean> {
        return this.http.post(environment.apiEndpoint + 'Product/', product)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when PostProduct on ProductService =>", err);
                    return throwError(err);
                })
            );
    }

}

export class Product {
    public name: string;
    public price: number;
}