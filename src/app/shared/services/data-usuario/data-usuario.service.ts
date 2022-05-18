import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService { 
  
  
  constructor(private http: HttpClient) { }

  buscarData(rut: string) {

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('ssoToken')}`)
      .set('x-ibm-client-id', ENV.X_IBM_CLIENT_ID);

      const rutSinDV = rut.split('.').join('').split('-')[0];

    return this.http.get(`${ENV.URL_BFF_BASE}/client/${rutSinDV}/cargas`, { headers: headers })

    );


  }
}
