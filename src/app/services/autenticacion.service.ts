import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private usuarioLogueado: boolean = false;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el Storage
  async init() {
    await this.storage.create(); // Inicializa el almacenamiento si no está ya hecho
    const username = await this.storage.get('username'); // Revisa si hay un usuario en el storage
    this.usuarioLogueado = !!username; // Si hay un nombre de usuario, el usuario está logueado
  }

  // Verifica si el usuario está logueado (retorna una promesa)
  async estaLogueado(): Promise<boolean> {
    return this.usuarioLogueado; // Retorna el estado de logueo actual
  }

  // Método para iniciar sesión (almacena el usuario en el storage)
  async iniciarSesion(username: string) {
    await this.storage.set('username', username); // Almacena el usuario
    this.usuarioLogueado = true; // Actualiza el estado de logueo
  }

  // Método para cerrar sesión
  async cerrarSesion() {
    await this.storage.remove('username'); // Elimina el nombre de usuario del storage
    this.usuarioLogueado = false; // Actualiza el estado de logueo
  }
}
