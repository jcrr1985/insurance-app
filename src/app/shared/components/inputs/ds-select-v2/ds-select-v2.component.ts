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
  @Input() source: any[] | sourceDsSelect[] = [];
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