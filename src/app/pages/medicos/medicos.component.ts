import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Medico } from 'src/models/medico.model';
declare var swal: any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalRegistros: number = 0;
  cargando: Boolean = true;
  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
     
  ) { }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarMedicos());
  }
  
  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos()
      .subscribe((resp: any) => {
        //console.log( resp );
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
        this.cargando = false;

      });
  }

  
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }


  buscarMedico(termino: string) {

    //console.log ( termino );
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    //console.log ( termino );
    this.cargando = true;
    this._medicoService.buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        //console.log( hospitales );
        this.medicos = medicos;
        this.cargando = false;

      });
  }

  borrarMedico(medico: Medico) {
    //console.log ( hospital );

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        //console.log( borrar );

        if (borrar) {
          this._medicoService.borrarMedico(medico._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarMedicos();
            });

        }
      });
  }


}
