import { DataStorageService } from './../../services/data-storage.service';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import '@vs-design-system/ds-title'


@Component({
  selector: 'app-table-resume-detalle-prestacion',
  templateUrl: './table-resume-detalle-prestacion.component.html',
  styleUrls: ['./table-resume-detalle-prestacion.component.scss']
})
export class TableResumeDetallePrestacionComponent implements OnInit, OnDestroy {
  @Output() editEv: EventEmitter<any> = new EventEmitter();
  @Output() deleteEv: EventEmitter<any> = new EventEmitter();
  @Output() totalPrestacionesEmitter: EventEmitter<any> = new EventEmitter();
  public formatter = new Intl.NumberFormat('es-CL');

  // @Input() prestaciones: any = [];
  prestaciones: any

  prestacionSeleccionada: any = {};
  totalPrestaciones: number = 0;
  montoReembolsar: number = 0;
  interval: any;
  constructor(private dataStorageService: DataStorageService) { }
  ngOnInit(): void {
    this.dataStorageService.getPrestaciones().subscribe(prestaciones => {
      this.prestaciones = prestaciones;
      console.log("recibiendo prestaciones", this.prestaciones);
      this.dataStorageService.montoTotalSolicitadoSubject.next(this.prestaciones)
      this.calcMounts();
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  edit(prestacion: any) {
    // this.prestacionSeleccionada = prestacion;
    // this.editEv.emit(this.prestacionSeleccionada);
  }

  delete(prestacion: any) {
    //this.prestacionSeleccionada = prestacion
    //this.deleteEv.emit(this.prestacionSeleccionada);
    this.dataStorageService.deletePrestacion(prestacion.id);
  }

  /**
   * @description calcula los montos de la tabla
   */
  calcMounts() {
    this.totalPrestaciones = 0;
    this.montoReembolsar = 0;
    let bonificacion = 0;
    for (let x of this.prestaciones) {
      this.totalPrestaciones += Number(x.valorPrestacion);
      bonificacion += Number(x.bonificacion)
    }
    this.montoReembolsar = this.totalPrestaciones - bonificacion;
    this.totalPrestacionesEmitter.emit(this.montoReembolsar)
  }

  formateoValor(valor: number) {
    if (valor < 1) return '$0';
    return '$' + this.formatter.format(valor);
  }
}
