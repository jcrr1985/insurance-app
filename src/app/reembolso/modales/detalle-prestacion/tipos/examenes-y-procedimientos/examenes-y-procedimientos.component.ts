import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'

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
  constructor() { this.initData() }

  ngOnInit(): void {
  }

  sourceSearch = [
    { key: 'Psiquiatria', value: '1', sesionRequired: true },
    { key: 'Dental', value: '2', sesionRequired: true },
    { key: 'Omeprazol', value: '3', sesionRequired: false },
    { key: 'Lentes', value: '4', sesionRequired: false },
    { key: 'Examenes', value: '5', sesionRequired: false }
  ]
  sourceSelect = [
    { key: '1 sesion', value: 1 },
    { key: '2 sesiones', value: 2 },
    { key: '3 sesiones', value: 3 },
    { key: '4 sesiones', value: 4 },
    { key: '5 sesiones', value: 5 }
  ]
  initData() {
    this.prestacion = {
      tipoPrestacion: 'Examenes y Precedimientos',
      prestacionSeleccionada: '',
      numerosesiones: '0',
      bonificacion: 0,
      valorPrestacion: 0
    }
  }
  itemSelected(item: any) {
    console.log(item);
    this.sesionRequired = item.sesionRequired;
    this.prestacion.prestacionSeleccionada = item.key;
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
