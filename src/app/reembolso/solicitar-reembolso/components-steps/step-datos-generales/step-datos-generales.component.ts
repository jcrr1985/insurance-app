import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
/// <reference types="cypress" />
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
  public valHosp:any;
  copago: string | null = null;
  rutValid = false;

  constructor(private dataStorageService: DataStorageService, private prestacionService: ArancelService) {
  
  }
  setvalHosp(valHosp:any){
    console.log('valHosp', valHosp)

    this.dataStorageService.dataDeHospitalarioBehavior.next(valHosp)
  }
  ngAfterViewInit(): void {

    /* let datosGeneralesContainer = document.querySelector('datos-generales-container')
    let inputsDatosGeneralesArray = datosGeneralesContainer?.querySelectorAll('inputs')
    console.log('inputsDatosGeneralesArray', inputsDatosGeneralesArray) */
    const rut = this.dataStorageService.getBeneficiarioRut;
    console.log('rut', rut)
     

    document.addEventListener('onSelectDate', (evt:any) => {
      console.log(evt.detail)
     this.dataStorageService.setFechaAtencionBehavior.next(evt.detail.init)
     console.log('evt.detail.init', evt.detail.init)
    })

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

    this.agregarAgenteEscucha();
    // this.prestacionService.setIdSubject$.subscribe(idPrestacionSeleccionada => { this.idPestacionSeleccionada = idPrestacionSeleccionada; });
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => (this.idPestacionSeleccionada = id))
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
      this.dataStorageService.setFechaAtencionBehavior.next(event.detail.init)
      console.log('event.detail.init', event.detail.init)
      const id = event.path[1].id
      if (id == 'fecha_on_generales') {
        const calendario = document.getElementById('fecha_on_generales');
        const fechaSeleccionada = moment(event.detail.init, 'DD-MM-YYYY').toDate();
        if (fechaSeleccionada <= new Date()) {
          this.validDate = true;
          const data = { step: 'stepThree_general', option: 'fechaAtencion', value: event.detail.init };
          this.setStepsStatus(data);
          calendario?.setAttribute('state', 'success');
        } else {
          calendario?.setAttribute('state', 'error');
          this.validDate = false;
        }
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
    this.dataStorageService.dataDeHospitalarioBehavior.next(data.value)
    this.mostrarDocumentoAdicional.emit(data.value.value)
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

  generarFormatoFecha(): string {
    let fechaLocal = (new Date(2022, 11, 31)).toLocaleDateString();
    fechaLocal = fechaLocal.replace("31","DD").replace("12","MM").replace("2022","YYYY");
    return fechaLocal.replace(/-/g, '/');
  }
}

const previsionesArray = [
  { key: 'Colmena', value: 200, selected: false },
  { key: 'Consalud', value: 203, selected: false },
  { key: 'Cruz Blanca', value: 201, selected: false },
  { key: 'Banmédica', value: 206, selected: false },
  { key: 'Vida Tres', value: 208, selected: false },
  { key: 'Masvida', value: 204, selected: false },
  { key: 'Fonasa', value: 211, selected: false }
];
