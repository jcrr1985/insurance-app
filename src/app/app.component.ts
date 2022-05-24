import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import '@vs-design-system/ds-table'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'web app';

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(){
    //this.LoadReembolso();
  }

  // LoadReembolso() {
  //   console.log('Cargando pagina de reembolso');
  //   //this.appInsightsService.trackEvent(Event.lkLoadReembolso);
  //   var urlSSO = environment.URL_SSO + '/auth';
  //   var urlWebSalud = this.document.location.origin + '/reembolso';
  //   var clientId = 'vs-web-salud';
  //   var url = `${urlSSO}?client_id=${clientId}&redirect_uri=${urlWebSalud}&response_mode=fragment&response_type=code&scope=openid`;
  //   console.log(url);
  //   window.open(url, '_self');
  // }
}
