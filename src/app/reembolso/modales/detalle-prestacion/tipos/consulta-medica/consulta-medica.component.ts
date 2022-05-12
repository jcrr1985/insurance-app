import { IArancel } from './../../../../../shared/interfaces/arancel';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'


@Component({
  selector: 'app-consulta-medica',
  templateUrl: './consulta-medica.component.html',
  styleUrls: ['./consulta-medica.component.scss']
})


export class ConsultaMedicaComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();

  public valor: any = 0;
  public bonificacion: any = 0;
  public montoReembolso: any = 0;
  public sesionRequired: boolean = false;
  public prestacion: Prestacion = {} as Prestacion;
  public warningMsg: boolean = false;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;
  public sourceSearch: any;
  public sesionesSource = this.arancelService.getSesionesSource;

  constructor(public arancelService: ArancelService) { }

  ngOnInit(): void {
    console.log('prestacioSeleccionada', this.prestacioSeleccionada);
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
    this.dataEvent.emit(this.prestacion);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

}

const previsionesArray = [
  { label: 'Seleccione', value: 0, selected: false },
  { label: 'Fonasa', value: 1, selected: false },
  { label: 'Colmena', value: 2, selected: false },
  { label: 'Consalud', value: 3, selected: false },
  { label: 'Cruz Blanca', value: 4, selected: false },
  { label: 'Banmédica', value: 5, selected: false },
  { label: 'Masvida', value: 6, selected: false },
  { label: 'Vida', value: 7, selected: false },

];

