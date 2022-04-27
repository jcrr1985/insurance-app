import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent implements OnInit {
  @Input()
  estadoPago!: string;
  @Input()
  texto!: string;
  public check: any;

  constructor() {}

  ngOnInit(): void {
    switch (this.texto) {
      case 'Pagado':
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;
      default:
        this.check = './../../../../assets/images/svgs/pagado.svg'
        break;  
        break;
    }
  }
}
