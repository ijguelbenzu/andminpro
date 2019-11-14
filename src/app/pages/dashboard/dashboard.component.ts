import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this._modalUploadService.ocultarModal();
//    this._modalUploadService.oculto = 'oculto';
  }

}
