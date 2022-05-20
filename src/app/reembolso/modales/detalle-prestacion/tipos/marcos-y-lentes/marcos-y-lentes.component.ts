import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-marcos-y-lentes',
  templateUrl: './marcos-y-lentes.component.html',
  styleUrls: ['./marcos-y-lentes.component.scss']
})
export class MarcosYLentesComponent implements OnInit {
  valor: any = 0;
  bonificacion: any = 0;
  montoReembolso: any = 0;
  sesionRequired: boolean = false;
  warningMsg: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();
  @Input() formatoMoneda!:boolean;

  public prestacion: Prestacion = {} as Prestacion; // quien le da valor a esta variable?
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;
  
  constructor(public arancelService: ArancelService) { }
  public sesionesSource = this.arancelService.getSesionesSource;
  public formatter = new Intl.NumberFormat('es-CL');
  
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
    const prestacion = this.prestacion.valorPrestacion ? this.prestacion.valorPrestacion : 0;
    const bonificacion = this.prestacion.bonificacion ? this.prestacion.bonificacion : 0;
    this.montoReembolso = this.format(Number(prestacion) - Number(bonificacion));
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


  format(valor: any) {
    const reg = /[^0-9,0-9]/g
    const incluyedecimal: boolean = valor.toString().includes(',');
    // limpiamos el valor en caso que el usuario haya separado con , los separadores de mil o insertado alguna letra
    const valorSinLetras = valor.toString().replace(reg, '');
    const valorParaParsear = valorSinLetras.replace(',', '.');
    const valorParseado = Number(valorParaParsear);
    const format = this.formatter.format(valorParseado);
    const incluyedecimal2 = format.includes(',');
    // parseamos el valor una vez se ha validado que es un numero
    return '$ ' + format + `${incluyedecimal && !incluyedecimal2 ? ',' : ''}`;
  }

}
