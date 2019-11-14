import { Injectable } from '@angular/core';
import { Hospital } from 'src/models/hospital.model';
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

@Injectable()
export class HospitalService {

  hospital: Hospital;
  token: string = this._usuarioService.token;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {
  }



  crearHospital(nombre: string) {

    let url = URL_SERVICIOS + '/hospital';
    url += "?token=" + this.token;

    return this.http.post(url, {nombre})
      .pipe(map((resp: any) => {
        swal('Hospital creado', resp.hospital.nombre, 'success');
        return resp.hospital;
      }));

  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += "?token=" + this.token;

    // console.log( url );

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      }));

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'Hospitales', id)
      .then((resp: any) => {
        //console.log( resp ); // Recibimos un error
        //swal( 'Imagen ant', this.hospital.img, 'success');
        //swal( 'Imagen nue', resp, 'success');
        this.hospital.img = resp.hospital.img;
        swal('Imagen actualizada', this.hospital.nombre, 'success');
      })
      .catch(resp => {
        console.log(resp); // Recibimos un error
      })
  }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);

  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitales));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += "?token=" + this.token;

    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
        //resp.Hospitales 
      }
      ));
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    //url += "?token=" + this.token;

    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospital));
  }

}
