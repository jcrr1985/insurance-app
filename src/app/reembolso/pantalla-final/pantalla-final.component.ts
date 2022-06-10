import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-pantalla-final',
  templateUrl: './pantalla-final.component.html',
  styleUrls: ['./pantalla-final.component.scss']
})
export class PantallaFinalComponent implements OnInit {
  fechaAtencion: any;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
     const x  = this.dataStorageService.getTipoDoc
     this.fechaAtencion = this.dataStorageService.getFechaAtencion()  || moment().format('DD/MM/YYYY');
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
