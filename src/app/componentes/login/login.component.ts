import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private title: Title, private usuarioService: UsuarioService, private router: Router) {
    this.title.setTitle("Login | Flack's Barber Shop");
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  iniciaSesion() {
    this.usuarioService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('token', response.token);
        localStorage.setItem('authorities', JSON.stringify(response.authorities)); // Almacena las autoridades
        console.log('Token guardado:', response.token); // Agregado console.log para verificar el token
        localStorage.setItem('usuario', JSON.stringify(response));
        this.router.navigate(['/dashboard-usuarios']);
      },
      (error) => {
        console.log('Inicio de sesión fallido:', error.error.message);
        this.errorMessage = error.error.message;
      }
    );
  }
}
