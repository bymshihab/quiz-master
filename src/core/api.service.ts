import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = API_URL;

  constructor(private http: HttpClient) {}

  // Get all records for a specific endpoint and model type
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${endpoint}`).pipe(
      tap((response) => {
        //console.log('Fetched Data:', response); // Log the fetched data inside the service
      }),
      catchError(this.handleError) // Error handling
    );
  }

  // Get a single record by ID for a specific endpoint and model type
  // getById<T>(endpoint: string, id: number): Observable<T> {
  //   return this.http.get<T>(`${this.baseUrl}${endpoint}/${id}`).pipe(
  //     tap((response) => {
  //       console.log('dhukche...');

  //       console.log('Fetched Data details:', response); // Log the fetched data inside the service
  //     }),
  //     tap(() => {
  //       console.log('dhukche...', this.handleError);
  //     }),
  //     catchError(this.handleError) // Error handling
  //   );
  // }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}/${id}`).pipe(
      tap((response) => {
        console.log('Fetching data from endpoint...');
        console.log('Fetched Data details:', response); // Log the fetched data
      }),
      catchError((error) => {
        console.error('Error occurred while fetching data:', error); // Log the error
        return throwError(() => error); // Re-throw the error
      })
    );
  }

  // Create a new record for a specific endpoint and model type
  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      catchError(this.handleError) // Error handling
    );
  }

  // Update a record by ID for a specific endpoint and model type
  update<T>(endpoint: string, id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}/${id}`, data).pipe(
      catchError(this.handleError) // Error handling
    );
  }

  // Delete a record by ID for a specific endpoint and model type
  delete<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}/${id}`).pipe(
      catchError(this.handleError) // Error handling
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); // Log the error
    throw error; // Re-throw the error
  }
}
