import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
      map(response  => response.data)
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

  public setProducts(Product: Product): void {
    this.products.push(Product);
    this.products$.next(this.products);
  }

  public updateProducts(Product: Product): void{
    let index: number = this.products.findIndex(item => item.id == Product.id);
    this.products[index] = Product;
    this.products$.next(this.products);
  }

  public getProductById(id: number | string): Observable<Product> {
    return this.http.get<GetResponse>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  public createProduct(Product: Product): Observable<Product> {
    return this.http.post<GetResponse>(this.baseUrl, Product).pipe(
      map(response => response.data)
    );
  } 

  public updateProduct(Product: Product, id: number): Observable<Product> {
    return this.http.put<GetResponse>(`${this.baseUrl}/${id}`, Product).pipe(
      map(response => response.data)
    );
  }

  public deleteProduct(id: number): any {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => console.log(response))
    )
  }
}

interface GetResponses {
  data: [];
}

interface GetResponse {
  data: Product;
}
