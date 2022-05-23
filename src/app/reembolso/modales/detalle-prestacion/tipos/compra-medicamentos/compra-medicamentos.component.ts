import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'
import { ArancelService } from 'src/app/shared/services/arancel-service.service';


@Component({
  selector: 'app-compra-medicamentos',
  templateUrl: './compra-medicamentos.component.html',
  styleUrls: ['./compra-medicamentos.component.scss']
})
export class CompraMedicamentosComponent implements OnInit {
  valor: any = 0;
  bonificacion: any = 0;
  montoReembolso: any = 0;
  sesionRequired: boolean = false;
  warningMsg: boolean = false;
  montoReferencia: number = 50000;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();
  @Input() formatoMoneda!: boolean;
  public prestacion: Prestacion = {} as Prestacion;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;

  constructor(public arancelService: ArancelService, public fb: FormBuilder) { }
  public sesionesSource = this.arancelService.getSesionesSource;
  public forma!: FormGroup;

  ngOnInit(): void {
    this.forma = this.fb.group({
      pres: [''],
      ses: [''],
      val: [''],
      bon: ['']
    })
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
