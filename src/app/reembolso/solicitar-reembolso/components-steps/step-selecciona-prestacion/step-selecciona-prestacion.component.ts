import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chip } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-step-selecciona-prestacion',
  templateUrl: './step-selecciona-prestacion.component.html',
  styleUrls: ['./step-selecciona-prestacion.component.scss']
})
export class StepSeleccionaPrestacionComponent implements OnInit {

  @Input() stepperTwoSource: any;
  @Input() customStepperSize: any;
  @Input() stepsStatusOn: any;
  @Input() chipsData: any;
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepTwo: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
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

  setStepsStatus(data: any) {
    this.sendData.emit(data)
  }
  /**
  *
  * @param id card-id
  * @description cambia el color y setea la opcion elegida
  */
  selectOption(id: number) {
    this.chipsData.forEach((card: Chip) => {
      card.state = false;
    });
    this.chipsData[id].state = true;
    const dataEmit = {
      step: 'stepTwo_selectOption',
      option: 'prestacionSeleccionada',
      value: this.chipsData[id].desripcion
    }
    this.setStepsStatus(dataEmit);
    this.evaluateStepTwo.emit();
  }

}
