import { Component, OnDestroy, OnInit } from '@angular/core';
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

import {
  Chip,
  CustomStepperSize,
  FilesUploaded,
} from '../shared/interfaces/interfaces';
import { ReembolsoService } from '../shared/services/reembolso.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss'],
})
export class ReembolsoComponent implements OnInit {
  isLoading = true;
  dataSubscription = new Subscription();

  constructor(private service: DataUsuarioService) {

  }
  ngOnInit(): void {

    this.buscarDatos();
  }

  buscarDatos() {
    console.log('busco los datos');
    localStorage.setItem("ssoToken",environment.DEV_TOKEN_TEST);

    this.isLoading = true;
    this.dataSubscription = this.service.buscarData("17793573").subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      /* this.dataSource = response.data.data; */
    });

  }

}
