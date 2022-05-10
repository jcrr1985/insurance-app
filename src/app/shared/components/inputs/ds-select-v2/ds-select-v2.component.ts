import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ds-select-v2',
  templateUrl: './ds-select-v2.component.html',
  styleUrls: ['./ds-select-v2.component.scss']
})
export class DsSelectV2Component implements OnInit {
  display: boolean = false;
  valueDisplay: string = '';
  isValid: boolean = false;
  elementSelected: any | sourceDsSelect;
  @Input() source: any[] | sourceDsSelect[] = [
    {key:'1 sesión', value: 1},
    {key:'2 sesiónes', value: 2},
    {key:'3 sesiónes', value: 3},
    {key:'4 sesiónes', value: 4},
    {key:'5 sesiónes', value: 5},
    {key:'6 sesiónes', value: 6},
    {key:'7 sesiónes', value: 7},
    {key:'8 sesiónes', value: 8},
    {key:'9 sesiónes', value: 9},
    {key:'10 sesiónes', value: 10},

  ];
  @Input() label: string = 'Selecciona un elemento';
  @Input() helpText: string = '';
  @Output() changeEv: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }
  selectValue(element: sourceDsSelect | any) {
    this.valueDisplay = element.key;
    this.elementSelected = element;
    this.isValid = true;
    this.display = false;
    this.changeEv.emit(this.elementSelected);
  }

  showElements() {
    this.display = true;
  }

  hiddenElement() {
    setTimeout(() => {
      this.display = false;
    }, 200);
  }
}


interface sourceDsSelect {
  key: string;
  value: any;
}