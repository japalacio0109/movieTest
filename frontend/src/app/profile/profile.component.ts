import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

}
