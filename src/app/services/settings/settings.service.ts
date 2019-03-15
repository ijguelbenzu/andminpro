import { Injectable, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  }

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // console.log('Guardado en el LocalStorage')
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
    // console.log('Cargado desde el LocalStorage')
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    this.aplicarTema( this.ajustes.tema );
    } else {
      // console.log('Cargando valores por defecto')
    }
  }

  aplicarTema( tema: string ){
    let url = `assets/css/colors/${ tema }.css`;
    // console.log( url );
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }
}


interface Ajustes {
  temaUrl: string;
  tema: string;

}
