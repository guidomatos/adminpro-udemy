import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './service.index';

import {

  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService

} from './service.index';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ]
})
export class ServiceModule { }
