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
export class BusService {
  private getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found. Please log in.');
    }
    return token;
  }
  private readonly endpoint = 'http://localhost:3000/api/buses';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all buses.
   * @returns Promise<Bus[]> - List of all buses.
   */
  async getAllBuses(): Promise<Bus[]> {
    return lastValueFrom(this.http.get<Bus[]>(this.endpoint));
  }

  /**
   * Fetch a specific bus by its ID.
   * @param id - The ID of the bus to fetch.
   * @returns Promise<Bus> - The bus details.
   */
  async getBusById(id: string): Promise<Bus> {
    return lastValueFrom(this.http.get<Bus>(`${this.endpoint}/${id}`));
  }

  /**
   * Create a new bus.
   * @param bus - The bus data to create.
   * @returns Promise<Bus> - The created bus.
   */
  async createBus(bus: Partial<Bus>): Promise<Bus> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return lastValueFrom(this.http.post<Bus>(this.endpoint, bus, {headers}));
  }

  /**
   * Update an existing bus.
   * @param id - The ID of the bus to update.
   * @param bus - The updated bus data.
   * @returns Promise<Bus> - The updated bus.
   */
  async updateBus(id: string, bus: Partial<Bus>): Promise<Bus> {
    return lastValueFrom(this.http.put<Bus>(`${this.endpoint}/${id}`, bus));
  }

  /**
   * Delete a bus by its ID.
   * @param id - The ID of the bus to delete.
   * @returns Promise<void> - Indicates successful deletion.
   */
  async deleteBus(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.endpoint}/${id}`));
  }
}
