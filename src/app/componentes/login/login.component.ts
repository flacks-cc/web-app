import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: String;
  password: String;

  constructor(private Titulo: Title, private router: Router) {

    Titulo.setTitle("Login | Flack's Barber Shop")

    this.email = '';
    this.password = '';

  }

  //Método para el inicio de sesión
  iniciaSesion() {
    if (this.email === '20223l001025@utcv.edu.mx' && this.password === '12345678') {
      console.log('Inicio sesión exitoso');
      //Credenciales guardadas en el localStorage
      localStorage.setItem('email', this.email.toString());
    localStorage.setItem('password', this.password.toString());
      this.router.navigate(['/dashboard-usuarios']);
      return true;
    } else {
      console.log('Inicio de sesión fallido');
      return false;
    }
  }

}

