import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router de Angular

// Definimos el componente de Angular
@Component({
  selector: 'app-login', // Nombre del selector del componente
  templateUrl: './login.page.html', // La URL del template HTML
  styleUrls: ['./login.page.scss'], // La URL de los estilos de la página
})
export class LoginPage implements OnInit {

  // Almacenamos el nombre del usuario y el password en variables
  username: string = '';
  password: string = '';

  constructor(private router: Router) { 
    // El constructor de la clase recibe una instancia de `Router` como un parámetro inyectado.
  }

  onSubmit() {
    this.login(); // Llama al método login al enviar el formulario
  }

  goToCreateAccount() {
    // Navega a la página de crear cuenta nueva
    this.router.navigate(['/create-account']);
  }

  login() {
    // Limpiar espacios en blanco
    this.username = this.username.trim();
    this.password = this.password.trim();

    console.log('Username:', this.username); // Verifica el nombre de usuario
    console.log('Password:', this.password); // Verifica la contraseña

    // Definimos los usuarios válidos para pruebas
    const validUsers = [
      { username: 'angelina', password: '1234' },
      { username: 'palomita', password: '5678' }
    ];

    // Verificamos si el usuario ingresado existe en la lista de usuarios válidos
    const user = validUsers.find(user => user.username === this.username && user.password === this.password);

    if (user) {
      // Navega a la página de inicio si las credenciales son correctas
      this.router.navigate(['/home'], {
        queryParams: { username: this.username }
      });
    } else {
      // Muestra un mensaje de error si las condiciones no se cumplen
      alert('Usuario o contraseña inválidos');
    }
  }

  ngOnInit() {
    // Método que se ejecuta al inicializar el componente
  }

  // METODO PARA LIMPIAR INPUT
  clearInput(field: string) {
    if (field === 'username') {
      this.username = ''; // Vacía el campo de usuario
    } else if (field === 'password') {
      this.password = ''; // Vacía el campo de contraseña
    }
  }
}
