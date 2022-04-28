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
    { key: 'Maria Salgado', value: '2', parentesco: 'Hermana' },
    { key: 'Camilo Salgado', value: '3', parentesco: 'Padre' },
  ]
  label = 'Elige una persona';
  constructor() { }

  ngOnInit(): void {
  }

  selectPerson(value: any) {
    if (value == 0) this.label = 'Elige una persona'
    else {
      this.label = value.parentesco;
      this.changeEv.emit(value);
    }

  }

}
