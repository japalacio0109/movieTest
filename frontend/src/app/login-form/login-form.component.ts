import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    email: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();
  constructor(public authService: AuthService) { }

  ngOnInit() { }

  onSignInSubmit() {

    this.authService.logInUser(this.signInUser).subscribe(

      res => {
        if (res.status === 200) {
          this.onFormResult.emit({ signedIn: true, res });
        }
      },

      err => {
        alert(`Error: ${err}`);
        this.onFormResult.emit({ signedIn: false, err });
      }
    );

  }

}
