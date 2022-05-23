import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-examenes-y-procedimientos',
  templateUrl: './examenes-y-procedimientos.component.html',
  styleUrls: ['./examenes-y-procedimientos.component.scss']
})
export class ExamenesYProcedimientosComponent implements OnInit {
  public valor: any = 0;
  public bonificacion: any = 0;
  public montoReembolso: any = 0;
  public sesionRequired: boolean = false;
  public prestacion: Prestacion = {} as Prestacion;
  public warningMsg: boolean = false;
  public montoReferencia = 50000;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();
  @Input() formatoMoneda!: boolean;

  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;

  constructor(public arancelService: ArancelService) { }
  public sesionesSource = this.arancelService.getSesionesSource;

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
    this.prestacion.sesiones = item.value;
    this.validarMensajeWarning();
  }

  calcMontoReembolso() {
    const prestacion = this.prestacion.valorPrestacion ? this.prestacion.valorPrestacion : 0;
    const bonificacion = this.prestacion.bonificacion ? this.prestacion.bonificacion : 0;
    this.montoReembolso = Number(prestacion) - Number(bonificacion);
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
    if (!this.prestacionInvalid()) {
      this.dataEvent.emit(this.prestacion);
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }

  validarMensajeWarning() {
    if (this.prestacion.bonificacion && this.prestacion.valorPrestacion) {
      const prestacion = this.prestacion.valorPrestacion ? this.prestacion.valorPrestacion : 0;
      const bonificacion = this.prestacion.bonificacion ? this.prestacion.bonificacion : 0;
      const sesiones = this.prestacion.sesiones ? this.prestacion.sesiones : 1;
      const monto = (Number(prestacion) - Number(bonificacion)) / sesiones;
      const result = (this.montoReferencia == monto && monto != 0) ? false : true;
      this.warningMsg = result;
    }
  }

  /**
   * @description valida si la prestacion es invalida
   * @returns {boolean} true | false
   */
  prestacionInvalid() {
    if (this.sesionRequired) {
      if (!this.warningMsg && this.prestacion.sesiones > 0 && this.prestacion.bonificacion >= 0 && this.prestacion.valorPrestacion > 0) return false
      else return true;
    } else {
      if (!this.warningMsg && this.prestacion.bonificacion >= 0 && this.prestacion.valorPrestacion > 0) return false
      else return true;
    }
  }

}
