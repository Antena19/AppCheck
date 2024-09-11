import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Importamos Storage

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  validUsers: User[] = []; // Cambiamos a una variable de clase

  constructor(
    private router: Router,
    private storage: Storage // Inyectamos Storage
  ) {}

  async ngOnInit() {
    // Inicializamos el storage
    await this.storage.create();
    console.log('Storage inicializado.');

    // Cargar usuarios del storage
    this.validUsers = await this.storage.get('users') || []; // Asignar directamente aquí
    console.log('Usuarios válidos cargados:', this.validUsers); // Verifica que se carguen los usuarios

    // Precargar usuarios si el array está vacío
    if (this.validUsers.length === 0) {
      this.validUsers = [
        { username: 'angelina', password: '1234' }, // Ejemplo de usuario
        { username: 'palomita', password: '4321' }, // Otro usuario
      ];
      await this.storage.set('users', this.validUsers); // Guardar los usuarios predeterminados en el storage
      console.log('Usuarios predeterminados agregados:', this.validUsers);
    }
  }

  // Método llamado al enviar el formulario
  onSubmit() {
    console.log('Formulario enviado.'); // Log para el envío del formulario
    this.login();
  }

  // Navega a la página para crear una nueva cuenta
  goToCreateAccount() {
    console.log('Navegando a crear una cuenta nueva.');
    this.router.navigate(['/registro']); // Asegúrate de que esta ruta sea correcta
  }

  // Lógica de autenticación dentro del componente
  async login() {
    // Limpiar espacios en blanco
    this.username = this.username.trim();
    this.password = this.password.trim();

    console.log('Username:', this.username);
    console.log('Password:', this.password);

    let foundUser = false;

    // Cargar usuarios del storage para asegurarse de tener la lista más actualizada
    this.validUsers = await this.storage.get('users') || []; // Actualiza la lista de usuarios

    // Verificar si el usuario existe en la lista de usuarios almacenados
    for (const user of this.validUsers) {
      console.log(`Comparando: ${user.username} con ${this.username} y ${user.password} con ${this.password}`);
      if (user.username === this.username && user.password === this.password) {
        foundUser = true;
        console.log(`Usuario encontrado: ${user.username}`);
        break; // Salir del bucle si se encuentra el usuario
      }
    }

    if (foundUser) {
      await this.storage.set('username', this.username);
      console.log('Almacenando nombre de usuario en el storage:', this.username);
      this.router.navigate(['/home']);
      console.log('Inicio de sesión exitoso.');
    } else {
      alert('Usuario o contraseña inválidos');
      console.log('Error en inicio de sesión.'); 
    }
  }

  // Método para limpiar el input de usuario o contraseña
  clearInput(field: string) {
    if (field === 'username') {
      this.username = ''; // Vacía el campo de usuario
      console.log('Campo de usuario limpiado.');
    } else if (field === 'password') {
      this.password = ''; // Vacía el campo de contraseña
      console.log('Campo de contraseña limpiado.');
    }
  }

  goToResetPassword() {
    console.log('Navegando a restablecer la contraseña.');
    this.router.navigate(['/reset-password']);
  }
}
