import { Component, Input, OnInit } from '@angular/core';
import '@vs-design-system/ds-select';
import '@vs-design-system/ds-title';
import '@vs-design-system/ds-icon';

@Component({
  selector: 'app-step-quien-se-atendio',
  templateUrl: './step-quien-se-atendio.component.html',
  styleUrls: ['./step-quien-se-atendio.component.scss']
})
export class StepQuienSeAtendioComponent implements OnInit {
  @Input() stepperOneSource: any;
  @Input() stepsStatusOn: any;
  @Input() customStepperSize: any;
  @Input() personSelectOption: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.stepperOneSource);
    console.log(this.stepsStatusOn);
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
}
