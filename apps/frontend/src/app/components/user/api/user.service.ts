import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'http://localhost:3000/api/users'; // Endpoint to fetch users (drivers)

  constructor(private http: HttpClient) {}

  getUsers(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.endpoint}`));
  }
  async getUserById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.endpoint}/${id}`));
  }
}
