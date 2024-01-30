import { Component } from '@angular/core';
import { AriMilService } from '../../services/ari-mil.service';
import { Country } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  modeRegister = false;

  disabledRegister = false;
  disabledLogin = false;

  loginForm = {
    userOrEmail: '',
    password: '',
  };

  registerForm = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    country: '',
  };

  paises: Country[] = [];

  constructor(private ariMilService: AriMilService) {
    this.getPaises();
  }

  toggleRegister() {
    this.modeRegister = !this.modeRegister;
  }

  login() {
    if (!this.loginForm.userOrEmail || !this.loginForm.password) {
      alert('Faltan datos');
      return;
    }
    this.disabledLogin = true;
    this.ariMilService
      .login({
        userNameOrEmail: this.loginForm.userOrEmail,
        password: this.loginForm.password,
      })
      .subscribe(
        (resp) => {},
        (err) => {
          alert('Error al iniciar sesión, intente de nuevo');
        },
        () => {
          this.disabledLogin = false;
        }
      );
  }

  register() {
    if (
      !this.registerForm.fullname ||
      !this.registerForm.username ||
      !this.registerForm.email ||
      !this.registerForm.password ||
      !this.registerForm.country
    ) {
      alert('Faltan datos');
      return;
    }
    this.disabledRegister = true;
    this.ariMilService.register(this.registerForm).subscribe(
      (resp) => {},
      (err) => {
        alert('Error al registrar, intente de nuevo');
      },
      () => {
        this.disabledRegister = false;
      }
    );
  }

  getPaises() {
    this.ariMilService.getPaises().subscribe((resp) => {
      this.paises = resp;
    });
  }
}
