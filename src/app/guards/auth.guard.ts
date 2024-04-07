import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn() && this.isAdmin()) {
      console.log('El usuario está autenticado y tiene el rol de administrador. Permitiendo acceso.');
      return true; 
    } else {
      console.log('El usuario no está autenticado o no tiene el rol de administrador. Redirigiendo a la página de inicio de sesión.');
      // Mostrar alerta si el usuario no es administrador
      if (!this.isLoggedIn()) {
        window.alert('Debes iniciar sesión para acceder a esta página.');
      } else if (!this.isAdmin()) {
        window.alert('La acción que quieres realizar requiere iniciar sesión como administrador.');
      }
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Método para verificar si el usuario está autenticado
  private isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Verifica si el token existe
  }

  // Método para verificar si el usuario tiene el rol de administrador
  private isAdmin(): boolean {
    const authoritiesString = localStorage.getItem('authorities');
    if (authoritiesString) {
      const authorities = JSON.parse(authoritiesString);
      // Verifica si entre las autoridades del usuario se encuentra 'ROLE_ADMIN'
      return authorities.some((authority: { authority: string }) => authority.authority === 'ROLE_ADMIN');
    }
    return false;
  }
}
