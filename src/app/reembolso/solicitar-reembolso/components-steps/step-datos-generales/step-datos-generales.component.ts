import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
/// <reference types="cypress" />
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-step-datos-generales',
  templateUrl: './step-datos-generales.component.html',
  styleUrls: ['./step-datos-generales.component.scss'],
})
export class StepDatosGeneralesComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
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
  public valHosp: any;
  copago: string | null = null;
  rutValid = false;
  buttonSubscription: any;
  @ViewChild('btn') btn!: ElementRef;
  fecha!: any;
  handlerFunctionClickDatePicker: any;

  constructor(private dataStorageService: DataStorageService, private prestacionService: ArancelService, private elm: ElementRef) { }
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handlerFunctionClickDatePicker);

  }
  setvalHosp(valHosp: any) {
    this.dataStorageService.dataDeHospitalarioBehavior.next(valHosp)
  }

  ngAfterViewInit(): void {
    const rut = this.dataStorageService.getBeneficiarioRut;
    this.desactivandoDiasInferioresaUnAnnio()
  }

  desactivandoDiasInferioresaUnAnnio() {
    // let hoyTimeStamp = document.querySelector('.is-today')?.getAttribute('data-time')
    let hoyTimeStamp = (new Date()).getTime()
    let haceUnAnnioStamp = Number(hoyTimeStamp) - 31557600000;
    let today = Number(hoyTimeStamp);
    this.handlerFunctionClickDatePicker = (ev: any) => {
      console.log('ev', ev)
      const funcionValidadora = () => {
        let ldp = document.querySelector('.litepicker') || document.getElementById('fecha_on_generales')
        if (ldp) {
          console.log('ldp', ldp)
          let allDays = Array.from(ldp.querySelectorAll('.day-item'))
          allDays.forEach((dayItem: any) => {
            console.log('click', 'click')
            if (Number(dayItem.getAttribute('data-time')) < haceUnAnnioStamp || Number(dayItem.getAttribute('data-time')) > today) {
              dayItem.onclick = void 0
              dayItem.onclick = void (0)
              dayItem.setAttribute('disabled', '')
              dayItem.style.pointerEvents = "none"
              dayItem.style.color = "rgb(180,180,180)";

            }
          });
        }
      }

      if (document.getElementById('fecha_on_generales')) {
        funcionValidadora();
      }
      if (ev.target.className == 'button-previous-month' || ev.target.className == 'button-next-month') {
        console.log('\'button-previous-month\'', 'button-previous-month')

        funcionValidadora();
      }
    }
    document.addEventListener('click', this.handlerFunctionClickDatePicker)
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
    this.dataStorageService.rutEmpresaBehavior.next(Number(rutFormat));
    //= '17793573-5')
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
      const calendario = document.getElementById('fecha_on_generales');
      const formatoLocal = this.generarFormatoFecha();
      const fechaSeleccionada = moment(event.detail.init, formatoLocal).toDate();
      this.dataStorageService.setFechaAtencionBehavior.next(event.detail.init);
      if (fechaSeleccionada <= new Date()) {
        this.validDate = true;
        const data = { step: 'stepThree_general', option: 'fechaAtencion', value: event.detail.init };
        this.setStepsStatus(data);
        calendario?.setAttribute('state', 'success');
      } else {
        calendario?.setAttribute('state', 'error');
        this.validDate = false;
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
        this.textPreguntas = '';
        this.mostrarRadioButtons = false;
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
    fechaLocal = fechaLocal.replace("31", "DD").replace("12", "MM").replace("2022", "YYYY");
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
