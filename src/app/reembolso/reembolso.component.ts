import { Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss'],
})
export class ReembolsoComponent implements OnInit {
  isLoading = true;
  dataSubscription = new Subscription();


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route : ActivatedRoute,
    private _authService: AuthenticationService,
    private service: DataUsuarioService,
    private router : Router) {

  }
  async ngOnInit() {
    console.log("Inicializacion Web Salud")
    const fragment = this.route.snapshot.fragment;
    if(fragment != null && fragment != '')
    {
      const parts = fragment.split('&')[1];
      const code = parts.split('=')[1];
      this._authService.identify(code).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem("Token", JSON.stringify(response));
          this.buscarDatos();
          this.router.navigateByUrl('/home');
          
      });

    }else{
      this.LoadReembolso();
    }
  }

  LoadReembolso() {
    console.log('Cargando pagina de reembolso');
    //this.appInsightsService.trackEvent(Event.lkLoadReembolso);
    var urlSSO = environment.URL_SSO + '/auth';
    var urlWebSalud = this.document.location.origin + '/reembolso';
    var clientId = 'vs-web-salud';
    var url = `${urlSSO}?client_id=${clientId}&redirect_uri=${urlWebSalud}&response_mode=fragment&response_type=code&scope=openid`;
    console.log(url);
    window.open(url, '_self');
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
