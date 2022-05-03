import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss']
})
export class CustomStepperComponent implements OnInit {

  constructor() {

  }
  @Input() height!: string;
  @Input() status!: string;
  @Input() texto!: string;
  @Input() stepsStatusOn: any;
  @Output() sendData: any;

  ngOnInit(): void {}

  setStatusOn(data: any) {
    this.stepsStatusOn.stepOne_who.personaSeleccionada = data.value;
    this.sendData.emit(data);
  }

}
