import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-step-datos-generales',
  templateUrl: './step-datos-generales.component.html',
  styleUrls: ['./step-datos-generales.component.scss'],
})
export class StepDatosGeneralesComponent implements OnInit, OnChanges, AfterViewInit {
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

  copago: string | null = null;
  rutValid = false;

  constructor(private dataStorageService: DataStorageService, private prestacionService: ArancelService) {
  }
  ngAfterViewInit(): void {
    /* let datosGeneralesContainer = document.querySelector('datos-generales-container')
    let inputsDatosGeneralesArray = datosGeneralesContainer?.querySelectorAll('inputs')
    console.log('inputsDatosGeneralesArray', inputsDatosGeneralesArray) */
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.definirTextoPregunta()
  }
  filesUploaded: any = [];
  ngOnInit(): void {

    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    if (this.stepsStatusOn['stepThree_general']['copagoMayor']) {
      this.copago = this.stepsStatusOn['stepThree_general']['copagoMayor'];
    }

    // if (this.stepsStatusOn['stepThree_general']['rutInstitucion'] != '') this.rutValid 


    this.agregarAgenteEscucha();
    // this.prestacionService.setIdSubject$.subscribe(idPrestacionSeleccionada => { this.idPestacionSeleccionada = idPrestacionSeleccionada; });
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => (this.idPestacionSeleccionada = id))
    setTimeout(() => {
      let cal = document.querySelector('#start-date-single-undefined')
      cal?.addEventListener('click', () => {
        /* let days = document.querySelector('.data-time')
        console.log('days', days) */
      })
    }, 600);
  }

  validarNumero(event: any) {
    return (event.charCode >= 48 && event.charCode <= 57)
  }
  /**
   * @description valida el rut recibidoo del dsInput
   */
  validarRut(rutFormat: string) {
    //= '17793573-5'
    let rut = rutFormat.replace(/\./g, '');
    if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
      let caracteres = new Array();
      let serie = new Array(2, 3, 4, 5, 6, 7);
      let dig = rut.toString().substr(rut.toString().length - 1, 1);
      rut = rut.toString().substr(0, rut.toString().length - 2);

      for (let i = 0; i < rut.length; i++) {
        caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
      }

      let sumatoria = 0;
      let k = 0;
      let resto = 0;

      for (var j = 0; j < caracteres.length; j++) {
        if (k == 6) {
          k = 0;
        }
        sumatoria += parseInt(caracteres[j]) * serie[k];
        k++;
      }

      resto = sumatoria % 11;
      let dv: any = 11 - resto;

      if (dv == 10) {
        dv = "K";
      }
      else if (dv == 11) {
        dv = 0;
      }

      if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
        this.rutValid = true;
      else
        this.rutValid = false;
    }
    else {
      this.rutValid = false;
    }
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
    console.log("···· ->", data);
    this.dataStorageService.setFormReembolso(data.step, data.option, data.value);
    this.mostrarDocumentoAdicional.emit(data.value)
  }
  revisarSelectevent(dataEvt: any) {
  }
  /**
   *
   * @param step property
   * @param option property
   * @returns {boolean | string | null}
   * @description retorna el valor del archivo de stepsStatusOn
   */
  getStepsStatus(step: string, option: string) {
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

  setValue() {

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
