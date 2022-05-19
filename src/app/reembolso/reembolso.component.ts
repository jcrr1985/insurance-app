import { Component, OnInit } from '@angular/core';
import '@vs-design-system/ds-input';
import '@vs-design-system/ds-datepicker';
import '@vs-design-system/ds-select';
import '@vs-design-system/ds-stepper';
import '@vs-design-system/ds-radio';
import '@vs-design-system/ds-title';
import '@vs-design-system/ds-messaging';
import '@vs-design-system/ds-tooltip';
import '@vs-design-system/ds-button';
import '@vs-design-system/ds-file';
import { ReembolsoService } from '../shared/services/reembolso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss'],
})
export class ReembolsoComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private reembolsoService: ReembolsoService) {

  }
  ngOnInit(): void {
    console.log("Inicializacion Web Salud")
    const fragment = this.route.snapshot.fragment;
    if(fragment != null && fragment != '')
    {
      const parts = fragment.split('&')[1];
      const code = parts.split('=')[1];
      this.reembolsoService.recuperarToken(code);
    }
  }

}
