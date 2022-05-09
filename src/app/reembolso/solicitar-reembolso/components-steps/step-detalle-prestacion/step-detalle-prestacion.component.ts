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
  @Input() stepsStatusOn: any;
  @Output() mostrarAgregarDetallesModal: EventEmitter<any> = new EventEmitter<any>();
  showModal: boolean = false;
  prestaciones: any[] = [];
  constructor(private arancelService: ArancelService) { }
  prestacionSeleccionada: any = this.arancelService.getPrestacionSeleccionada

  ngOnInit(): void {
    this.arancelService.setIdSubject.subscribe(e => {
      this.prestacionSeleccionada = e;
    })
  }
  edit(prestacion: any) {
    this.prestacionSeleccionada = prestacion;
    console.log("edit", this.prestacionSeleccionada);
    this.showModal = true;
  }
  delete(prestacion: any) {
    this.prestacionSeleccionada = prestacion;
    this.prestaciones = this.prestaciones.filter(e => e.id != prestacion.id)
    console.log(this.prestaciones)
  }
  nuevaPrestacionDataArray(prestacion: any) {
    //this.prestaciones.push({ ...prestacion, id: this.arancelService.getPrestacionSeleccionadaId });
    this.prestaciones.push({ ...prestacion, id: this.prestaciones.length + 1 });
    this.prestacionSeleccionada = {}
    console.log(this.prestaciones);
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


}
