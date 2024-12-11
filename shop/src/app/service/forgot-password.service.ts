import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
 private apiUrl = 'https://identity.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]';

  constructor(private http: HttpClient) { }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      requestType: 'PASSWORD_RESET',
      email: data.email
    });
  }
}
