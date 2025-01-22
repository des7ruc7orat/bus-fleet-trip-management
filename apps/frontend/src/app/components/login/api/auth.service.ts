import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}
  private _isLoggedIn: WritableSignal<boolean> = signal(this.isTokenValid());

  // Getter to access the login state signal
  public get isLoggedIn(): WritableSignal<boolean> {
    return this._isLoggedIn;
  }
  login(loginData: { email: string; password: string }): Promise<any> {
    this._isLoggedIn.set(true);  // Update login status signal
    return this.http.post(`${this.apiUrl}/login`, loginData).toPromise();
  }

  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    this._isLoggedIn.set(false); // Update login status signal
    localStorage.removeItem('jwtToken');
  }
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }
}
