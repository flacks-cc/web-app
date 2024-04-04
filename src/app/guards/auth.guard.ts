import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      window.alert('La acción que quieres realizar requiere iniciar sesión.');
      return false;
    }
  }

  // Método para verificar si el usuario está autenticado
  private isLoggedIn(): boolean {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return email === '20223l001025@utcv.edu.mx' && password === '12345678';
  }
}
