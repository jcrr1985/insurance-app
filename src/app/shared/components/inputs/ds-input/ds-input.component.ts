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
  @ViewChild('inp') inp!: HTMLInputElement;
  @ViewChild('input') inputElement!: ElementRef;
  public formatter = new Intl.NumberFormat('es-CL');
  inputNgModel: null = null;


  ngOnInit(): void {
    // if (this.value) {
    //   this.isValid = this.value && this.value.toString().trim() != '' && this.value != '$ 0' ? true : false;
    //   if (this.formatoMoneda) this.value = this.format(this.value);
    // };
  }
  async emitChange() {
    // delay necesario para que el buscador pueda compartir el input
    await timer(100).toPromise();
    //if (this.formatoMoneda) this.value = this.format(this.value);

    let emit = null;
    if (this.formatoMoneda) {
      this.value = this.format(this.value);
      emit = this.value;
      this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
      console.log(emit)
    }
    else if (this.formatoRut) {
      console.log("verificando rut ->", '#################')
      console.log(this.VerificaRut(this.value));
      this.isValid = this.VerificaRut(this.value);
      console.log("-----------------------------------------------")
      emit = this.value.replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
      // this.inp.value = emit
      // this.value = emit;
    }
    else {
      emit = this.value
      console.log('this.value', this.value)
      this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
    }

    this.changeEv.emit(emit);
    // this.isValid = this.value && this.value.toString().trim() != '' ? true : false;
    // const emit = this.formatoMoneda ? this.limpiarMonto(this.value) : this.value;

  }
  ngAfterViewInit(): void { }

  VerificaRut(rut: any) {
    if (rut) {
      var valor = rut.replaceAll('.', '');
      valor = valor.replace('-', '');

      let cuerpo = valor.slice(0, -1);
      let dv = valor.slice(-1).toUpperCase();

      if (cuerpo.length < 7) {
        return false;
      }

      let suma = 0;
      let multiplo = 2;

      for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) {
          multiplo = multiplo + 1;
        } else {
          multiplo = 2;
        }
      }

      let dvEsperado = 11 - (suma % 11);

      dv = dv == 'K' ? 10 : dv;
      dv = dv == 0 ? 11 : dv;

      if (dvEsperado != dv) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  emitKeyup() {
    let emit = null;

    if (this.formatoMoneda) {
      console.log('this.formatoMoneda', this.formatoMoneda)
      this.value = this.format(this.value)
      emit = this.limpiarMonto(this.value)
    } else if (this.formatoRut) {

      emit = this.value
      console.log('emit', emit)
    } else {
      emit = this.value
    }
    this.keyupEv.emit(emit);
  }
  format(valor: string | number) {
    if (valor) {

      const reg = /[^0-9,0-9]/g
      const incluyedecimal: boolean = valor.toString().includes(',');
      // limpiamos el valor en caso que el usuario haya separado con , los separadores de mil o insertado alguna letra
      const valorSinLetras = valor.toString().replace(reg, '');
      const valorParaParsear = valorSinLetras.replace(',', '.');
      const valorParseado = Number(valorParaParsear);
      const format = this.formatter.format(valorParseado);
      const incluyedecimal2 = format.includes(',');
      // parseamos el valor una vez se ha validado que es un numero
      return '$' + format + `${incluyedecimal && !incluyedecimal2 ? ',' : ''}`;
    } else {
      return null
    }
  }
  limpiarMonto(value: string | number) {
    const regexp = /[^0-9,]/g
    return parseFloat(value?.toString().replace(regexp, '').replace(',', '.'));
  }

  perdidaFocus() {
    if (this.label === 'Rut institucion/prestador') {
      console.log('intentando')
      this.value = this.value.replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    }
    setTimeout(() => {
      console.log(this.value);
      if (this.value === '' || this.value === null || this.value === undefined) {
        this.inputElement.nativeElement.classList.remove('error');
        this.inputElement.nativeElement.classList.remove('success');
      } else if (this.isValid) {
        this.inputElement.nativeElement.classList.remove('error');
        this.inputElement.nativeElement.classList.add('success');
      } else if (!this.isValid && this.value !== '' && this.value !== null) {
        this.inputElement.nativeElement.classList.add('error');
      }
    }, 150);
  }
}

