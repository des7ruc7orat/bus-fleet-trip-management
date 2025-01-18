import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FleetService {
  private getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found. Please log in.');
    }
    return token;
  }
  private readonly endpoint = 'http://localhost:3000/api/fleets';
  constructor(private http: HttpClient) {}

  /**
   * Fetch all fleets.
   * @returns Promise<any[]> - List of all fleets.
   */
  async getAllFleets(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(this.endpoint));
  }

  /**
   * Fetch a specific fleet by its ID.
   * @param id - The ID of the fleet to fetch.
   * @returns Promise<Fleet> - The fleet details.
   */
  async getFleetById(id: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.endpoint}/${id}`));
  }

  /**
   * Create a new fleet.
   * @param fleet - The fleet data to create.
   * @returns Promise<Fleet> - The created fleet.
   */
  async createFleet(fleet: Partial<any>): Promise<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return lastValueFrom(this.http.post<any>(this.endpoint, fleet, {headers}));
  }

  /**
   * Update an existing fleet.
   * @param id - The ID of the fleet to update.
   * @param fleet - The updated fleet data.
   * @returns Promise<fleet> - The updated fleet.
   */
  async updateFleet(id: string, fleet: Partial<any>): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.endpoint}/${id}`, fleet));
  }

  /**
   * Delete a fleet by its ID.
   * @param id - The ID of the fleet to delete.
   * @returns Promise<void> - Indicates successful deletion.
   */
  async deleteFleet(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.endpoint}/${id}`));
  }
}
