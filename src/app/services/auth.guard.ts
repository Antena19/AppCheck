import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service'; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AutenticacionService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.estaLogueado(); // Lógica de verificación
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
      return false;
    }
    return true; // Permitir el acceso si está autenticado
  }
}
