import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'abcEvents';
  login = true;
  activeBtnLogin = false;
  activeBtnRegister = false;
  password = '';
  rePassword = '';
  email = '';
  showEvents = false;
  hasError = false;
  regExpValidMail: RegExp = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;
  errorMail = false;

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit() {
  }

  setMail(value) {
    this.email = value;
    this.validInput();
  }

  setRePassword(value) {
    this.rePassword = value;
    this.validInput();
  }

  setPassword(value) {
    this.password = value;
    this.validInput();
  }

  validInput() {
    this.validateEmail();
    if (this.login) {
      this.activeBtnLogin = this.email.length > 0 && this.password.length > 0;
    } else {
      if (this.password.length > 0 && this.rePassword.length > 0) {
        this.hasError =  (this.password !== this.rePassword) || this.password.length < 5 || this.rePassword.length < 5;
      }
      this.activeBtnRegister = this.email.length > 0 && this.password.length > 0 && this.rePassword.length > 0 && !this.hasError;
    }
  }

  showCreateUser() {
    this.login = !this.login;
  }

  createUser() {
    const request = {
      password: this.password,
      email: this.email
    };

    this.userService.createUser(request).subscribe(
      response => {
        alert('Usuario creado exitosamente');
        this.restartData();
      }, error => {
        alert('Error creando el usuario, intenta de nuevo');
        this.restartData();
      }
    );
  }

  validUser() {
    sessionStorage.setItem('mailUser', this.email);
    const request = {
      password: this.password,
      email: this.email
    };

    this.userService.authUser(request).subscribe(
      response => {
        sessionStorage.setItem('idUser', response.body.id);
        this.route.navigate(['events']);
      }, error => {
        console.log('error authUser user ' , error);
      }
    );
  }

  restartData() {
    this.email = '';
    this.password = '';
    this.rePassword = '';
    this.login = true;
    this.activeBtnLogin = false;
    this.activeBtnRegister = false;
  }

  validateEmail(): boolean {
    if (this.regExpValidMail.test(this.email)) {
      this.errorMail = false;
      return false;
    } else {
      this.errorMail = true;
      return true;
    }
  }

}

