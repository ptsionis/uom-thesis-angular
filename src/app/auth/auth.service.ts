import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8000/auth/is-authenticated';

  constructor(private http: HttpClient) { }

  checkIfAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(this.authUrl, { withCredentials: true })
      .pipe(
        map(response => response.isAuthenticated),
        catchError(error => {
          console.error("Authentication error:", error);
          return [false];
        })
      );
  }
}
