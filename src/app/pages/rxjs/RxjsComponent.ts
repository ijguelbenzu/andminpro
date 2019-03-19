// Dejo la prueba de observer.next en rxjs1
// Porque vamos a hacerle a esta varios cambios y no quiero perder la otra.
// Renombro las llamadas para que no interfiera con esta.

// Lo ultimo que hacemos es ver como cortar el observador
// cuando salimos de la página, porque suele ser
// el momento en el que ya no nos interesa, y si
// no ponemos una forma de cortyar el observador,
// el proceso sigue hasta el infinito, aunque estemos cambiando de página.
// Para esto hay que implementar el OnDestroy en la página.
// Además, para ejecutar el unsubscribe(), necesitamos una
// referencia a la subscripcion, por lo que hay que definir
// una variuable del tipo subcripcion y darle, de valor,
// la subscripcion, así en el destroy podemos hacer referencia
// a la subscripción para cortarla.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
// filter nos va a servir, en la función
// para poder elegir los datos que enviamos
// (en este caso los numeros impares)
// En unos datos podría ser los registros que empezasen por 'I'
// o que el 4º caracter sea un '0'...
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  ngOnInit(): void {

   }

   ngOnDestroy() {
     console.log('La pagina se va a cerrar');
     this.subscripcion.unsubscribe();

   }
  constructor() {
    this.subscripcion = this.regresaObservable()
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

    regresaObservable(): Observable<any> {
      // Esto podría ser let obs = new ...
      // y después return obs; pero como es todo una
      // instrucción, se puede dejas asi.
      return new Observable((observer: Subscriber<any>) => {
        let contador = 0;
        const intervalo = setInterval(() => {
          contador += 1;

          const salida = {
            valor: contador
          }


          observer.next(salida);
          // if (contador === 3) {
          //   clearInterval(intervalo);
          //   observer.complete();
          // }
          // if (contador === 2) {
            // La instruccion clear comenta hace que se reinicialice
            // el observador, por lo que el contador también volvería a 0
            // Sin el, cuando da el error, pasa por el pipe, pero no
            // inicializa el contador, por lo que llega a 3 y el proceso
            // acaba sin errores.
            // Si noi estuviera comentada, iría a 0, por lo que el pipe
            // haría 2 reintentos, pero, al final daría el error,
            // iría 1, 2, 1, 2, 1, 2, error
            // clearInterval(intervalo);
          //   observer.error('¡Auxilio!');
          // }
          }, 1000);
      }).pipe(
        // map nos permite convertir un objeto que llega de una api
        // no creada por nosotros en los valores que nos interesan.
        // La funcion de flecha permite sustituir { return resp.valor }
        // por lo que ha quedado
        map( resp => resp.valor ),
        filter(  ( valor, index ) => {
          //console.log('Filter ', valor, index);

          if ( (valor % 2) === 1 ) {
            // Es un numero impar
            return true;
          } else {
            // Es un numero par
            return false;
          }
        } ),
      )

    }
}
