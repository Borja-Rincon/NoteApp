import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private httpClient: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(`${this.apiUrl}/signup`, body);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(`${this.apiUrl}/login`, body);
  }
}