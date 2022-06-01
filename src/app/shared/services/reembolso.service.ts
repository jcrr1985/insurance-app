import { BehaviorSubject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Chip, Reembolsos } from '../interfaces/interfaces';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async postConsignment (consignment: IConsignment): Promise<IResponseConsignment | null> {
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
      console.log('error', error)
      return null;
    }
  }



      public reembolsos: Reembolsos[] = [
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado:'$13.000',
            },
                  
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$23.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$20.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$40.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$40.000',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$25.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$5.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$30.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$30.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$53.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado: '$53.000',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$63.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$53.000',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$45.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$45.000',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$25.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$32.500',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.500',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$13.500',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$12.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado: '$12.000',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$100.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$80.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$50.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$50.000',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$21.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$15.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$15.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$41.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado: '$41.000',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$39.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$30.000',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$16.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$16.000',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$20.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$130.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$22.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$22.000',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado: '$13.000',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$10.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$7.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$35.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$35.000',
            },
            {
                  nombre: 'Leandro Letelier 28',
                  parentesco: 'Coyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$15.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$15.000',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$19.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
                  montoReembolsado: '$19.000',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$23.500',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
                  montoReembolsado: '$13.000',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.990',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
                  montoReembolsado: '$13.000',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$15.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$33.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
                  montoReembolsado: '$0',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$25.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
                  montoReembolsado: '$13.000',
            },
      ];

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
      getReembolsos(): Reembolsos[] {
            return this.reembolsos;
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
