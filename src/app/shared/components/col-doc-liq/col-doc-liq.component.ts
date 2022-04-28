import { Component, OnInit } from '@angular/core';
import '@vs-design-system/ds-input';

@Component({
  selector: 'app-col-doc-liq',
  templateUrl: './col-doc-liq.component.html',
  styleUrls: ['./col-doc-liq.component.scss']
})
export class ColDocLiqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
     const chevrons =  Array.from(document.getElementsByClassName('ds-open-tabla-hist'));
     chevrons.forEach((chevron:any) => {
       const svg: HTMLElement = chevron.children[0].children[0].children[0].children[0];
       svg.style.position = "relative";
       svg.style.top = "-3px"       
     });
    //  console.log('chevrons', chevrons)
    }, 100);
  }

}
