import { Reembolsos } from './../../shared/interfaces/interfaces';
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
  @ViewChild('theader')
  theader!: ElementRef;

  public totalTableEntriesLabel!: number;
  public paginationSource: PaginationSource[] = [];
  public numberOfpaginationSourceObjects: number = this.paginationSource.length;
  public dsCounterSelectedOptionValue: number = 10;
  public cantidadDeRegistrosEnTabla!: number;
  public tenByDefault: number = 10;
  public  initialLabel: string = '10';
  public reembolsos: Reembolsos[];
  public leftAssignmentFromRight: number = 10;

  constructor(
    private reembolsoService: ReembolsoService,
    private router: Router,
  ) {
    this.reembolsos = this.reembolsoService.getReembolsos();
  }
  ngOnDestroy(): void {
    if (window.removeAllListeners) window.removeAllListeners();
  }

  public tenEntriesByDefault!: any[];

  ngOnInit(): void {
    this.addAccessKey();
    let numeroDeRegistros = this.reembolsos.length;
    for (let i = 10; i <= numeroDeRegistros; i += 10) {
      const paginationCounterProperties = { label: i.toString(), value: i };
      this.paginationSource.push(paginationCounterProperties);
    }
    this.totalTableEntriesLabel =
      this.paginationSource[this.paginationSource.length - 1].value;
    this.tenEntriesByDefault = this.reembolsos.slice(0, this.tenByDefault);
  }

  ngAfterViewInit() {
    //ultimo numero en el counter de la derecha (cantidad de resultados )
    console.log('this.dsPageCounter.nativeElement.children[0].children[2]', this.dsPageCounter.nativeElement.children[0].children[2])

    this.dsPageCounter.nativeElement.children[0].children[2].children[0].innerHTML =
      this.totalTableEntriesLabel;
    const pagNums = Array.from(document.getElementsByClassName('css-16sfy5f'));
    const leftPaginationSelected = Array.from(
      document.getElementsByClassName('css-7mrpfl active')
    );
    const selectedAndNot = leftPaginationSelected.concat(pagNums);
    console.log('selectedAndNot', selectedAndNot);

    // Setea dsCounterSelectedOptionValue (derecha) en funcion del pagination seleccionado (izquierda)
    selectedAndNot.forEach((leftPag) => {
      leftPag.addEventListener('click', (leftNum: any) => {
        this.dsCounterSelectedOptionValue = Number(leftNum.target.textContent) * 10;
        this.setCantidadResultados();
        this.initialLabel = this.dsCounterSelectedOptionValue.toString();
        console.log('this.initialLabel', this.initialLabel)
      });
    });

    //seteando pagination: leftside from rightside
    setTimeout(() => {
      const counterOptions = Array.from(
        document.querySelectorAll('.css-1dzmd0k')
      );
      for (const counterOption of counterOptions as any) {
        counterOption.addEventListener('click', (e: any) => {
          this.dsCounterSelectedOptionValue = Number(e.target.innerHTML);
          this.leftAssignmentFromRight = this.dsCounterSelectedOptionValue / 10;
          this.setCantidadResultados();

          //Mirror left side:
          selectedAndNot.filter((e: any) => {
            if (Number(e.innerHTML) == this.leftAssignmentFromRight) {
              console.log('found :', e.innerHTML);

              e.classList.remove('css-16sfy5f');
              e.classList.add('css-7mrpfl');
              e.classList.add('active');
            } else {
              e.classList.add('css-16sfy5f');
              e.classList.remove('css-7mrpfl');
              e.classList.remove('active');
            }
          });
        });
      }
    }, 100);

    this.theader.nativeElement.style.backgroundColor = 'rgba(122,72,212,.3)';
  }

  setCantidadResultados() {
    let chunk = this.reembolsos.slice(0, this.dsCounterSelectedOptionValue);
    this.tenEntriesByDefault = chunk;
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
