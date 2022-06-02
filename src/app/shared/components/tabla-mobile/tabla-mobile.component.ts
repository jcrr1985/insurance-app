import { Token } from '@angular/compiler';
import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Reembolsos } from '../../interfaces/interfaces';
import { TokenData } from '../../interfaces/sso';
import { BreakpointObserverService } from '../../services/breakpoint-observer.service';
import { ReembolsoService } from '../../services/reembolso.service';

@Component({
  selector: 'app-tabla-mobile',
  templateUrl: './tabla-mobile.component.html',
  styleUrls: ['./tabla-mobile.component.scss']
})
export class TablaMobileComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {
  @ViewChild('dsPageCounter') dsPageCounter: any;
  @ViewChild('theader')
  theader!: ElementRef;

  public indiceSeleccionado!: any;
  public reembolsos!: Reembolsos[];
  showTable: boolean = false;
  public size$!: Observable<string>;


  constructor(
    private reembolsoService: ReembolsoService,
    private router: Router,
    private _breakpointObserverService: BreakpointObserverService
  ) {
  }

  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  public tenEntriesByDefault!: any[];

  ngOnInit(): void {
    this.addAccessKey();
    this.aciveTableHistorial();
    var tokenData: Token = JSON.parse(localStorage.getItem("Token")!);
    this.size$ = this._breakpointObserverService.size$;
  }

  ngAfterContentChecked() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 200);

  }
  siguientePagina() {
    let naranja = document.querySelector('.css-7mrpfl') as HTMLElement | null;
    let naranjaNextSibling = naranja?.nextSibling as HTMLElement | null;
    naranjaNextSibling?.click()
  }

  paginaAnterior() {
    let naranja = document.querySelector('.css-7mrpfl') as HTMLElement | null;
    let naranjaPreviousSibling = naranja?.previousSibling as HTMLElement | null;
    naranjaPreviousSibling?.click();
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
    timer(10);
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
  // TODO funcion Vieja, pendiente rectificar de ser necesario
  abrirColapsable(registroNo: any) {
    this.ocultarColapsables();
    this.indiceSeleccionado = registroNo;
    let filaColapsable = document.getElementById(registroNo);
    // console.log('filaColapsable', filaColapsable)
    filaColapsable?.classList.remove('oculto');
    filaColapsable?.classList.add('visible')

  }
  /**
   * @description oculta todas las colapsables dentro de la tabla html que muestran la informacion del registro
   */
  ocultarColapsables() {
    let colapsables = document.querySelectorAll('.contenido-colapsable--borde')
    colapsables.forEach(colapsable => {
      colapsable.classList.remove('visible')
      colapsable.classList.add('oculto')
    });
  }
  /**
   * @description realiza un toggle del colapsable para mostrar la informacion
   * @param registroNo id del row en la tabla html
   */
  toogleCollapsable(registroNo: any) {
    this.indiceSeleccionado = registroNo;
    let filaColapsables = document.querySelectorAll('#' + registroNo) as any;
    for (let filaColapsable of filaColapsables) {
      const styles = filaColapsable?.classList;
      if (styles && styles[1] == 'visible') { filaColapsable?.classList.add('oculto'); filaColapsable?.classList.remove('visible'); }
      else { filaColapsable?.classList.add('visible'); filaColapsable?.classList.remove('oculto'); }
    }
  }

  public filasColapsables = [
    { motivo: 'Consulta Médica', valor: '$10.000', bonificacion: '$10.000', observaciones: 'Observaciones' },
    { motivo: 'Compra de Medicamentos', valor: '$5.000', bonificacion: '$3.000', observaciones: 'Observaciones' },
    { motivo: 'Marcos y Lentes', valor: '$550.000', bonificacion: '$93.000', observaciones: 'Observaciones' }
  ];
}
