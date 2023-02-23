import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private products$ = new BehaviorSubject<Product[]>(this.products);

  baseUrl: string = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  public fetchProducts(): void {
    this.http.get<GetResponses>(this.baseUrl).pipe(
      map(response  => response.data),
      catchError(error => this.handleError(error))
    ).subscribe(
      data => {
        this.products = data;
        this.products$.next(this.products);
      }
    );
  }
  public getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  public setProducts(product: Product): void {
    this.products.push(product);
    this.products$.next(this.products);
  }

  public updateProducts(product: Product): void{
    let index: number = this.products.findIndex(item => item.id == product.id);
    this.products[index] = product;
    this.products$.next(this.products);
  }

  public getProductById(id: number | string): Observable<Product> {
    return this.http.get<GetResponse>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<GetResponse>(this.baseUrl, product).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  } 

  public updateProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<GetResponse>(`${this.baseUrl}/${id}`, product).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  public deleteProduct(id: number): any {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => console.log(response)),
      catchError(error => this.handleError(error))
    )
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = error.error.message;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
}

interface GetResponses {
  data: [];
}

interface GetResponse {
  data: Product;
}
