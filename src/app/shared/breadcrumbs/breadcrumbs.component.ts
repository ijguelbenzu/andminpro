import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

    titulo: string;

  constructor( private router: Router,
    private title: Title,
    private meta: Meta ) {

    this.getDataRoute()
    .subscribe(  data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );
      // Estamos definiendo metatags en las páginas
      // para tener información en ella de lo que
      // nos interese.
      const metaTag: MetaDefinition = {

        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag( metaTag );
    })
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
    // El router.events devuelve una subscripción que
    // permite recibir diversos valores
    // con este filtro devuelve 2 lineas que producen ActivationEnd
    // la de la página a la que vamos y la general de pages
    // en la primera hay un valor firstChild que está a nulos
    // y en la segunda tiene valor, por lo que podemos usarlo
    // para elegir la primera página
    filter( evento => evento instanceof ActivationEnd ),
    // Si no se pone entre parentesis (evento: ActivationEnd) da error
    filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
    map(  (evento: ActivationEnd) => evento.snapshot.data )


    );


  }

}
