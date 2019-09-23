import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Angular2TokenService } from "angular2-token";
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authTokenService: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> | boolean {
        if (this.authTokenService.authService.currentAuthData) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }

}
