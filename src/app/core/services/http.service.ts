import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }
  post(url, data) {
    console.log(' data');
    console.log(data);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(url, data, { headers });
  }
  get(url) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(url, { headers });
  }

  put(url, data) {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put(url, data, { headers });

  }
  delete(url, data) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.delete(url + data, { headers });

  }
}
