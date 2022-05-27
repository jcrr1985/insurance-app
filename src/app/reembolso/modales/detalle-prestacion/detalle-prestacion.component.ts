import { DataStorageService } from './../../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { Component, OnInit, AfterViewInit, EventEmitter, Output, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Arancel } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-detalle-prestacion',
  templateUrl: './detalle-prestacion.component.html',
  styleUrls: ['./detalle-prestacion.component.scss'],
})
export class DetallePrestacionComponent
  implements OnInit {
  public modalMontoReembolso!: number;
  public prestacionNombre!: any;
  public idprestacionSeleccionada!: number;
  public stepsStatusOn: any;
  public prestacionSeleccionada: any = {};
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  public valor: any = 0;
  public bonificacion: any = 0;
  public montoReembolso: any = 0;
  public sesionRequired: boolean = false;
  public arancel: Arancel = {} as Arancel;
  public warningMsg: boolean = false;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public sourceSearch: any;
  public sesionesSource = this.arancelService.getSesionesSource;
  public form : any;
  public labelArancel : string = 'Nombre Prestación';
  public labelValor : string = 'Valor';
  public labelValorBon : string = 'Bonificación Isapre/Fonasa';
  public esBoletaFactura : boolean = false;


  public montoReferencia = 50000;

  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService) { }

  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idprestacionSeleccionada = id);
    if(this.idprestacionSeleccionada == 6){
      this.labelArancel = 'Nombre Medicamento';
      this.labelValor = 'Valor Medicamento';
      this.labelValorBon = 'Descuento Institución';
    }
    if(this.stepsStatusOn.stepFour_general.tipoDocumentoSeleccionado == 3){
      this.esBoletaFactura = true;
      this.arancel.bonificacion = 0;
    }


  }

  closeModal(): void {
    this.hideModalEvent.emit(false);
  }

  itemSelected(arancel: IArancel) {
    this.sesionRequired = arancel.RequiereSesiones === '1' ? true : false;
    this.arancel.prestacionSeleccionada = arancel.Arancel;
    this.arancel.tipoPrestacion = arancel.TipoLiquidacion
    this.arancelService.montoHistorico = 0;
    this.arancelService.esDesviado = false;
  }

  selectEvent(item: any) {
    this.arancel.numerosesiones = item.key;
    this.arancel.sesiones = item.value;
    this.validarMensajeWarning();
  }

  calcMontoReembolso() {
    const prestacion = this.arancel.valorPrestacion ? this.arancel.valorPrestacion : 0;
    const bonificacion = this.arancel.bonificacion ? this.arancel.bonificacion : 0;
    this.montoReembolso = Number(prestacion) - Number(bonificacion);
  }

  setValue(key: any, value: any) {
    switch (key) {
      case 'valor':
        this.arancel.valorPrestacion = value;
        break;
      case 'bonificacion':
        this.arancel.bonificacion = value;
        break;
      case 'sesiones':
        this.arancel.sesiones = value;
        break;
      default:
        break;
    }
    this.calcMontoReembolso();
  }

  sendData() {
    if (!this.prestacionInvalid()) {
      this.dataStorageService.agregarPrestacion(this.arancel);
      this.dataStorageService.setFormReembolso('stepFive_Details', 'reembolsoCalculation', true);
      this.closeModal();
    }
  }

  validarMensajeWarning() {
    if (this.arancel.bonificacion && this.arancel.valorPrestacion) {
      const prestacion = this.arancel.valorPrestacion ? this.arancel.valorPrestacion : 0;
      const bonificacion = this.arancel.bonificacion ? this.arancel.bonificacion : 0;
      const sesiones = this.arancel.sesiones ? this.arancel.sesiones : 1;
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
      if (this.arancel.sesiones > 0 && this.arancel.bonificacion >= 0 && this.arancel.valorPrestacion > 0) return false
      else return true;
    } else {
      if (!this.warningMsg && this.arancel.bonificacion >= 0 && this.arancel.valorPrestacion > 0) return false
      else return true;
    }
  }

}
