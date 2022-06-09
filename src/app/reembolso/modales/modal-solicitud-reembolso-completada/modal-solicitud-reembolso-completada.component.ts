import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import '@vs-design-system/ds-title'
import '@vs-design-system/ds-paragraph'


@Component({
  selector: 'app-modal-solicitud-reembolso-completada',
  templateUrl: './modal-solicitud-reembolso-completada.component.html',
  styleUrls: ['./modal-solicitud-reembolso-completada.component.scss']
})
export class ModalSolicitudReembolsoCompletadaComponent implements OnInit {
  fecha: any;
  rutPrestador!: number;

  constructor(private datastorage: DataStorageService) { }
  @Output() close = new EventEmitter();
  ngOnInit(): void {

    this.fecha = this.datastorage.getFechaAtencion()
    this.rutPrestador = this.datastorage.getRutEmpresa;
  }

  closeModal() {
    this.close.emit('');
  }

}
