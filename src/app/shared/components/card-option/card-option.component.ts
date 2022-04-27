import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-option',
  templateUrl: './card-option.component.html',
  styleUrls: ['./card-option.component.scss']
})
export class CardOptionComponent implements OnInit {
  @Input() status: string = '';
  @Input() name: string = '';
  @Input() prestacionName: string = '';

  constructor() { }
  svgAvaliables: any = {
    "atencionhospitalaria": "../../../../assets/svg/atencionhospitalaria",
    "atencionmedica": "../../../../assets/svg/atencionmedica",
    "dentista": "../../../../assets/svg/dentista",
    "examenes": "../../../../assets/svg/examenes",
    "medicamentos": "../../../../assets/svg/medicamentos",
    "optica": "../../../../assets/svg/optica",
  }
  getRouteImg(nameItem: string) {
    try {
      return this.status == 'active' ? this.svgAvaliables[nameItem] + 'Activa.svg' : this.svgAvaliables[nameItem] + '.svg';
    } catch (error) {
      return '';
    }
  }

  ngOnInit(): void {
  }


}
