import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-parentesco',
  templateUrl: './select-parentesco.component.html',
  styleUrls: ['./select-parentesco.component.scss']
})
export class SelectParentescoComponent implements OnInit {
  @Output() changeEv: EventEmitter<any> = new EventEmitter()

  source = [
    { key: 'Alejandro Salgado', value: '1', parentesco: 'Yo' },
    { key: 'Marcelo Salgado', value: '2', parentesco: 'Hijo' },
    { key: 'Ana María Gonzales', value: '3', parentesco: 'Madre' },
    { key: 'Francisca Arriagada', value: '4', parentesco: 'Conyugue' },
  ]

  label = 'Seleccione una persona';
  constructor() { }

  ngOnInit(): void {
  }

  selectPerson(value: any) {
    if (value == 0) this.label = 'Seleccione una persona'
    else {
      this.label = value.parentesco;
      this.changeEv.emit(value);
    }

  }

}
