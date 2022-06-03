import { ReembolsoService } from './../../../shared/services/reembolso.service';
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
  public warningMsg: boolean = true;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public sourceSearch: any;
  public form: any;
  public labelArancel: string = 'Nombre Prestación';
  public labelValor: string = 'Valor';
  public labelValorBon: string = 'Bonificación Isapre/Fonasa';
  public esBoletaFactura: boolean = false;
  public invalidInputs: any = null;
  public formatter = new Intl.NumberFormat('es-CL');


  public montoReferencia = 50000;

  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService, private reembolsoService: ReembolsoService) { }

  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idprestacionSeleccionada = id);
    if (this.idprestacionSeleccionada == 6) {
      this.labelArancel = 'Nombre Medicamento';
      this.labelValor = 'Valor Medicamento';
      this.labelValorBon = 'Descuento Institución';
    }
    if (this.stepsStatusOn.stepFour_general.tipoDocumentoSeleccionado == 3) {
      this.esBoletaFactura = true;
      this.arancel.bonificacion = 0;
    }
  }

  validarSoloLetras(event: any) {
    this.inval();
    return /[a-z, ]/i.test(event.key)
  }

  validarNumero(event: any) {
    this.inval();
    return (event.charCode >= 48 && event.charCode <= 57)
  }

  closeModal(): void {
    this.hideModalEvent.emit(false);
  }
  
  inval() {
    const inputFeilds = document.querySelectorAll("input");
    this.invalidInputs = Array.from(inputFeilds).filter(input => input.value == "" || input.value == undefined);
  }

  itemSelected(arancel: IArancel) {
    this.sesionRequired = arancel.RequiereSesiones === '1' ? true : false;
    this.arancel.prestacionSeleccionada = arancel.Arancel;
    this.arancel.tipoPrestacion = arancel.TipoLiquidacion;
    this.arancel.codigoPrestacion = arancel.CodigoArancel;
    this.arancelService.montoHistorico = 0;
    this.arancelService.desviadoOK = true;
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
public multiplesSesiones:any;
  setValue(key: any, value: any) {
    switch (key) {
      case 'valor':
        this.arancel.valorPrestacion = value;
        this.arancel.valorPrestacion > 1?  this.multiplesSesiones = true : false;
        console.log('this.multiplesSesiones', this.multiplesSesiones)
        this.dataStorageService.setFlagMasDeUnaSesion(true)
        console.log('this.dataStorageService.flagMasDeUnaSesion', this.dataStorageService.flagMasDeUnaSesion)
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
    } else {
    }
  }

  async validarMensajeWarning() {
    if (this.arancel.sesiones > 0 && this.arancel.valorPrestacion) {
      await this.arancelService.validarSesiones(
        this.arancel.codigoPrestacion,
        this.stepsStatusOn.stepOne_who.personaSeleccionada,
        this.arancel.valorPrestacion,
        this.arancel.sesiones
      );
      this.arancel.sesionValida = this.arancelService.desviadoOK;
      this.arancel.montoHistorico = this.arancelService.montoHistorico;
      this.montoReferencia = this.arancelService.montoHistorico;
      this.warningMsg = this.arancelService.desviadoOK;
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
      if (this.arancel.bonificacion >= 0 && this.arancel.valorPrestacion > 0) return false
      else return true;
    }
  }

  checkDsInputs() {
    let inputValor = document.querySelector('#valor')?.querySelector('input')?.value
    let inputBonificacion = document.querySelector('#bonificacion')?.querySelector('input')?.value
    let nombrePrestacion = document.querySelector('#nombrePrestacion')?.querySelector('input')?.value
    let numeroSesiones = document.querySelector('#numeroSesiones')?.querySelector('input')?.value

    if (inputBonificacion && inputValor) {
      const valor =  inputValor.replace(/\D/g,'');
      const bonificacion = inputBonificacion.replace(/\D/g,'');
      if (bonificacion >= valor) return true;
    }

    if (this.esBoletaFactura) {
      if (inputValor && nombrePrestacion) {
        if (numeroSesiones) {
          return false;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    if (inputValor &&  nombrePrestacion && inputBonificacion && ( inputBonificacion && Number(inputBonificacion) != 0) ){
      if(numeroSesiones){
      return false
      }else
      return false
    }else{
      return true
    }
  }

  formateoValor(valor: number) {
    if (valor < 1) return '$0';
    return '$' + this.formatter.format(valor);
  }

}
