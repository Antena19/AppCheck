import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Importamos Storage

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private storage: Storage // Inyectamos Storage
  ) {}

  async ngOnInit() {
    // Inicializamos el storage
    await this.storage.create();
    console.log('Storage inicializado'); // Verifica si el almacenamiento se inicializa correctamente
  }

  // Método llamado al enviar el formulario
  onRegister() {
    this.register();
  }

  // Lógica de registro de usuario
  async register() {
    // Limpiar espacios en blanco
    this.username = this.username.trim();
    this.password = this.password.trim();

    // Validaciones
    if (this.username.length < 3 || this.username.length > 8) {
      alert('El nombre de usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (this.password.length !== 4 || !/^\d+$/.test(this.password)) {
      alert('La contraseña debe tener exactamente 4 dígitos numéricos.');
      return;
    }

    console.log('Nombre de Usuario:', this.username);
    console.log('Contraseña:', this.password);

    // Obtener usuarios existentes del storage
    const storedUsers: User[] = await this.storage.get('users') || [];
    console.log('Usuarios almacenados antes de agregar:', storedUsers);
    
    // Verificar si el nombre de usuario ya existe
    const userExists = storedUsers.find((user: User) => user.username === this.username);

    if (userExists) {
      alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
    } else {
      // Crear un nuevo usuario y almacenarlo
      const newUser: User = { username: this.username, password: this.password };
      storedUsers.push(newUser);
      
      // Guardar usuarios actualizados en el storage
      await this.storage.set('users', storedUsers);
      console.log('Usuarios almacenados después de agregar:', storedUsers); // Verifica que el nuevo usuario se haya agregado
      
      alert(`Cuenta creada exitosamente para ${this.username}.`);
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
