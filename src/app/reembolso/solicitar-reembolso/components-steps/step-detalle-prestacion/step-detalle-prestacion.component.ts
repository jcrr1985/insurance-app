import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-detalle-prestacion',
  templateUrl: './step-detalle-prestacion.component.html',
  styleUrls: ['./step-detalle-prestacion.component.scss']
})
export class StepDetallePrestacionComponent implements OnInit {
  @Input() customStepperSize: any;
  @Input() stepperFourSource: any;
  @Input() montoReelbolso: any;
  @Output() showAddMoreDetailModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.showAddMoreDetailModal.emit();
  }


}
