import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../../interfaces/sso';
import { Usuario } from '../../interfaces/usuario';
import { IUsuario } from '../../interfaces/usuario-api';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {
  private _usuarioConectado!: Usuario;

  constructor(private http: HttpClient) { }

  async InsuredData(rut: string): Promise<boolean> {
    var tokenData : Token = JSON.parse(localStorage.getItem("Token")!);

      const RutDv = rut.replace('-','');
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

  public get usuarioConectado(): Usuario {
    return this._usuarioConectado;
  }

  public set usuarioConectado(usuario: Usuario) {
    this._usuarioConectado = usuario;
  }
}
