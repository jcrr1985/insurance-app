import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';


@Component({
  selector: 'ds-input-v2',
  templateUrl: './ds-input.component.html',
  styleUrls: ['./ds-input.component.scss']
})
export class DsInputComponent implements OnInit {

  constructor() { }
  @Input() type: string = 'text'
  @Input() label!: string;
  @Input() helpText!: string;
  @Input() value: any;
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  @Output() keyupEv: EventEmitter<any> = new EventEmitter();
  @Input() iconActive: boolean = true;
  @Input() statusActive: boolean = true;
  @Input() formatoMoneda: boolean = false;
  isValid: boolean = false;
  public formatter = new Intl.NumberFormat('es-CL');


  ngOnInit(): void {
  }
  async emitChange() {
    // delay necesario para que el buscador pueda compartir el input
    await timer(100).toPromise();
    //if (this.formatoMoneda) this.value = this.format(this.value);
    const emit = this.formatoMoneda ? this.limpiarMonto(this.value) : this.value;
    this.changeEv.emit(emit);
    this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
  }
  emitKeyup() {
    if (this.formatoMoneda) this.value = this.format(this.value);
    const emit = this.formatoMoneda ? this.limpiarMonto(this.value) : this.value;
    this.keyupEv.emit(emit);
  }
  format(valor: string | number) {
    const reg = /[^0-9,0-9]/g
    const incluyedecimal: boolean = valor.toString().includes(',');
    // limpiamos el valor en caso que el usuario haya separado con , los separadores de mil o insertado alguna letra
    const valorSinLetras = valor.toString().replace(reg, '');
    const valorParaParsear = valorSinLetras.replace(',', '.');
    const valorParseado = Number(valorParaParsear);
    const format = this.formatter.format(valorParseado);
    const incluyedecimal2 = format.includes(',');
    // parseamos el valor una vez se ha validado que es un numero
    return '$ ' + format + `${incluyedecimal && !incluyedecimal2 ? ',' : ''}`;
  }
  limpiarMonto(value: string | number) {
    const regexp = /[^0-9,]/g
    return parseFloat(value.toString().replace(regexp, '').replace(',', '.'));
  }

}
