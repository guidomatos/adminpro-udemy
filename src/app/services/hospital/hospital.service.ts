import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) {
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';
    const obj = this.http.get( url );
    console.log(obj);
    return obj;
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
            .pipe(map( resp => {
              swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
              return true;
            }));
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital';

    return this.http.post( url, hospital )
                .pipe(map( (resp: any) => {
                    swal('Hospital creado', hospital.nombre, 'success');
                    return resp.hospital;
                }));
  }

  buscarHospital(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
        .pipe(map( (resp: any) => resp.hospitales ));

  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital )
                .pipe(map ( (resp: any) => {

                  swal('Hospital actualizado', hospital.nombre, 'success');

                  return true;

                }));

  }

}
