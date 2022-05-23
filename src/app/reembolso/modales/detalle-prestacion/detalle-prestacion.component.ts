import { DataStorageService } from './../../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
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
  public idprestacionSeleccionada!: number;
  public stepsStatusOn: any;
  public prestacionSeleccionada: any = {};
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService) { }

  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);

    setTimeout(() => {
      this.inputPredictivoNativo = document.getElementById('busqueda-predictiva')!.querySelector('input');
    }, 100);
    // this.arancelService.setIdSubject$.subscribe(idPrestacion => this.idprestacionSeleccionada = idPrestacion)
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idprestacionSeleccionada = id)
  }

  closeModal(): void {
    this.hideModalEvent.emit(false);
  }

  receivedModalData(data: any) {
    this.dataStorageService.agregarPrestacion(data);
    this.dataStorageService.setFormReembolso('stepFive_Details', 'reembolsoCalculation', true);

  }

  setearValorInputPredictivo(textoArancel: string) {
    this.inputPredictivoNativo.value = textoArancel;
  }

  ngAfterViewInit() { }
  
}
