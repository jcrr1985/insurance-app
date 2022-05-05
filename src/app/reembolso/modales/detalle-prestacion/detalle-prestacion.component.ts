import { Component, OnInit, AfterViewInit, EventEmitter, Output, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-prestacion',
  templateUrl: './detalle-prestacion.component.html',
  styleUrls: ['./detalle-prestacion.component.scss'],
})
export class DetallePrestacionComponent
  implements OnInit {
  public modalMontoReembolso!: number;
  public prestacionNombre!: any;
  public modalData: Array<any> = [];
  private inputPredictivoNativo: any;
  @Input() idprestacionSeleccionada: number = 2;
  @Input() prestacionSeleccionada: any = {};
  @Output() datosNuevaPrestacion: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.prestacionSeleccionada)
    setTimeout(() => {
      this.inputPredictivoNativo = document.getElementById('busqueda-predictiva')!.querySelector('input');
    }, 100);
  }


  enviarDetalleModalData() {
    this.datosNuevaPrestacion.emit([...this.modalData]);
    this.closeModal();
  }

  closeModal(): void {
    this.hideModalEvent.emit(false);
  }
  receivedModalData(data: any) {
    this.datosNuevaPrestacion.emit(data);
  }

  setearValorInputPredictivo(textoArancel: string){
    console.log('capturado custom event textoArancel, su data ->', textoArancel)
    this.inputPredictivoNativo.value = textoArancel;
  }

  ngAfterViewInit() { }
}
