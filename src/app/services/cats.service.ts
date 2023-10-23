import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  baseUrl: string = 'http://localhost:8002/api/v1/categories';

  constructor(private http: HttpClient) { }

  getCats(): Observable<Category[]> {
    return this.http.get<GetResponseCats>(this.baseUrl)
      .pipe(
        map(response  => response.data),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getCategory(id: number): Observable<Category>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<GetResponseCat>(url).pipe(
      map(response => response.data),
      catchError(this.handleError<Category>(`getCat id=${id}`))
    );
  }
  

  addCat(category: Category): Observable<Category> {
    return this.http.post<GetResponseCat>(this.baseUrl, category).pipe(
      map(response => response.data),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  deleteCat(id: number): Observable<Category> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<GetResponseCat>(url).pipe(
      map(response => response.data),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  updateCat(category: Category, id: number): Observable<Category> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<GetResponseCat>(url, category).pipe(
      map(response => response.data),
      catchError(this.handleError<Category>('updateCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

interface GetResponseCats { // get all categories
  data: [];
}

interface GetResponseCat { // get all categories
  data: Category;
}
