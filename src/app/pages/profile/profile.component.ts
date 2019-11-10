import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe(
        // se puede quitar porque no hace nada
        //   resp => {
        //   console.log ( resp );
        // }
      );
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return; // Si cancelamos sin elegir, no hacemos nada
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
    // {
    //   console.log(reader.result);
    // }
//    console.log( this.imagenTemp );


//    console.log(archivo);

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
