import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) { }

  getAll() {
    return [
      { id: '/data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' },
      { id: 'data/dotnet.json', name: 'Dot Net Interview Questions' }
    ];
  }
  get(url: string) {
    return this.http.get(url);
  }
  public handleError(error: any): Promise<never> {
    if (error.status === 401) {
      //
    } else if (error.status === 400) {
      //
    }
    return Promise.reject(error);
  }
}
