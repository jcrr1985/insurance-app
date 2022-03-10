import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import '@vs-design-system/ds-title';
import '@vs-design-system/ds-input';
import '@vs-design-system/ds-icon';
import '@vs-design-system/ds-button'



@Component({
  selector: 'app-modal-registrar-medicamento',
  templateUrl: './modal-registrar-medicamento.component.html',
  styleUrls: ['./modal-registrar-medicamento.component.scss']
})
export class ModalRegistrarMedicamentoComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }


}
