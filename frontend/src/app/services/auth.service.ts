import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { map, switchMap, tap, switchMapTo } from 'rxjs/operators';
import { Response } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();

  constructor(public authService: Angular2TokenService) {
    this.authService.validateToken().subscribe(
      res => {
        res.status === 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false);
      },
    );
  }

  logOutUser(): Observable<Response> {

    return <Observable<Response>>this.authService.signOut().pipe(
      tap(() => this.userSignedIn$.next(false)));
  }

  registerUser(signUpData: { email: string, password: string, passwordConfirmation: string }): Observable<Response> {
    return this.authService.registerAccount(signUpData).pipe(
      tap(() => this.userSignedIn$.next(true)));
  }

  logInUser(signInData: { email: string, password: string }): Observable<Response> {

    return this.authService.signIn(signInData).pipe(
      tap(() => this.userSignedIn$.next(true)));

  }
}
