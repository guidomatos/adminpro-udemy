import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = null;
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();

    this.modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );

  }

  mostrarModal( id: string) {
    this.modalUploadService.mostrarModal( 'hospitales', id);
  }

  cargarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales()
        .subscribe( (resp: any) => {
            this.totalRegistros = resp.total;
            this.hospitales = resp.hospitales;
            this.cargando = false;
          });
  }

  obtenerHospital(id: string) {

    this.cargando = true;

    this.hospitalService.obtenerHospital(id)
        .subscribe( (resp: any) => {
            this.hospital = resp.hospital;
            this.cargando = false;
          });
  }

  buscarHospital( termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital( termino )
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
  }

  borrarHospital( hospital: Hospital) {

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {

        this.hospitalService.borrarHospital( hospital._id )
            .subscribe( borrado => {
                this.cargarHospitales();
            });

      }
    });

  }

  crearHospital() {
    
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital( hospital )
          .subscribe();
  }

  actualizarImagen(hospital: Hospital) {
    this.modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
