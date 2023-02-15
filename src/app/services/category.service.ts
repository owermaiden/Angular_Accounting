import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private categories$ = new BehaviorSubject<Category[]>(this.categories);

  baseUrl: string = 'http://localhost:8080/api/v1/categories';

  constructor(private http: HttpClient) { }

  public fetchCtegories(): void {
    this.http.get<GetResponseCats>(this.baseUrl).pipe(
      map(response  => response.data)
    ).subscribe(
      data => {
        this.categories = data;
        this.categories$.next(this.categories);
      }
    );
  }
  public getCategories(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  public setCategories(user: Category): void {
    this.categories.push(user);
    this.categories$.next(this.categories);
  }

  public updateCategories(category: Category): void{
    let index: number = this.categories.findIndex(item => item.id == category.id);
    this.categories[index] = category;
    this.categories$.next(this.categories);
  }

  public getUserById(id: number | string): Observable<Category> {
    return this.http.get<GetResponseCat>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  public createUser(category: Category): Observable<Category> {
    return this.http.post<GetResponseCat>(this.baseUrl, category).pipe(
      map(response => response.data)
    );
  } 

  public updateCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<GetResponseCat>(`${this.baseUrl}/${id}`, category).pipe(
      map(response => response.data)
    );
  }

  public deleteCategory(id: number): any {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => console.log(response))
    )
  }
}

interface GetResponseCats {
  data: [];
}

interface GetResponseCat {
  data: Category;
}
