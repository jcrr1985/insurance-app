import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Prestacion } from 'src/app/shared/interfaces/interfaces'


@Component({
  selector: 'app-consulta-medica',
  templateUrl: './consulta-medica.component.html',
  styleUrls: ['./consulta-medica.component.scss']
})


export class ConsultaMedicaComponent implements OnInit {
  valor: any = 0;
  bonificacion: any = 0;
  montoReembolso: any = 0;
  sesionRequired: boolean = false;
  prestacion!: Prestacion;
  warningMsg: boolean = false;
  public prestacioSeleccionada = this.arancelService.getPrestacionSeleccionada

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();
  public sourceSearch: any;
  constructor(public arancelService: ArancelService) { this.initData() }

  ngOnInit(): void {
    console.log('prestacioSeleccionada', this.prestacioSeleccionada);
    
  }

  initData() {
    // this.prestacion = {
    //   tipoPrestacion: 'Consulta Médica',
    //   prestacionSeleccionada: '',
    //   numerosesiones: '0',
    //   bonificacion: 0,
    //   valorPrestacion: 0
    // }
  }
  itemSelected(item: any) {
    console.log(item);
    this.sesionRequired = item.sesionRequired;
    this.prestacion.prestacionSeleccionada = item.key;
    this.sourceSearch = this.arancelService.busquedaAranceles(item)
    console.log('this.sourceSearch', this.sourceSearch)
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
