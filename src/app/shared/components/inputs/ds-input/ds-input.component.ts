import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { timer } from 'rxjs';


@Component({
  selector: 'ds-input-v2',
  templateUrl: './ds-input.component.html',
  styleUrls: ['./ds-input.component.scss']
})
export class DsInputComponent implements OnInit, AfterViewInit {

  constructor() { }
  @Input() type: string = 'text'
  @Input() maxlength: string = '30'
  @Input() label!: string;
  @Input() helpText!: string;
  @Input() value: any;
  @Output() changeEv: EventEmitter<any> = new EventEmitter();
  @Output() keyupEv: EventEmitter<any> = new EventEmitter();
  @Input() iconActive: boolean = true;
  @Input() statusActive: boolean = true;
  @Input() formatoMoneda!: boolean;
  @Input() formatoRut!: boolean
  @Input() tipo!: string
  isValid: boolean = false;
  @ViewChild('inp') inp!: ElementRef
  public formatter = new Intl.NumberFormat('es-CL');


  ngOnInit(): void {
    if (this.value) {
      this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
      if (this.formatoMoneda) this.value = this.format(this.value);
    };

  }
  async emitChange() {
    // delay necesario para que el buscador pueda compartir el input
    await timer(100).toPromise();
    //if (this.formatoMoneda) this.value = this.format(this.value);

    let emit = null;
    if (this.formatoMoneda) {
      this.value = this.format(this.value)
      emit = this.limpiarMonto(this.value)
    } else if (this.formatoRut) {

      emit = this.value.replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
      this.inp.nativeElement.value = emit
    } else {
      emit = this.value
      console.log('this.value', this.value)
    }

    console.log('emit', emit)
    this.changeEv.emit(emit);
    this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
    // const emit = this.formatoMoneda ? this.limpiarMonto(this.value) : this.value;

  }
  ngAfterViewInit(): void {
    this.inp.nativeElement
  }
  emitKeyup() {
    let emit = null;

    if (this.formatoMoneda) {
      console.log('this.formatoMoneda', this.formatoMoneda)
      this.value = this.format(this.value)
      emit = this.limpiarMonto(this.value)
    } else if (this.formatoRut) {
      console.log('this.formatoRut', this.formatoRut)
      console.log('this.value', this.value)
      emit = this.value.replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
    } else {
      emit = this.value
      console.log('this.value', this.value)
    }
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
