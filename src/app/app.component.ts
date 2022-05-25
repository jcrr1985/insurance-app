import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import '@vs-design-system/ds-table'
import { environment } from 'src/environments/environment';
import { DataUsuarioService } from './shared/services/data-usuario/data-usuario.service';
import { Token } from 'src/app/shared/interfaces/sso';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'web app';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private serviceUsuario: DataUsuarioService
  ) {}

  ngOnInit(){
    //this.LoadReembolso();
    //this.buscarDatos();
  }

  async LoadReembolso() {
    console.log('Cargando pagina de reembolso');
    //this.appInsightsService.trackEvent(Event.lkLoadReembolso);
    var urlSSO = environment.URL_SSO + '/auth';
    var urlWebSalud = this.document.location.origin + '/reembolso';
    var clientId = 'vs-web-salud';
    var url = `${urlSSO}?client_id=${clientId}&redirect_uri=${urlWebSalud}&response_mode=fragment&response_type=code&scope=openid`;
    console.log(url);
    var tokenData : Token = JSON.parse(localStorage.getItem("Token")!);
    const loginExitoso = await this.serviceUsuario.buscarData(tokenData.id_token);
    if (loginExitoso) {
      try {
          window.open(url, '_self');
        } catch (error) {
          console.warn('¡No se pudo recuperar un historial para esta cuenta!');
        }
      }
  }
}
