import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent implements OnInit {
  @Input()
  texto!: string;
  
  public check: any;

  constructor() {}

  ngOnInit(): void {
    switch (this.texto) {
      case 'Pagado':
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;
        case 'Pagado parcial':
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;
        case 'En evaluación':
        this.check = './../../../../assets/images/svgs/en-evaluacion.svg'
        break;
        case 'Sin pago':
        this.check = './../../../../assets/images/svgs/rechazado.svg'
        break;
        case 'Transacción IMED':
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;
        case 'Transacción Farmacia':
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;
    }
  }
}
