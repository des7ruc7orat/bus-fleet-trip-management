import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Bus {
  id: string;
  name: string;
  capacity: number;
  [key: string]: any; // Add additional fields as needed
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found. Please log in.');
    }
    return token;
  }
  private readonly endpoint = 'http://localhost:3000/api/addresses';
  constructor(private http: HttpClient) {}

  /**
   * Fetch all buses.
   * @returns Promise<any[]> - List of all buses.
   */
  async getAllAddresses(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(this.endpoint));
  }

  /**
   * Fetch a specific bus by its ID.
   * @param id - The ID of the bus to fetch.
   * @returns Promise<Fleet> - The bus details.
   */
  async getAddressById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.endpoint}/${id}`));
  }

  /**
   * Create a new fleet.
   * @param fleet - The fleet data to create.
   * @returns Promise<Fleet> - The created fleet.
   */
  async createAddress(fleet: Partial<any>): Promise<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return lastValueFrom(this.http.post<any>(this.endpoint, fleet, {headers}));
  }

  /**
   * Update an existing bus.
   * @param id - The ID of the bus to update.
   * @param bus - The updated bus data.
   * @returns Promise<fleet> - The updated bus.
   */
  async updateAddress(id: string, fleet: Partial<any>): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.endpoint}/${id}`, fleet));
  }

  /**
   * Delete a bus by its ID.
   * @param id - The ID of the bus to delete.
   * @returns Promise<void> - Indicates successful deletion.
   */
  async deleteAddress(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.endpoint}/${id}`));
  }
}
