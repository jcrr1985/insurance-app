import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../../interfaces/sso';
import { Usuario } from '../../interfaces/usuario';
import { IUsuario } from '../../interfaces/usuario-api';
import { Http } from '@capacitor-community/http';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {
  private _usuarioConectado!: Usuario;

  constructor(private http: HttpClient) { }

  async buscarData(rut: string): Promise<boolean> {
    var tokenData : Token = JSON.parse(localStorage.getItem("Token")!);

      const rutDv = rut.replace('-','');
      const options = {
        url: `${environment.URL_BFF_BASE}/client/${rutDv}/cargas`,
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'x-ibm-client-id': environment.X_IBM_CLIENT_ID
        },
      };
      const respuesta = await Http.request({ ...options, method: 'GET' });
      const dataPehuen = respuesta.data.data as IUsuario;

      const rutCuerpo = rut.split('.').join('').split('-')[0];
     //const rutDv = rut.split('.').join('').split('-')[1];
      this.usuarioConectado = new Usuario(dataPehuen, rutCuerpo, rutDv);
      console.log("usuarioConectado",this.usuarioConectado);
      if (this.usuarioConectado) {
        return true;
      } else {
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
