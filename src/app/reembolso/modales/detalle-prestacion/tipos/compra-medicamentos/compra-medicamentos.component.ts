import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();

  public prestacion: Prestacion = {} as Prestacion;
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
