import { DataStorageService } from 'src/app/shared/services/data-storage.service';
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
  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepTwo: EventEmitter<any> = new EventEmitter<any>();

  stepsStatusOn: any;
  public tarjetaSeleccionada!: ICard
  public cardy!: ICard;

  checkedSi: string = '';

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

  @Input() esReembolso!: boolean;

  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService) { }

  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.verificarValoresPreservador();

    this.cardy = this.arancelService.getTarjetaSeleccionada;

    if (this.esReembolso) {
      this.cards.forEach(e => {
        e.status = 'off'
      })

      const cardSelectedId = this.dataStorageService.getIdPrestacionSeleccionada().subscribe(e => {
        this.cards.forEach(e => {
          e.status = 'off'
        })
        this.cards[e - 1].status = 'active'
      })

    }

  }
  verificarValoresPreservador() {
    let idprestacion = 0;
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => { idprestacion = id; });
    if (idprestacion) {
      const found = this.cards.find(e => e.idPrestacion == idprestacion)
      if (found) this.setCard(found);
    }
    else if (this.stepsStatusOn['stepTwo_selectOption']['prestacionSeleccionada']) {
      const prestacions = this.stepsStatusOn['stepTwo_selectOption']['prestacionSeleccionada'];
      const found = this.cards.find(e => e.prestacion == prestacions)
      if (found) this.setCard(found);
    }
    if (this.stepsStatusOn['stepTwo_selectOption']['reembolsoPrevioIsapre']) {
      const valueReembolsaste = this.stepsStatusOn['stepTwo_selectOption']['reembolsoPrevioIsapre'];
      this.setStepsStatus({
        step: 'stepTwo_selectOption',
        option: 'reembolsoPrevioIsapre',
        value: valueReembolsaste
      })
      this.checkedSi = valueReembolsaste;
    }

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
    this.dataStorageService.setFormReembolso(data.step, data.option, data.value);
  }

  setCard(tarjeta: ICard) {
    this.dataStorageService.setFormReembolso('stepTwo_selectOption', 'prestacionSeleccionada', tarjeta.prestacion);
    this.dataStorageService.setIdPrestacion(tarjeta.idPrestacion);

    this.cards.forEach(e => e.status = '');
    tarjeta.status = 'active';

    this.tarjetaSeleccionada = tarjeta;

    // TODO por rectificar dependencia
    this.arancelService.setTarjetaSeleccionada(tarjeta.name);
    this.arancelService.setPrestacionSeleccionadaId(tarjeta.idPrestacion);
    this.arancelService.setIdSubject.next(tarjeta.idPrestacion);

    // this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idprestacionSeleccionada = id) 
    if (tarjeta.name != 'atencionmedica' && tarjeta.name != 'atencionhospitalaria' && tarjeta.name != 'examenes') {
      this.dataStorageService.setFormReembolso('stepTwo_selectOption', 'reembolsoPrevioIsapre', 'si');
    }

    this.evaluateStepTwo.emit();

  }
}
