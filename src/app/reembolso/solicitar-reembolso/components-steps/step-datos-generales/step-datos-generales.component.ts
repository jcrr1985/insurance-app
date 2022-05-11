import { Prestacion } from 'src/app/shared/interfaces/interfaces';
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
  @Input() stepsStatusOn: any;
  @Input() isapreFonasaOptions: any;
  

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepThree: EventEmitter<any> = new EventEmitter<any>();

  public textPreguntas = '';
  public mostrarRadioButtons!: boolean;
  public idPestacionSeleccionada!: number;

  public sesionRequired:boolean = false;

  constructor(private prestacionService: ArancelService) { 
    console.log('skdfhsdkfhskjfslkdhfsdfj')
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.definirTextoPregunta()
  }
  filesUploaded: any = [];
  ngOnInit(): void {
    
    this.prestacionService.setIdSubject$.subscribe(idPrestacionSeleccionada => {
      this.idPestacionSeleccionada = idPrestacionSeleccionada;
      console.log('isapreFonasaOptions', this.isapreFonasaOptions)
    });
  }

  definirTextoPregunta() {

    switch (this.idPestacionSeleccionada) {
      case 1:
        this.textPreguntas = '¿El monto total de tu copago fue mayor a UF15?';
        this.mostrarRadioButtons = true;
        break;
      case 2:
        this.textPreguntas = '';
        this.mostrarRadioButtons = true;
        break;
      case 3:
        this.textPreguntas = '¿Estás declarando más de una atención en tu boleta?';
        this.mostrarRadioButtons = true;
        break;
      case 4:
        this.textPreguntas = '¿Estás declarando más de una atención en tu boleta?';
        this.mostrarRadioButtons = true;
        break;
      case 5:
        this.textPreguntas = '¿El monto total de tu copago fue mayor a UF15?';
        this.mostrarRadioButtons = true;
        break;
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
    this.sendData.emit(data);
    this.evaluateStepThree.emit();
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

  selecccionarPrevision(ev: any){
    console.log('ev.label', ev.label)
  }
  setValue(text:string, val: any){
    console.log('text', text)
    console.log('val', val)

  }
}
