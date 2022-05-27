import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-step-datos-generales',
  templateUrl: './step-datos-generales.component.html',
  styleUrls: ['./step-datos-generales.component.scss'],
})
export class StepDatosGeneralesComponent implements OnInit, OnChanges {
  @Input() stepperThreeSource: any;
  @Input() customStepperSize: any;
  stepsStatusOn: any;
  isapreFonasaOptions: any = previsionesArray;


  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepThree: EventEmitter<any> = new EventEmitter<any>();
  @Output() mostrarDocumentoAdicional: EventEmitter<any> = new EventEmitter<any>();

  public textPreguntas = '';
  public mostrarRadioButtons!: boolean;
  public idPestacionSeleccionada!: number;

  public sesionRequired: boolean = false;
  validDate: boolean = false;


  constructor(private dataStorageService: DataStorageService, private prestacionService: ArancelService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.definirTextoPregunta()
  }
  filesUploaded: any = [];
  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.agregarAgenteEscucha();
    // this.prestacionService.setIdSubject$.subscribe(idPrestacionSeleccionada => { this.idPestacionSeleccionada = idPrestacionSeleccionada; });
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => (this.idPestacionSeleccionada = id, console.log(id)))
  }

  agregarAgenteEscucha() {
    window.addEventListener('onSelectDate', (event: any) => {
      const id = event.path[1].id
      if (id == 'fecha_on_generales') {
        this.validDate = true;
        const data = { step: 'stepThree_general', option: 'fechaAtencion', value: event.detail.init };
        this.setStepsStatus(data);
      }
    });
  }

  definirTextoPregunta() {

    switch (this.idPestacionSeleccionada) {
      // Consulta Medica
      case 1:
        this.textPreguntas = '¿El monto total de tu copago fue mayor a UF15?';
        this.mostrarRadioButtons = true;
        break;
      // Hospitalaria
      case 2:
        this.textPreguntas = '';
        this.mostrarRadioButtons = true;
        break;
      // Marcos y lentes
      case 3:
        this.textPreguntas = '¿Estás declarando más de una atención en tu boleta?';
        this.mostrarRadioButtons = true;
        break;
      // Atencion dental
      case 4:
        this.textPreguntas = '¿Estás declarando más de una atención en tu boleta?';
        this.mostrarRadioButtons = true;
        break;
      // Examenes y procedimientos
      case 5:
        this.textPreguntas = '¿El monto total de tu copago fue mayor a UF15?';
        this.mostrarRadioButtons = true;
        break;
      // medicamentos
      case 6:
        this.textPreguntas = '¿Esta es una receta permanente?';
        this.mostrarRadioButtons = true;
        break;
      default:
        this.textPreguntas = '';
        this.mostrarRadioButtons = false;
        break;
    }
  }

  setStepsStatus(data: any) {
    console.log('data', data)
    this.dataStorageService.setFormReembolso(data.step, data.option, data.value);
    this.mostrarDocumentoAdicional.emit(data.value)

  }
  revisarSelectevent(dataEvt: any) {
    console.log(dataEvt);
  }
  /**
   *
   * @param step property
   * @param option property
   * @returns {boolean | string | null}
   * @description retorna el valor del archivo de stepsStatusOn
   */
  getStepsStatus(step: string, option: string) {
    console.log('option', option)
    try {
      return this.stepsStatusOn[step][option];
    } catch (error) {
      console.log("______________________")
      console.log("error obteniendo value")
      console.log("step", step)
      console.log("option", option)
      console.log("statusOn", this.stepsStatusOn)
      console.log("______________________")
      console.log("______________________")
    }
  }

  setValue(){

  }



}

const previsionesArray = [
  { key: 'Fonasa', value: 1, selected: false },
  { key: 'Colmena', value: 2, selected: false },
  { key: 'Consalud', value: 3, selected: false },
  { key: 'Cruz Blanca', value: 4, selected: false },
  { key: 'Banmédica', value: 5, selected: false },
  { key: 'Masvida', value: 6, selected: false },
  { key: 'Vida', value: 7, selected: false },

];
