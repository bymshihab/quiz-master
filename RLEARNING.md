# Learning

## API request

`  // Get all records for a specific endpoint and model type
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(this.handleError) // Error handling
    );
  }`

In the provided code, the `getAll` method sends an HTTP GET request to retrieve data from an API endpoint. It returns an observable of type `T[]`, which represents an array of the model type `T`. The method uses the `pipe()` function to chain operators, with `catchError(this.handleError)` handling any errors that occur during the request. The `catchError` operator ensures that if an error happens, the `handleError` method is invoked to handle the error (like logging or showing a user-friendly message).

In short:

- `http.get<T[]>(...)` sends the GET request.
- `pipe()` is used to apply operators like `catchError`.
- `catchError` handles any errors during the API request.
