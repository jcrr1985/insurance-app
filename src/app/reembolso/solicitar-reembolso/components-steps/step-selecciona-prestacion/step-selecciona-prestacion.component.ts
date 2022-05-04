import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/icard';
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

  public cards: ICard[] = [
    { prestacion: 'Atención Hospitalaria', name: 'atencionhospitalaria', status: '' },
    { prestacion: 'Atención Médica', name: 'atencionmedica', status: 'disabled' },
    { prestacion: 'Dentales', name: 'dentista', status: '' },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '' },
    { prestacion: 'Medicamentos', name: 'medicamentos', status: '' },
    { prestacion: 'Lentes y Monturas', name: 'optica', status: '' }
  ]
  public coldefined: string = 'col-span-4';

  public tarjetaSeleccionada!: ICard;

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
    this.sendData.emit(data);
    this.evaluateStepTwo.emit();
  }

  setCard(tarjeta: ICard) {
    const dataEmit = {
      step: 'stepTwo_selectOption',
      option: 'prestacionSeleccionada',
      value: tarjeta.prestacion
    }
    this.setStepsStatus(dataEmit);
    this.evaluateStepTwo.emit();
    this.cards.forEach(e => e.status = '');
    tarjeta.status = 'active';
    this.tarjetaSeleccionada = tarjeta;
  }

}
