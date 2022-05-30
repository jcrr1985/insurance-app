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
  valueSelected: number | null = null;


  @Output() sendData: EventEmitter<any> = new EventEmitter();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => {
      const value = statusOn['stepOne_who']['personaSeleccionada'];
      this.valueSelected = value;
    })
  }

  setStatusOn(beneficiario: Beneficiario) {
    console.log('beneficiario', beneficiario)
    this.dataStorageService.setFormReembolso('stepOne_who', 'personaSeleccionada', beneficiario.value);
    this.dataStorageService.beneficiarioBehavior.next(beneficiario);
  }


}

const beneficiariosArray: Beneficiario[] = [
  { label: 'Seleccione', value: 0, selected: false },
  { label: 'Alejandro Salgado', value: 1, selected: false },
  { label: 'Maria Salgado', value: 2, selected: false },
  { label: 'Camilo Salgado', value: 3, selected: false },
];

export interface Beneficiario {
  label: string;
  value: number;
  selected: boolean;
}
