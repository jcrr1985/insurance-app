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
import '@vs-design-system/ds-collapsible'

import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Token, TokenData } from 'src/app/shared/interfaces/sso';
import * as JWT from 'jwt-decode';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';
import { Historico } from 'src/app/shared/models/historico';

@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.scss'],
})
export class TablaHistorialComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dsPageCounter') dsPageCounter: any;
  @ViewChild('theader')
  theader!: ElementRef;

  public indiceSeleccionado!: any;
  public reembolsos!: Reembolsos[];
  showTable: boolean = false;
  public reembolsosUsuario: Historico[] = [];
  private formatter = new Intl.NumberFormat('es-CL');
  public siguientePagina!: () => void;
  public paginaAnterior!: () => void;

  constructor(
    private reembolsoService: ReembolsoService,
    private router: Router,
    private dataUsuario: DataUsuarioService
  ) {
  }
  public tenEntriesByDefault!: any[];

  async ngOnInit(): Promise<any> {
    this.addAccessKey();
    await this.activeTableHistorial();
    var tokenData: Token = JSON.parse(localStorage.getItem("Token")!);
    var UserInfo: TokenData = JWT(tokenData.access_token);
    this.reembolsosUsuario = this.dataUsuario.usuarioConectado.historial;
    //this.buttonsArrows();

  }

  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 200);

  }

  resultadosPorPagina: number = 10;
  pageSelected: number = 1;
  totalRegistros: number = 0;
  totalPaginas: number = 1;
  sourcePagination = [{ "label": "0", "value": "0" }];

  async activeTableHistorial() {
    this.calTotalRegistros();
    this.calculatePages();
    this.createSourcePagination();
    this.showTable = false;
    console.log("waiting")
    await timer(10).toPromise();
    console.log("end waiting")
    this.showTable = true;

  }

  buttonsArrows() {
    /*  const siguientePagina = () => {
       let naranja = document.querySelector('.css-7mrpfl') as HTMLElement | null;
       let naranjaNextSibling = naranja?.nextSibling as HTMLElement | null;
       try {
         naranjaNextSibling?.click();
       } catch (error) {
       }
     }
     const paginaAnterior = () => {
       let naranja = document.querySelector('.css-7mrpfl') as HTMLElement | null;
       let naranjaPreviousSibling = naranja?.previousSibling as HTMLElement | null;
       naranjaPreviousSibling?.click();
     }
     this.siguientePagina = siguientePagina;
     this.paginaAnterior = paginaAnterior */
  }
  /**
   * @description calcula el total de registros disponibles
   */
  calTotalRegistros() {
    this.totalRegistros = this.dataUsuario.usuarioConectado.Pagination.numberOfRecords;
  }
  /**
   * @description calcula segun la cantidad de registros las paginas disponibles
   */
  calculatePages() {
    this.totalPaginas = this.dataUsuario.usuarioConectado.Pagination.numberOfPages;
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
  async eventSelectPage(event: any) {
    if (this.pageSelected != event.detail) {
      console.log("seleccionadno pagina", event);
      this.pageSelected = event.detail;
      await this.dataUsuario.getReimbursements(this.pageSelected, this.resultadosPorPagina);
      this.reembolsosUsuario = this.dataUsuario.usuarioConectado.historial;
      this.activeTableHistorial();
    }
  }
  /**
   *
   * @param event evento de seleccion de numero por pagina
   * @description recibe el valor de la cantidad de registros permitidos por pagina
   */
  async eventPaginationSource(event: any) {
    console.log("me buscars", event);
    if (event.detail[0] && event.detail[0].value) {
      this.resultadosPorPagina = event.detail[0].value;
      this.pageSelected = 1;
      await this.dataUsuario.getReimbursements(this.pageSelected, this.resultadosPorPagina);
      this.reembolsosUsuario = this.dataUsuario.usuarioConectado.historial;
      this.activeTableHistorial();
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

  formateoValor(valor: number) {
    if (valor < 1) return '$0';
    return '$' + this.formatter.format(valor);
  }

}

