import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de tener instalado @ionic/storage-angular

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombre: string = '';
  username: string = ''; // Nueva variable para almacenar el nombre de usuario

  constructor(
    private router: Router,
    private storage: Storage // Inyecta el servicio Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el storage
    this.username = await this.storage.get('username') || 'Usuario'; // Obtiene el nombre de usuario del storage
  }

  // Método para escanear el código QR
  scanQRCode() {
    console.log('Escaneando código QR...');
    // Aquí puedes agregar la lógica para el escaneo de QR
  }

  // Método para registrar la asistencia
  registerAttendance() {
    if (this.nombre.trim() !== '') {
      console.log('Registrando asistencia para', this.nombre);
      // Redirige a la página de login después de registrar la asistencia
      this.router.navigate(['/login']);
    } else {
      alert('Por favor ingresa un nombre válido.');
    }
  }
}

