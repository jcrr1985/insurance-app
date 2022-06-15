import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../../interfaces/sso';
import { Usuario } from '../../interfaces/usuario';
import { IUsuario } from '../../interfaces/usuario-api';
import Utils from '../../utils/utils';
import { IClaims } from '../../interfaces/IClaim';
import { Historico } from '../../models/historico';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {
  private _usuarioConectado!: Usuario;

  constructor(private http: HttpClient) { }

  async InsuredData(rut: string): Promise<boolean> {
    var tokenData: Token = JSON.parse(localStorage.getItem("Token")!);

    const RutDv = rut.replace('-', '');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${tokenData.access_token}`)
      .set('x-ibm-client-id', environment.X_IBM_CLIENT_ID);

    try {
      const usuarioConectado = (
        await this.http
          .get<any>(`${environment.URL_BFF_BASE}/client/${RutDv}/cargas`, { headers: headers })
          .toPromise()
      )['data'];

      const rutCuerpo = rut.split('.').join('').split('-')[0];
      const dv = rut.split('.').join('').split('-')[1];

      this.usuarioConectado = new Usuario(usuarioConectado, rutCuerpo, dv);

      if (this.usuarioConectado) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  async getReimbursements(page: number = 1, offset: number = 10) {
    const fechas = Utils.generarFecha();

    const tokenData: Token = JSON.parse(localStorage.getItem("Token")!);
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${tokenData.access_token}`)
      .set('x-ibm-client-id', environment.X_IBM_CLIENT_ID);

    try {
      const historialReembolso = await this.http.get<IClaims>(
        `${environment.URL_BFF_BASE}/BFF/History/insured/${this.usuarioConectado.rutCuerpo}${this.usuarioConectado.rutDigitoVerificador}/policy/${this.usuarioConectado.poliza}?StarDate=${fechas[0]}&EndDate=${fechas[1]}&Page=${page}&Offset=${offset}`,
        { headers: header }).toPromise();

      let historialCompleto: Historico[] = [];
      historialReembolso.claims.forEach((reembolso) => {
        historialCompleto.push(new Historico(reembolso));
      })

      this.usuarioConectado.historial = historialCompleto;
      this.usuarioConectado.Pagination = historialReembolso.pagination;
      console.log(this.usuarioConectado.historial);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  /**
   * 
   * @param page numero de la pagina
   * @param offset numero de registros por pagina
   */
  public async getHistorialReemboslo(page: number, offset: number): Promise<any> {
    const fechas = Utils.generarFecha();

    const tokenData: Token = JSON.parse(localStorage.getItem("Token")!);
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${tokenData.access_token}`)
      .set('x-ibm-client-id', environment.X_IBM_CLIENT_ID);
    try {
      const url = `${environment.URL_BFF_BASE}/BFF/History/insured/${this.usuarioConectado.rutCuerpo}${this.usuarioConectado.rutDigitoVerificador}/policy/${this.usuarioConectado.poliza}?StarDate=${fechas[0]}&EndDate=${fechas[1]}&Page=${page}&Offset=${offset}`;
      console.log("url de la peticion", url);
      const historialReembolso = await this.http.get<IClaims>(url, { headers: header }).toPromise();
      let historialCompleto: Historico[] = [];
      historialReembolso.claims.forEach((reembolso) => {
        historialCompleto.push(new Historico(reembolso));
      })
      return historialCompleto;
    } catch (error) {
      console.log("error en la peticion", error);
      return [];
    }
  }

  public get usuarioConectado(): Usuario {
    return this._usuarioConectado;
  }

  public set usuarioConectado(usuario: Usuario) {
    this._usuarioConectado = usuario;
  }
}
