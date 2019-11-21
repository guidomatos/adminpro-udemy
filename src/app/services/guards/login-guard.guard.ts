import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public usuarioService: UsuarioService,
    public router: Router
    ) {

  }

  canActivate() {

    if ( this.usuarioService.estaLogueado() ) {
      console.log('Paso por el login Guard');
      return true;
    } else {
      console.log( 'Bloqueado por guard');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
