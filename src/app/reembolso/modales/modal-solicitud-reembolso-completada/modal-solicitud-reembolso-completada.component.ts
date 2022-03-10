import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import '@vs-design-system/ds-title'
import '@vs-design-system/ds-paragraph'


@Component({
  selector: 'app-modal-solicitud-reembolso-completada',
  templateUrl: './modal-solicitud-reembolso-completada.component.html',
  styleUrls: ['./modal-solicitud-reembolso-completada.component.scss']
})
export class ModalSolicitudReembolsoCompletadaComponent implements OnInit {

  constructor() { }
  @Output() close = new EventEmitter();
  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit('');
  }

}
