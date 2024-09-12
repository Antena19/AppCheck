// reset-password.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = '';
  validUsers: { username: string; password: string }[] = [
    { username: 'angelina', password: '1234' },
    { username: 'palomita', password: '5678' }
  ];

  constructor(
    private router: Router,
    private storage: Storage // Inyectamos Storage
  ) {}

  async ngOnInit() {
    // Inicializamos el storage
    await this.storage.create();
    // Cargar usuarios del storage
    const storedUsers = await this.storage.get('users');
    if (storedUsers) {
      this.validUsers = storedUsers;
    }
  }

  // Método llamado al enviar el formulario
  onResetPassword() {
    this.resetPassword();
  }

  // Lógica de restablecimiento de contraseña
  async resetPassword() {
    // Limpiar espacios en blanco
    this.username = this.username.trim();
    this.newPassword = this.newPassword.trim();

    console.log('Nombre de Usuario:', this.username);
    console.log('Nueva Contraseña:', this.newPassword);

    // Verificar si el usuario existe (compara el nombre de usuario ingresaso con los que ya existen)
    const userIndex = this.validUsers.findIndex(user => user.username === this.username); 
    
    //Si el nombre ingresado coincide con uno existente, entonces...
    if (userIndex !== -1) {
      // Actualiza la contraseña del usuario
      this.validUsers[userIndex].password = this.newPassword;

      // Guardar usuarios actualizados en el almacenamiento
      await this.storage.set('users', this.validUsers);

      alert(`La contraseña de ${this.username} ha sido restablecida exitosamente.`);
      this.router.navigate(['/login']);
    } else {
      alert('Nombre de usuario no encontrado.');
    }
  }
}
