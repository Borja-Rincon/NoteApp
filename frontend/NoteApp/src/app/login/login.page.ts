import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,  
    private router: Router,
    private toastController: ToastController
  ) {}

  register() {
    if (!this.email || !this.password) {
      this.showToast('Por favor ingresa todos los campos.');
      return;
    }

    if(!this.validarEmail(this.email)) {
      this.showToast('Por favor ingresa un email correcto');
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Usuario registrado:', response);
        this.showToast('Registro exitoso');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error de registro:', error);
        if (error.status === 409) {
          this.showToast('El email ya está registrado. Por favor, use otro email.');
        } else if (error.status === 400) {
          this.showToast('Datos de registro inválidos. Por favor, verifique la información.');
        } else {
          this.showToast('Error al registrar el usuario. Por favor, intente de nuevo.');
        }
      }
    );
  }

  login() {
    if (!this.email || !this.password) {
      this.showToast('Por favor ingresa todos los campos.');
      return;
    }

    if(!this.validarEmail(this.email)) {
      this.showToast('Por favor ingresa un email correcto');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error de login:', error);
        this.showToast('Error al iniciar sesión.');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }
}
