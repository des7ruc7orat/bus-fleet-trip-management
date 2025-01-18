import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'api/v1/users'; // Endpoint to fetch users (drivers)

  constructor(private http: HttpClient) {}

  getUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${query}`);
  }
}
