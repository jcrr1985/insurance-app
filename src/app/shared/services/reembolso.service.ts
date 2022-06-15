import { BehaviorSubject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Chip, Reembolsos } from '../interfaces/interfaces';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IConsignment } from '../interfaces/IConsignment';
import { IResponseConsignment } from '../interfaces/IResponseConsignment';
import { environment } from 'src/environments/environment';
import { Token } from '../interfaces/sso';


@Injectable({
      providedIn: 'root',
})
export class ReembolsoService {
  public datosReembolsosRepetido: Reembolsos[] = [];
  private ssoToken!: Token;
  private headers!: HttpHeaders;


  constructor(private http: HttpClient) { }

  async postConsignment (consignment: IConsignment): Promise<IResponseConsignment | void> {
    const request = {data: consignment};
    this.ssoToken = JSON.parse(localStorage.getItem('Token')!);
    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.ssoToken.access_token}`)
      .set('x-ibm-client-id', environment.X_IBM_CLIENT_ID);
    try {
      const data = await this.http
        .post<IResponseConsignment>(
          `${environment.URL_BFF_BASE}/client/consignment`,
          request,
          { headers: this.headers }
        )
        .toPromise();
      return data;
    } catch (error) {
      console.log('error', error);
      if ((error as HttpErrorResponse).status >= 500) return localStorage.setItem('httpStatus', `${(error as HttpErrorResponse).status}`);
      if ((error as any).status === 0) return localStorage.setItem('httpStatus', `401`);
      return localStorage.setItem('httpStatus', `500`);
    }
  }
      public chipsData: Chip[] = [
            {
                  nombre: 'vs-Nurse-men',
                  desripcion: 'Consulta Médica',
                  state: false,
            },
            {
                  nombre: 'vs-Hospital-bed-vive',
                  desripcion: 'Atención Hospitalaria',
                  state: false,
            },
            {
                  nombre: 'vs-Microscope',
                  desripcion: 'Marcos y lentes',
                  state: false,
            },
            {
                  nombre: 'vs-Sad',
                  desripcion: 'Atención Dental',
                  state: false,
            },
            {
                  nombre: 'bi-sunglasses',
                  desripcion: 'Marcos y lentes',
                  state: false,
            },
            {
                  nombre: 'vs-Recetas',
                  desripcion: 'Compra de medicamentos',
                  state: false,
            },
      ];

      public habilitarSeleccionBeneficiario: BehaviorSubject<any> = new BehaviorSubject(true);
      public habilitarSeleccionBeneficiario$ = this.habilitarSeleccionBeneficiario.asObservable();
      public habilitarPaso1: boolean = true;
      public idprestacion: number = 1;

      setHabilitarStepone(value: boolean) {
            this.habilitarPaso1 = value;
            // this.habilitarSeleccionBeneficiario.next(value);

      }

      getChipsData(): Chip[] {
            return this.chipsData;
      }

      public montoTotalSolicitado: number = 0;

      setMontoTotalSolicitado(montoTotal: number) {
            this.montoTotalSolicitado = montoTotal
      }

      public get getMontoTotalSolicitado() {
            return this.montoTotalSolicitado;
      }
}
