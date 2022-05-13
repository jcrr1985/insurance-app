import { ICard } from './../../../../shared/interfaces/ICard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
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
    { prestacion: 'Consulta Médica', name: 'atencionmedica', status: 'disabled', idPrestacion: 1 },
    { prestacion: 'Atención Hospitalaria', name: 'atencionhospitalaria', status: '', idPrestacion: 2 },
    { prestacion: 'Marcos y lentes', name: 'optica', status: '', idPrestacion: 3 },
    { prestacion: 'Atención Dental', name: 'dentista', status: '', idPrestacion: 4 },
    { prestacion: 'Exámenes y procedimientos', name: 'examenes', status: '', idPrestacion: 5 },
    { prestacion: 'Compra de medicamentos', name: 'medicamentos', status: '', idPrestacion: 6 },
  ]
  public coldefined: string = 'col-span-4';


  public textPregunta = {
    atencionmedica: '¿Reembolsaste previamente en tu Isapre/Fonasa?',
    atencionhospitalaria: 'Estimado usuario, le recordamos que se consideran gastos Hospitalarios solo los gastos que tienen al menos un día de Hospitalización ¿Desea Continuar?',
    examenes: '¿Reembolsaste previamente en tu Isapre/Fonasa?',
    medicamentos: '',
    optica: '',
    dentista: ''

  }

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

    this.setStepsStatus(dataEmit);
    this.evaluateStepTwo.emit();
    this.cards.forEach(e => e.status = '');
    tarjeta.status = 'active';
    this.tarjetaSeleccionada = tarjeta;
    this.arancelService.setTarjetaSeleccionada(tarjeta.name);
    this.arancelService.setPrestacionSeleccionadaId(tarjeta.idPrestacion);
    this.arancelService.setIdSubject.next(tarjeta.idPrestacion);


    if (tarjeta.name != 'atencionmedica' && tarjeta.name != 'atencionhospitalaria' && tarjeta.name != 'examenes') {
      const datosOpcionales = {
        step: 'stepTwo_selectOption',
        option: 'reembolsoPrevioIsapre',
        value: 'si'
      }
      this.setStepsStatus(datosOpcionales);
      this.evaluateStepTwo.emit();
    }
  }
}
