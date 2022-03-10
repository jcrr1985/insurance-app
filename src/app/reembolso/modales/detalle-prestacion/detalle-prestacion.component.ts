import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-detalle-prestacion',
  templateUrl: './detalle-prestacion.component.html',
  styleUrls: ['./detalle-prestacion.component.scss'],
})
export class DetallePrestacionComponent
  implements OnInit, AfterViewInit, OnChanges
{
  public inp1: string = 'none';
  public inp2: string = 'none';
  public inp3: string = 'none';
  public inp4: string = 'none';
  public inputField: any;
  public modalMontoReembolso!: number;
  public prestacionNombre!: any;
  public modalData: Array<any> = [];


  @Output() datosNuevaPrestacion: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() isModalActive!: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.isModalActive = changes.isModalActive.currentValue;
  }

  onFocusOutInputNombrePrestacion(event: any): void {
    event.target.value ? this.inp1 = 'success' : 'error';
    this.modalData.push(event.target.value);
  }

  onFocusOutInputNumeroSesiones(event: any): void {
    event.target.value ? this.inp2 = 'success' : 'error';
    this.modalData.push(event.target.value);
  }

  onFocusOutInputValor(event: any): void {
    event.target.value ? this.inp3 = 'success' : 'error';
    this.modalData.push(event.target.value);
  }

  onFocusOutInputBonificacion(event: any): void {
    event.target.value ? this.inp4 = 'success' : 'error';
    this.modalData.push(event.target.value);
  }

  enviarDetalleModalData() {
    this.datosNuevaPrestacion.emit([...this.modalData]);
    this.closeModal();
  }

  closeModal(): void {
    this.hideModalEvent.emit(this.isModalActive);
  }

  ngAfterViewInit() {}
}
