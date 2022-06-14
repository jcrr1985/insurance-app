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
import { Subscription } from 'rxjs';
import { DataUsuarioService } from '../shared/services/data-usuario/data-usuario.service';
import { Token, TokenData } from 'src/app/shared/interfaces/sso';
import * as JWT from 'jwt-decode';

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
    private serviceUsuario: DataUsuarioService,
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
          this.LoadInsuredData();
      });
    }else{
      this._authService.getToken("17793573-5","vida2020").subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem("Token", JSON.stringify(response));
          this.LoadInsuredData();
      });
    }
  }

  async LoadInsuredData() {
    console.log('Cargando pagina de reembolso');
    var token : Token = JSON.parse(localStorage.getItem('Token')!);
    var UserInfo: TokenData = JWT(token.access_token);
    const loginExitoso = await this.serviceUsuario.InsuredData(UserInfo.preferred_username);
    if (loginExitoso) {
      try {
          await this.serviceUsuario.getReimbursements();
          this.router.navigate(["/home"]);
        } catch (error) {
          console.warn('¡No se pudo recuperar los datos del asegurado!');
        }
      }
  }

}
