import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
//import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  totalRegistros: number = 0;
  cargando: Boolean = true;

  hospitalDB: Hospital;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        //console.log( resp );
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;

      });
  }


  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    //console.log ( termino );
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        //console.log( hospitales );
        this.hospitales = hospitales;
        this.cargando = false;

      });
  }

  borrarHospital(hospital: Hospital) {
    //console.log ( hospital );

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        //console.log( borrar );

        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarHospitales();
            });

        }
      });
  }

  crearHospital() {
//    console.log('Entro a crear hospital');
    swal({
      title: "Crear Hospital",
      text: 'Introduzca nombre del nuevo hospital',
      content: "input",
      icon: "info",
      buttons: ["Cancelar","Guardar"],
      dangerMode: true 
    })
      .then((valor: string) => {
        if (!valor || valor.length === 0) return;

        this._hospitalService.crearHospital(valor)
          .subscribe(hospitalNew => {
            console.log(hospitalNew);
            this.cargarHospitales();
          });
  

      });
    }

  guardarHospital(hospital: Hospital) {
    //console.log( borrar );
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
