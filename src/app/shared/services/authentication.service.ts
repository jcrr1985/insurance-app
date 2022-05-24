import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/sso';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private UrlSSO = environment.URL_SSO;

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) { }

  public identify(code: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('client_id', 'vs-web-salud');
    body.set('redirect_uri', `${this.document.location.origin}/reembolso`);
    body.set('scope', 'openid profile User');
    return this.httpClient.post<any>(`${this.UrlSSO}/token`, body.toString(), httpOptions)
  }

  public getToken(username : string , password : string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username.replace('.', '').replace('.', ''));
    body.set('password', password);
    body.set('client_id', 'vs-web-salud');

    return this.httpClient.post<Token>(
            `${this.UrlSSO}/token`,
            body.toString(),
            httpOptions
          );
  }

}
