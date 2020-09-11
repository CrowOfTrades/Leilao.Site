import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    public get LoggedUser(): User{
        return JSON.parse(localStorage.getItem("LoggedUser"));
    }

    public set LoggedUser(user :User){
        localStorage.setItem("LoggedUser", JSON.stringify(user));
    }

    /**
     * GET: get all User
     */
    public getUserList(size: Number): Observable<User[]> {
        return this.http.get(environment.apiEndpoint + 'User/' + size)
            .pipe(
                map((resp: User[]) => {
                    return resp;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when getUserList on UserService =>", err);
                    return throwError(err);
                })
            );
    }

    /**
      * POST: POST a User
      */
    public postUser(user: User): Observable<boolean> {
        return this.http.post(environment.apiEndpoint + 'User/', user)
            .pipe(
                map(() => {
                    return true;
                }),
                catchError((err: any) => {
                    console.error("Something get wrong when postUser on UserService =>", err);
                    return throwError(err);
                })
            );
    }

}

export class User {
    public id: string;
    public name: string;
    public birthdate: number;
    public age: number;
}