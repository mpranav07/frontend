import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:9595/';

  constructor(private http: HttpClient) { }

  authenticateUser(credentials) {

    return this.http.post(`${this.url}auth/login`, credentials);

  }
}
