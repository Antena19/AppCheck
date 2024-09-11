import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';  // Asegúrate de importar esto
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),],  // Incluye IonicModule
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],  // Proveedor correctamente configurado
  bootstrap: [AppComponent]
})
export class AppModule {}
