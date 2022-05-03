import { Component, OnInit } from '@angular/core';
import '@vs-design-system/ds-card'
import '@vs-design-system/ds-icon'
import { Chip } from '../../interfaces/interfaces';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  public chipsData: Chip[] = [{
    nombre:"vs-Nurse-men",
    desripcion: "Consulta Médica",
    state: false
  },{
    nombre:"vs-Hospital-bed-vive",
    desripcion: "Atención Hospitalaria",
    state: false
  },{
    nombre:"vs-Microscope",
    desripcion: "Marcos y lentes",
    state: false
  },
  {
    nombre:"vs-Sad",
    desripcion:"Atención Dental",
    state: false
  },{
    nombre:"bi-sunglasses",
    desripcion: "Marcos y lentes",
    state: false
  },{
    nombre:"vs-Recetas",
    desripcion: "Compra de medicamentos",
    state: false
  }];

  constructor() { }

  ngOnInit(): void {
    this.chipsData[0].state = true;
  }

  setColor(id: number){
    this.chipsData.forEach((card:Chip)=>{
      card.state = false;
    })
    this.chipsData[id].state = true;
  }

}
