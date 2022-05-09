import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-final',
  templateUrl: './pantalla-final.component.html',
  styleUrls: ['./pantalla-final.component.scss']
})
export class PantallaFinalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  construirFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();
    const mes =
      fecha.getMonth() < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
    const anno = fecha.getFullYear();
    return `${dia}/${mes}/${anno}`;
  }


}
