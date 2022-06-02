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
  @Input() valueSelected: number | null = null;
  @Input() source!: any[] | sourceDsSelect[];
  @Input() label!: string;
  @Input() helpText: string = '';
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  public tituloSelectInput!: string;

  constructor() { }

  ngOnInit(): void {
    // if(this.source[0].key == '1 sesión') {
    //   console.log('si esto es el select de agergar prestacion')
    // }else if(this.source[0].parentesco == 'Yo'){
    //   console.log('BAKUHATSU!!!!!!  quien se atendio')  
    // }
    if (this.valueSelected) {
      const found = this.source.find(e => e.value == this.valueSelected);
      if (found) this.selectValue(found)
    }

    switch (this.label) {
      case 'Isapre/Fonasa':
        this.tituloSelectInput = 'Isapre/Fonasa'
        break;
      case 'Seleccione una persona':
        this.tituloSelectInput = 'Elige una persona'
        break;
      case 'Número de Sesiones':
        this.tituloSelectInput = 'Número de sesiones'
        break;

      default:
        break;
    }
  }
  selectValue(element: sourceDsSelect | any) {
    element.key ? this.valueDisplay = element.key : this.valueDisplay = element.label;
    this.elementSelected = element;
    this.isValid = true;
    this.display = false;
    this.changeEv.emit(this.elementSelected);
  }

  showElements() {
    this.display = true;
  }

  hideElements() {
    setTimeout(() => {
      this.display = false;
    }, 200);
  }
}


interface sourceDsSelect {
  key: string;
  value: any;
}