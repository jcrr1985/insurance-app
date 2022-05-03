import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'


@Component({
  selector: 'app-atencion-hospitalaria',
  templateUrl: './atencion-hospitalaria.component.html',
  styleUrls: ['./atencion-hospitalaria.component.scss']
})
export class AtencionHospitalariaComponent implements OnInit {
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
    { label: '1 sesión', value: '1' },
    { label: '2 sesiónes', value: '2' },
    { label: '3 sesiónes', value: '3' },
    { label: '4 sesiónes', value: '4' },
    { label: '5 sesiónes', value: '5' },
    { label: '6 sesiónes', value: '6' },
    { label: '7 sesiónes', value: '7' },
    { label: '8 sesiónes', value: '8' },
    { label: '9 sesiónes', value: '9' },
    { label: '10 sesiónes', value: '10' },
  ]
  initData() {
    this.prestacion = {
      tipoPrestacion: 'Atencion Hospitalaria',
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
