import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@vs-design-system/ds-select';
import '@vs-design-system/ds-title';
import '@vs-design-system/ds-icon';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-step-quien-se-atendio',
  templateUrl: './step-quien-se-atendio.component.html',
  styleUrls: ['./step-quien-se-atendio.component.scss']
})
export class StepQuienSeAtendioComponent implements OnInit {
  @Input() stepperOneSource: any;
  @Input() customStepperSize: any;
  personSelectOption: any = beneficiariosArray;

  @Output() sendData: EventEmitter<any> = new EventEmitter();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {

  }

  setStatusOn(data: any) {
    this.dataStorageService.setFormReembolso('stepOne_who', 'personaSeleccionada', data.value)
  }

}

const beneficiariosArray = [
  { label: 'Seleccione', value: 0, selected: false },
  { label: 'Alejandro Salgado', value: 1, selected: false },
  { label: 'Maria Salgado', value: 2, selected: false },
  { label: 'Camilo Salgado', value: 3, selected: false },
];
