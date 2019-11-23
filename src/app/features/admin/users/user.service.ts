import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getCharacters() {
    return this
      .http
      .get(`${environment.url}user/`);
  }
  
  authenticateuser(data){
    return this.http.post(`${environment.url}user/users/me`, data);
  }
  createnewuser(data){
    
    return this.http.post(`${environment.url}api/users/`, data);
  }
  userlogin(data){
    console.log(data)
    return this.http.post(`${environment.url}auth/local`, data);
  }
  addusersfromexcel(data){
    return this.http.post(`${environment.url}user/users/addfromexcel`, data);
  }
}
