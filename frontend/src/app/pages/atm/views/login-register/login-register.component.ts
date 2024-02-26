import { Component } from '@angular/core';
import { AtmService } from '../../services/atm.service';
import { Genero } from '../../types/atm';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styles: [
    `
      :host ::ng-deep p-calendar {
        span {
          input {
            outline: none;
            background-color: transparent;
          }
        }
      }
    `,
  ],
})
export class LoginRegisterComponent {
  login = {
    username: '',
    password: '',
  };
  register = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    alias: '',
    password: '',
    fechaNacimiento: new Date(),
    avatarUrlBase64: '',
    idRol: 1, // 1 = Usuario
    idGenero: 0,
  };
  isRegister = false;
  generos: Genero[] = [];
  fechaActual = new Date();
  constructor(
    private atmService: AtmService,
    private alertaService: AlertaService
  ) {
    this.getGeneros();
  }
  getGeneros() {
    this.atmService.GENEROS.getGeneros().subscribe((response) => {
      if (!response) return;
      this.generos = response;
    });
  }

  fileToBase64(event: HTMLInputElement) {
    // From HTMLInputElement to a Base64 that can be viewed in img tag
    const file = event.files?.item(0);

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.register.avatarUrlBase64 = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  registerEvent() {
    const {
      alias,
      avatarUrlBase64,
      fechaNacimiento,
      idGenero,
      idRol,
      password,
      primerApellido,
      primerNombre,
      segundoApellido,
      segundoNombre,
    } = this.register;

    // Validaciones
    if (!primerNombre) {
      this.alertaService.showWarn('Ingrese el primer nombre');
      return;
    }
    if (!segundoNombre) {
      this.alertaService.showWarn('Ingrese el segundo nombre');
      return;
    }
    if (!primerApellido) {
      this.alertaService.showWarn('Ingrese el primer apellido');
      return;
    }
    if (!segundoApellido) {
      this.alertaService.showWarn('Ingrese el segundo apellido');
      return;
    }
    if (!alias) {
      this.alertaService.showWarn('Ingrese el alias');
      return;
    }
    if (idGenero === 0) {
      this.alertaService.showWarn('Seleccione un genero');
      return;
    }
    if (fechaNacimiento > new Date()) {
      this.alertaService.showWarn(
        'La fecha de nacimiento no puede ser mayor a la fecha actual'
      );
      return;
    }
    // El usuario debe ser mayor de edad
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
      this.alertaService.showWarn('El usuario debe ser mayor de edad');
      return;
    }
    if (password.length < 8) {
      this.alertaService.showWarn(
        'La contraseña debe tener al menos 8 caracteres'
      );
      return;
    }
    if (!avatarUrlBase64) {
      this.alertaService.showWarn('Seleccione una imagen');
      return;
    }

    this.atmService.CREATE_USER.createUser({
      alias,
      password,
      avatarUrlBase64,
      fechaNacimiento,
      idGenero,
      idRol,
      primerApellido,
      primerNombre,
      segundoApellido,
      segundoNombre,
    }).subscribe((response) => {
      if (!response) return;
      this.alertaService.showSuccess('Usuario creado con éxito');
      this.isRegister = false;
    });
  }
  loginEvent() {
    const { username, password } = this.login;
    if (!username) {
      this.alertaService.showWarn('Ingrese el alias');
      return;
    }
    if (!password) {
      this.alertaService.showWarn('Ingrese la contraseña');
      return;
    }
    this.atmService.LOGIN.login(username, password).subscribe((response) => {
      if (!response) return;
      this.alertaService.showSuccess('Bienvenido');
    });
  }
}
