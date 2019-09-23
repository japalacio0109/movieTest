import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from 'app/auth-dialog/auth-dialog.component';
import { MzModalService } from 'ngx-materialize';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { urlRoutes } from '../app-routing.module';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {

  listRoutes: {}[];

  constructor(private modalService: MzModalService, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.listRoutes = urlRoutes.map(it => ({ name: it.data.name.toUpperCase(), needLogin: it.data.needLogin, route: it.path }));

  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }
  
  presentAuthDialog(mode?: 'login' | 'register') {
    this.modalService.open(AuthDialogComponent);
  }

}
