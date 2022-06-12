import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Component, Inject } from '@angular/core';
import '@vs-design-system/ds-table'
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'web app';


  constructor(private dataStorageService: DataStorageService) {
    const that = this
    window.addEventListener("load", function (event) {
      console.log("'Todos los recursos terminaron de cargar!");
      const date = moment().format('DD/MM/YYYY');
      console.log('date', date)
      that.dataStorageService.setFechaAtencionBehavior.next(date)

    });
  }

}
