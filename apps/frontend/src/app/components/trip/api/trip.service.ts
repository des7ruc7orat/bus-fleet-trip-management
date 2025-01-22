import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly endpoint = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all trips.
   * @returns Promise<any[]> - List of all trips.
   */
  async getAll(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(this.endpoint));
  }

  /**
   * Fetch a specific trip by its ID.
   * @param id - The ID of the trip to fetch.
   * @returns Promise<any> - The trip details.
   */
  async getById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.endpoint}/${id}`));
  }

  /**
   * Create a new trip.
   * @param truos - The trip data to create.
   * @returns Promise<any> - The created trip.
   */
  async create(trip: Partial<any>): Promise<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return lastValueFrom(this.http.post<any>(this.endpoint, trip, { headers }));
  }

  /**
   * Update an existing trip.
   * @param id - The ID of the bus to update.
   * @param bus - The updated bus data.
   * @returns Promise<Trip> - The updated bus.
   */
  async update(id: string, trip: Partial<any>): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.endpoint}/${id}`, trip));
  }

  /**
   * Delete a trip by its ID.
   * @param id - The ID of the bus to delete.
   * @returns Promise<void> - Indicates successful deletion.
   */
  async delete(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.endpoint}/${id}`));
  }

  private getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found. Please log in.');
    }
    return token;
  }
}
