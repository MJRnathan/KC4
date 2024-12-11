import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(data:any):Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', data);
  }

  signin(data:any):Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', data);
  }

  getProfile():Observable<any> {
    let headers = {
      'Authorization':'Bearer ' + localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8080/auth/profile', {headers:headers})
  }

  forgotPassword(data: { email: any; }){
    return this.http.post<any>(`https://identity.googleapis.com/v1/accounts:send0obCode?key=[API_KEY]`,{
      requestType: 'PASSWORD_RESET',
      email:data.email
    })
  }
}

