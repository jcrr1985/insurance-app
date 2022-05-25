import { DataStorageService } from './../../../../shared/services/data-storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-step-detalle-prestacion',
  templateUrl: './step-detalle-prestacion.component.html',
  styleUrls: ['./step-detalle-prestacion.component.scss']
})
export class StepDetallePrestacionComponent implements OnInit {
  @Input() customStepperSize: any;
  @Input() stepperFiveSource: any;
  @Output() mostrarAgregarDetallesModal: EventEmitter<any> = new EventEmitter<any>();
  stepsStatusOn: any;
  showModal: boolean = false;
  prestaciones: any[] = [];
  prestacionSeleccionada: any;
  montoTotalPrestaciones: any;
  //prestacionSeleccionada: any = this.arancelService.getPrestacionSeleccionada

  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService) { }


  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.dataStorageService.getPrestaciones().subscribe(prestaciones => this.prestaciones = prestaciones);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id)
    /* this.arancelService.setIdSubject.subscribe(e => {
      this.prestacionSeleccionada = e;
    }) */
  }
  edit(prestacion: any) {
    this.prestacionSeleccionada = prestacion;
    this.showModal = true;
  }
  delete(prestacion: any) {
    this.prestacionSeleccionada = prestacion;
    this.prestaciones = this.prestaciones.filter(e => e.id != prestacion.id)
  }
  nuevaPrestacionDataArray(prestacion: any) {
    //this.prestaciones.push({ ...prestacion, id: this.arancelService.getPrestacionSeleccionadaId });
    const dataPrestacion = { ...prestacion, id: this.prestaciones.length + 1 };
    this.prestaciones.push(dataPrestacion);
    this.prestacionSeleccionada = {}
  }
  hideAddMoreDetailModal() {
    this.showModal = false;
    this.prestacionSeleccionada = {}
  }

  /**
*
* @param step property
* @param option property
* @returns {boolean | string | null}
* @description retorna el valor del archivo de stepsStatusOn
*/
  getStepsStatus(step: string, option: string) {
    return this.stepsStatusOn[step][option];
  }

  geTotalPrestaciones(e:any){
    this.montoTotalPrestaciones = e;
    console.log('this.montoTotalPrestaciones', this.montoTotalPrestaciones)
  }

}
