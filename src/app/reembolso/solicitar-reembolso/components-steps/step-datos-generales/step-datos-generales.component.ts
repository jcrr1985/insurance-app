import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-datos-generales',
  templateUrl: './step-datos-generales.component.html',
  styleUrls: ['./step-datos-generales.component.scss'],
})
export class StepDatosGeneralesComponent implements OnInit {
  @Input() stepperThreeSource: any;
  @Input() customStepperSize: any;
  @Input() stepsStatusOn: any;
  @Input() isapreFonasaOptions: any;

  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepThree: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  filesUploaded: any = [];
  ngOnInit(): void {

  }

  setStepsStatus(data: any) {
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

  uploadingFilesEvent(event: any) {
    console.log(event);
    if (event.target.id === 'file_uploader') {
      this.filesUploaded = event.target.files;
      this.stepsStatusOn.stepThree_general.fileUploaded = true;
    }
  }
}
