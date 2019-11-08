import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/models/usuario.model';

declare function init_pluggins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: Boolean = false;

  auth2: any;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
     ) { }

  ngOnInit() {
    init_pluggins();
    this.googleInit();

    // Coge el email o '' si no existe email en el localStorage
    this.email = localStorage.getItem('email') || ''; 
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }


  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '304164700555-viojo45s9hmum84c22jk6l7ifkmjn3ea.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      //console.log(token);
      this._usuarioService.loginGoogle ( token )
      .subscribe(() => this.router.navigate([ '/dashboard' ]) );
      //.subscribe(()  => window.location.href = '#/dashboard' ); // si falla la de arriba.
  });
}

  ingresar( forma: NgForm ) {
    if ( forma.invalid ){
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe(() => this.router.navigate([ '/dashboard' ]) );
  }
}
