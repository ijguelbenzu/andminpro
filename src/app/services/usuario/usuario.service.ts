import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';

//import  'rxjs/add/operator/map';
//import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  estaLogueado() {
    this.cargarStorage();
    return ( this.token.length>5 ? true : false);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token=localStorage.getItem('token');
      this.usuario=JSON.parse(localStorage.getItem('usuario'));//Para pasar de JSON a objeto
  } else {
    this.token='';
    this.usuario=null;
  }
}
  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        swal('Usuario creado',usuario.email, 'success');
        return resp.usuario;
      }));

  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, {token} )
       .pipe(map( (resp: any) => {
         this.guardarStorage( resp.id, resp.token, resp.usuario);

         return true;
         })
         )
  }

  login ( usuario: Usuario, recordar: Boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        return true;
        })
        );
        

  }
}
