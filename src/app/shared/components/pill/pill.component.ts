import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent implements OnInit {
  @Input()
  texto!: string;
  public esAprobado: boolean = false;
  public esRechazado: boolean = false;
  public esEvaluacion: boolean = false;

  public check: any;

  constructor() {}

  ngOnInit(): void {
    switch (this.texto.toLocaleLowerCase()) {
      case 'pagado':
      case 'pagado parcial':
      case 'aprobada':
      case 'aprobado parcial':
      case 'transacción imed':
      case 'transacción farmacia':
        this.check = '/assets/images/svgs/pagado.svg';
        this.esAprobado = true;
        break;
      case 'en evaluación':
        this.check = '/assets/images/svgs/en-evaluacion.svg';
        this.esEvaluacion = true;
        break;
      case 'sin pago':
      case 'rechazada':
        this.check = '/assets/images/svgs/rechazado.svg';
        this.esRechazado = true;
        break;
    }
  }
}
