import { ICard } from './../../../../shared/interfaces/ICard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { Chip } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-step-selecciona-prestacion',
  templateUrl: './step-selecciona-prestacion.component.html',
  styleUrls: ['./step-selecciona-prestacion.component.scss'],
})
export class StepSeleccionaPrestacionComponent implements OnInit {
  @Input() stepperTwoSource: any;
  @Input() customStepperSize: any;
  @Input() stepsStatusOn: any;
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepTwo: EventEmitter<any> = new EventEmitter<any>();

  public tarjetaSeleccionada!: ICard

  public cards: ICard[] = [
    { prestacion: 'Atención Hospitalaria', name: 'atencionhospitalaria', status: '' },
    { prestacion: 'Atención Médica', name: 'atencionmedica', status: 'disabled' },
    { prestacion: 'Dentales', name: 'dentista', status: '' },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '' },
    { prestacion: 'Medicamentos', name: 'medicamentos', status: '' },
    { prestacion: 'Lentes y Monturas', name: 'optica', status: '' }
  ]
  public coldefined: string = 'col-span-4';


  constructor(private arancelService: ArancelService) { }

  ngOnInit(): void {

  }
  /**
   *
   * @param step property
   * @param option property
   * @returns {boolean | string | null}
   * @description retorna el valor del archivo de stepsStatusOn
   */
  getStepsStatus(step: string, option: string): boolean | string {
    return this.stepsStatusOn[step][option];
  }

  setStepsStatus(data: any) {
    this.sendData.emit(data);
    this.evaluateStepTwo.emit();
  }

  setCard(tarjeta: ICard) {
    console.log('tarjeta', tarjeta)
    const dataEmit = {
      step: 'stepTwo_selectOption',
      option: 'prestacionSeleccionada',
      value: tarjeta.prestacion
    }
    console.log("dataEmit", dataEmit);
    this.setStepsStatus(dataEmit);
    this.evaluateStepTwo.emit();
    this.cards.forEach(e => e.status = '');
    tarjeta.status = 'active';
    this.tarjetaSeleccionada = tarjeta;
    this.arancelService.setTarjetaSeleccionada(tarjeta.name);
  }
}
