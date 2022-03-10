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

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss'],
})
export class ReembolsoComponent implements OnInit {

  constructor(private reembolsoService: ReembolsoService) {

  }
  ngOnInit(): void {
  }

}
