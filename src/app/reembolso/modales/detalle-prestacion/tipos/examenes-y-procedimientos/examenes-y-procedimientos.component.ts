import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-examenes-y-procedimientos',
  templateUrl: './examenes-y-procedimientos.component.html',
  styleUrls: ['./examenes-y-procedimientos.component.scss']
})
export class ExamenesYProcedimientosComponent implements OnInit {
  valor: any = 0;
  bonificacion: any = 0;
  montoReembolso: any = 0;
  sesionRequired: boolean = false;
  prestacion!: Prestacion;
  warningMsg: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();

  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;

  constructor(public arancelService: ArancelService) { }

  ngOnInit(): void {
      //
  }

  itemSelected(arancel: IArancel) {
    this.sesionRequired = arancel.RequiereSesiones === '1' ? true : false;
    this.prestacion.prestacionSeleccionada = arancel.Arancel;
    this.prestacion.tipoPrestacion = arancel.TipoLiquidacion
    this.textoArancel = arancel.Arancel;
    this.textoArancelSeleccionado.emit(this.textoArancel);
  }

  selectEvent(item: any) {
    this.prestacion.numerosesiones = item.key;
  }

  calcMontoReembolso() {
    this.montoReembolso = Number(this.prestacion.valorPrestacion) - Number(this.prestacion.bonificacion);
  }

  setValue(key: any, value: any) {
    switch (key) {
      case 'valor':
        this.prestacion.valorPrestacion = value;
        break;
      case 'bonificacion':
        this.prestacion.bonificacion = value;
        break;
      default:
        break;
    }
    this.calcMontoReembolso();
  }

  sendData() {
    this.dataEvent.emit(this.prestacion);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

}
