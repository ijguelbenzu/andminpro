import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs1',
  templateUrl: './rxjs1.component.html',
  styles: []
})

export class RxjsComponent {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor() {
    this.regresaObservable().pipe(
      // Número de reintentos si da un error
      retry(2)
     )
    .subscribe(
      // Al decirle abajo que la función retorna un number
      // Ya sabe que numero es un número, y tiene
      // todas las funciones de los números, aunque
      // no lo hayamos especificado aquí.
      numero => console.log('Subs ', numero),
      // Por aquí entrara cuando llegue un error
      // Por ejemplo, la instruccion observer.error devuelve un error
      error => console.error('Error en el obs ', error),
      // Y por aquí entra cuando se finaliza el observador
      // con la instruccion observer.complete()
      () => console.log( '¡El observador terminó!' )
    );
  }

    regresaObservable(): Observable<number> {
      // Esto podría ser let obs = new ...
      // y después return obs; pero como es todo una
      // instrucción, se puede dejas asi.
      return new Observable((observer) => {
        let contador = 0;
        let intervalo = setInterval(() => {
          contador += 1;
          observer.next(contador);
          if (contador === 3) {
            clearInterval(intervalo);
            observer.complete();
          }
          if (contador === 2) {
            // La instruccion clear comenta hace que se reinicialice
            // el observador, por lo que el contador también volvería a 0
            // Sin el, cuando da el error, pasa por el pipe, pero no
            // inicializa el contador, por lo que llega a 3 y el proceso
            // acaba sin errores.
            // Si noi estuviera comentada, iría a 0, por lo que el pipe
            // haría 2 reintentos, pero, al final daría el error,
            // iría 1, 2, 1, 2, 1, 2, error
            // clearInterval(intervalo);
            observer.error('¡Auxilio!');
          }
          }, 1000);
      });

    }
}
