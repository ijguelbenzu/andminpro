import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})

export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  hospitales: Hospital[] = [];

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
   }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
    .subscribe((resp: any) => {
      //console.log( resp );
      this.hospitales = resp.hospitales;
    });

      this._modalUploadService.notificacion
      .subscribe(resp => {
//        console.log( resp );
          this.medico.img = resp.medico.img;
      });

 }

guardarMedico(f: NgForm ) {

  console.log(f.valid);
  console.log(f.value);

  if (f.invalid){
    return;
  }
  console.log(this.medico);
  this._medicoService.guardarMedico( this.medico )
    .subscribe( medico => {

      this.medico._id = medico._id;
      //console.log( medico );
      this.router.navigate(['/medico', medico._id ]);

    });
  }

  cambioHospital( id: string ) {
    
//    console.log(id);
    this._hospitalService.obtenerHospital( id )
      .subscribe( hospital => {
        this.hospital = hospital; 
        // this.medico.hospital = hospital._id;
        // console.log( this.hospital );
        // console.log( this.medico.hospital );
      });

  }

  cargarMedico( id: string ) {
    this._medicoService.obtenerMedico( id )
      .subscribe( medico => {
        console.log( medico );
        this.medico = medico,
        this.medico.hospital = medico.hospital._id,
//        this.hospital = medico.hospital
        this.cambioHospital( this.medico.hospital );
       } );
  }

  cambiarFotografia() {
      this._modalUploadService.mostrarModal('medicos', this.medico._id);
    }
  
  
}
