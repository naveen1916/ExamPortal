import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
token
  constructor(private http: HttpClient) { 
     this.token=localStorage.getItem('token')
  }
  
  getCharacters() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization',`Bearer ${this.token}`)
    return this.http.get(`${environment.url}api/users/`,{ headers :headers});
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
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization',`Bearer ${this.token}`)
    return this.http.post(`${environment.url}api/users/addfromexcel`, data,{headers:headers});
  }
}
