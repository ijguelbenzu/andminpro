import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contar3().then(
      (respuesta) => console.log('¡Terminó!', respuesta)
    )
    .catch( error => console.error('Error en la promesa', error));
  }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {

    // Una promesa devuelve esos 2 valores: resolve y reject
    // resolve cuando no hay problemas y reject si hay problemas
      return new Promise( ( resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( ()=>{

        contador += 1;

        console.log( contador );

        if ( contador === 3 ){
          resolve( true );
          clearInterval(intervalo);
        }

      },1000 );

    });

  }
}
