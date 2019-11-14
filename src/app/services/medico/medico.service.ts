import { Injectable } from '@angular/core';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from 'src/models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
//import swal from 'sweetalert';
declare var swal: any;
//import  'rxjs/add/operator/map';
//import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  hospital: Hospital;
  medico: Medico;
  token: string = this._usuarioService.token;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {
  }

  cargarMedicos() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url);

  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));
  }


  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += "?token=" + this.token;

    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal('Médico borrado', 'El mmédico ha sido eliminado correctamente', 'success');
        return true;
        //resp.Hospitales 
      }
      ));
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Si existe hay que actualizar
      url += '/' + medico._id + "?token=" + this.token;

      //    if (medico._id === 'nuevo') {
      return this.http.put(url, medico)
        .pipe(map((resp: any) => {
          swal('Médico actualizado', resp.medico.nombre, 'success');
          return resp.medico;
        }));
    } else {
      // Si no, hay que crear el médico
      url += "?token=" + this.token;

      //    if (medico._id === 'nuevo') {
      return this.http.post(url, medico)
        .pipe(map((resp: any) => {
          swal('Médico creado', resp.medico.nombre, 'success');
          return resp.medico;
        }));
      //    }
    }
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    //url += "?token=" + this.token;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.medico));
  }

}
