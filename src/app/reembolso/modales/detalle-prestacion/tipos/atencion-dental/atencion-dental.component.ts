import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IArancel } from 'src/app/shared/interfaces/arancel';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'
import { ArancelService } from 'src/app/shared/services/arancel-service.service';



@Component({
  selector: 'app-atencion-dental',
  templateUrl: './atencion-dental.component.html',
  styleUrls: ['./atencion-dental.component.scss']
})
export class AtencionDentalComponent implements OnInit, OnChanges {
  valor: any = 0;
  bonificacion: any = 0;
  montoReembolso: any = 0;
  fechaRequired: boolean = false;
  validDate: boolean = false;
  warningMsg: boolean = false;
  @Input() stepsStatusOn: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  @Output() textoArancelSeleccionado: EventEmitter<string> = new EventEmitter();

  public prestacion: Prestacion = {} as Prestacion;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada;
  public textoArancel!: string;

  constructor(public arancelService: ArancelService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.fechaRequired = this.stepsStatusOn.stepThree_general.copagoMayor == 'si' ? true : false;
  }
  public sesionesSource = this.arancelService.getSesionesSource;

  ngOnInit(): void {
    this.fechaRequired = this.stepsStatusOn.stepThree_general.copagoMayor == 'si' ? true : false;
    this.eventListener()
  }

  eventListener() {
    window.addEventListener('onSelectDate', (event: any) => {
      const id = event.path[1].id
      if (id == 'fecha_on_modal_dental') {
        this.validDate = true;
      }
    });
  }


  itemSelected(arancel: IArancel) {
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
