import { PaginationSource } from '../../shared/interfaces/interfaces';
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

@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.scss'],
})
export class TablaHistorialComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // @ViewChild('dsPageCounter') dsPageCounter: ElementRef<HTMLElement> =
  //   {} as ElementRef;
  @ViewChild('dsPageCounter') dsPageCounter: any;
  public totalTableEntriesLabel!: number;
  public paginationSource: PaginationSource[] = [];
  public numberOfpaginationSourceObjects: number = this.paginationSource.length;
  public dsCounterSelectedOptionValue: number = 10;
  public cantidadDeRegistrosEnTabla!: number;
  public tenByDefault: number = 10;

  constructor(
    private reembolsoService: ReembolsoService,
    private elementRef: ElementRef,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  get datosReembolsos() {
    return this.reembolsoService.getDatosReembolsos();
  }

  get datosReembolsosRepetido() {
    return this.reembolsoService.getDatosReembolsosRepetido();
  }

  public ArrayEnFuncionDeLaOpcionSeleccionada!: any[];

  ngOnInit(): void {
    this.addAccessKey();

    let numeroDeRegistros = this.datosReembolsosRepetido.length;
    for (let i = 10; i <= numeroDeRegistros; i += 10) {
      const paginationCounterProperties = { label: i.toString(), value: i };
      this.paginationSource.push(paginationCounterProperties);
    }
    this.totalTableEntriesLabel =
      this.paginationSource[this.paginationSource.length - 1].value;
    this.ArrayEnFuncionDeLaOpcionSeleccionada =
      this.datosReembolsosRepetido.slice(0, this.tenByDefault);
  }

  ngAfterViewInit() {
    this.dsPageCounter.nativeElement.children[0].children[2].children[0].innerHTML =
      this.totalTableEntriesLabel;
    console.log('this.totalTableEntriesLabel', this.totalTableEntriesLabel);

    const pagNums = Array.from(document.getElementsByClassName('css-16sfy5f'));
    const leftPaginationSelected = Array.from(document.getElementsByClassName('css-7mrpfl active'));
    const selectedAndNot = leftPaginationSelected.concat(pagNums)
    console.log('selectedAndNot', selectedAndNot)
    
    
      //TODO Setear dsCounterSelectedOptionValue (derecha) en funcion del pagination seleccionado (izquierda)
      selectedAndNot.forEach(element => {
      element.addEventListener('click', (e:any)=> {
        this.dsCounterSelectedOptionValue = (Number(e.target.textContent) * 10)
        this.setCantidadResultados()
      })
      
    });
    console.log('pagNums', pagNums)

    this.elementRef.nativeElement
      .querySelector('.pageCounter')
      .addEventListener('click', this.setCantidadResultados());
  }

  setCantidadResultados() {

    console.log('this.dsCounterSelectedOptionValue', this.dsCounterSelectedOptionValue)
    let chunk = this.datosReembolsosRepetido.slice(
      0,
      this.dsCounterSelectedOptionValue
    );
    this.ArrayEnFuncionDeLaOpcionSeleccionada = chunk;
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
}
