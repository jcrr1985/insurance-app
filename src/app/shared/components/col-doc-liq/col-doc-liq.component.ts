import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import '@vs-design-system/ds-input';

@Component({
  selector: 'app-col-doc-liq',
  templateUrl: './col-doc-liq.component.html',
  styleUrls: ['./col-doc-liq.component.scss']
})
export class ColDocLiqComponent implements OnInit {
  @Input() indice: any;
  @Output() indiceEmitter: EventEmitter<any> = new EventEmitter();
  
  constructor() { }
  
  ngOnInit(): void {
    console.log('indice', this.indice)

   }

   desplegar(){
    console.log('desplegado indice', this.indice);
    this.indiceEmitter.emit(this.indice);
   }
}
