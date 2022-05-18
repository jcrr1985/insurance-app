import { Reembolsos, PaginationSource } from '../../shared/interfaces/interfaces';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
import '@vs-design-system/ds-pagination';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';
import { IUsuario } from 'src/app/shared/interfaces/usuario-api';


@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.scss'],
})
export class TablaHistorialComponent
  implements OnInit, OnDestroy {
    /* const dataSource!: IUsuario; */
    isLoading = true;
    dataSubscription = new Subscription();
  // @ViewChild('dsPageCounter') dsPageCounter: ElementRef<HTMLElement> =
  //   {} as ElementRef;
  @ViewChild('dsPageCounter') dsPageCounter: any;
  @ViewChild('theader')
  theader!: ElementRef;

  public reembolsos!: Reembolsos[];
  showTable: boolean = false;

  constructor(
    private reembolsoService: ReembolsoService,
    private router: Router,
    private service: DataUsuarioService
  ) { }

  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  public tenEntriesByDefault!: any[];

  ngOnInit(): void {
    this.addAccessKey();
    this.aciveTableHistorial();

  }

  resultadosPorPagina: number = 10;
  pageSelected: number = 1;
  totalRegistros: number = 0;
  totalPaginas: number = 1;
  dataRegistros: any = [];
  sourcePagination = [{ "label": "0", "value": "0" }];

  async aciveTableHistorial() {
    this.calTotalRegistros();
    this.calculatePages();
    this.getReembolsos();
    this.createSourcePagination();
    this.showTable = false;
    await timer(10);
    this.showTable = true;
  }
  /**
   * @description calcula el total de registros disponibles
   */
  calTotalRegistros() {
    this.totalRegistros = this.reembolsoService.getReembolsos().length;
  }
  /**
   * @description calcula segun la cantidad de registros las paginas disponibles
   */
  calculatePages() {
    const numeroDisponible = this.totalRegistros / this.resultadosPorPagina;
    const verificandoAdicional = numeroDisponible - parseInt((numeroDisponible).toString());
    this.totalPaginas = numeroDisponible + (verificandoAdicional > 0 ? 1 : 0);
  }
  /**
   * @description obtiene los registros segun la posicion seleccionada de la pagina y la cantidad a mostrar
   */
  getReembolsos() {
    const inicio = (this.resultadosPorPagina * this.pageSelected) - this.resultadosPorPagina;
    const final = inicio + this.resultadosPorPagina;
    this.dataRegistros = (this.reembolsoService.getReembolsos()).slice(inicio, final);
  }

  /**
   * @description crea el seleccionable de registros por pagina
   */
  createSourcePagination() {
    let index = 1;
    let source = [];

    const numeroDisponible = this.totalRegistros / 10;
    const verificandoAdicional = numeroDisponible - parseInt((numeroDisponible).toString());
    const totalCiclos = numeroDisponible + (verificandoAdicional > 0 ? 1 : 0);

    while (index <= totalCiclos) {
      const valor = 10 * index;
      source.push({ "label": `${valor}`, "value": `${valor}` })
      index++;
    }
    source[source.length - 1].label = `${this.totalRegistros}`;
    source[source.length - 1].value = `${this.totalRegistros}`;
    this.sourcePagination = source;
  }
  /**
   * 
   * @param event evento de seleccion de pagina
   * @description recibe el numero de la pagina a visualizar
   */
  eventSelectPage(event: any) {
    if (event.detail) {
      this.pageSelected = event.detail;
      this.aciveTableHistorial();
    }
  }
  /**
   * 
   * @param event evento de seleccion de numero por pagina
   * @description recibe el valor de la cantidad de registros permitidos por pagina
   */
  eventPaginationSource(event: any) {
    if (event.detail[0]) {
      this.resultadosPorPagina = event.detail[0].value;
      this.pageSelected = 1;
      this.aciveTableHistorial();
    }
  }

  /**
   * @description una funcion temporal para acceder a un apartado de pruebas
   */
  addAccessKey() {
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.code == 'KeyQ')
        this.router.navigate(['/testing']);
    });
  }

  buscarDatos() {
    console.log('busco los datos');
    this.isLoading = true;
    this.dataSubscription = this.service.buscarData().subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      /* this.dataSource = response.data.data; */
    });
  }
}
