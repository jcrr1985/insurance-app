import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss']
})
export class CustomStepperComponent implements OnInit {

  constructor() {
    this.height = '100px';
    this.status = 'waiting';
  }
  @Input() height: string;
  @Input() status: string;
  ngOnInit(): void {

  }

}
