import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { IUsuario } from '../../interfaces/usuario-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService { 
  private _usuarioConectado: Usuario;

  constructor(private http: HttpClient) { }

  async autenticacion(rut: string): Promise<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('ssoToken')}`)
      .set('x-ibm-client-id', ENV.X_IBM_CLIENT_ID);
    

    const rutSinDV = this.rut.split('.').join('').split('-')[0]
    try {
      const usuarioLogueado = (
        await this.http
          .get<IUsuario>(`${ENV.URL_BFF_BASE}/client/${rutSinDV}/cargas`, { headers: headers })
          .toPromise()
      )['data'];

      const rutCuerpo = rut.split('.').join('').split('-')[0];
      const rutDv = rut.split('.').join('').split('-')[1];
      this.usuarioConectado = new Usuario(usuarioLogueado, rutCuerpo, rutDv);

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
