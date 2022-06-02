import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISource } from 'src/app/shared/interfaces/interfaces';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';

@Component({
  selector: 'app-select-parentesco',
  templateUrl: './select-parentesco.component.html',
  styleUrls: ['./select-parentesco.component.scss']
})
export class SelectParentescoComponent implements OnInit {
  @Output() changeEv: EventEmitter<any> = new EventEmitter()
  @Input() valueSelected: number | null = null;

  public source: ISource[] = [];

  label = 'Seleccione una persona';
  constructor(private userService: DataUsuarioService) {
  }

  ngOnInit(): void {
    if (this.userService.usuarioConectado && this.userService.usuarioConectado.cargas) {
      this.userService.usuarioConectado.cargas.forEach((carga) => {
        this.source.push({
          key: carga.nombres + " " + carga.apellidos,
          value: carga.rut + carga.dv,
          parentesco: carga.parentesco
        });
      });
    } else {
      console.log("cargas no definidas");
    }

  }

  selectPerson(value: any) {
    if (value == 0) this.label = 'Seleccione una persona'
    else {
      this.label = value.parentesco;
      this.changeEv.emit(value);
    }

  }

}
