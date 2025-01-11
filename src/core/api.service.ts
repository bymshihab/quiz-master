import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = API_URL;

  constructor(private http: HttpClient) {}

  // Get all records for a specific endpoint
  getAll(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${endpoint}`);
  }

  // Get a single record by ID for a specific endpoint
  getById(endpoint: string, id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${endpoint}/${id}`);
  }

  // Create a new record for a specific endpoint
  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, data);
  }

  // Update a record by ID for a specific endpoint
  update(endpoint: string, id: number | string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${endpoint}/${id}`, data);
  }

  // Delete a record by ID for a specific endpoint
  delete(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${endpoint}/${id}`);
  }
}
