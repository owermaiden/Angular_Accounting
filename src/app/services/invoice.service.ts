import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Invoice } from '../common/invoice';
import { InvoiceProduct } from '../common/invoice-product';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private saleInvoices: Invoice[] = [];
  private saleInvoices$ = new BehaviorSubject<Invoice[]>(this.saleInvoices);

  private purchaseInvoices: Invoice[] = [];
  private purchaseInvoices$ = new BehaviorSubject<Invoice[]>(this.purchaseInvoices);

  baseUrl: string = 'http://localhost:8080/api/v1/invoices';

  constructor(private http: HttpClient) { }

  public fetchInvoices(type: string): void {
    this.http.get<GetResponses>(`${this.baseUrl}/get/${type}`).pipe(
      map(response  => response.data)
    ).subscribe(
      data => {
        if(type === 'SALE'){
          this.saleInvoices = data;
          this.saleInvoices$.next(this.saleInvoices);
        } else {
          this.purchaseInvoices = data;
          this.purchaseInvoices$.next(this.purchaseInvoices);
        }
        
      }
    );
  }
  public getInvoices(type: string): Observable<Invoice[]> {
      return type === 'SALE' ? this.saleInvoices$.asObservable(): this.purchaseInvoices$.asObservable(); 
  }

  public setInvoices(invoice: Invoice): void {
    if(invoice.invoiceType === 'SALE'){
      this.saleInvoices.push(invoice);
      this.saleInvoices$.next(this.saleInvoices);
    } else{
      this.purchaseInvoices.push(invoice);
      this.purchaseInvoices$.next(this.purchaseInvoices);
    }
    
  }

  public updateInvoices(invoice: Invoice): void{
    if(invoice.invoiceType === 'SALE'){
      let index: number = this.saleInvoices.findIndex(item => item.id == invoice.id);
      this.saleInvoices[index] = invoice;
      this.saleInvoices$.next(this.saleInvoices);
    } else{
      let index: number = this.purchaseInvoices.findIndex(item => item.id == invoice.id);
      this.purchaseInvoices[index] = invoice;
      this.purchaseInvoices$.next(this.purchaseInvoices);
    }
    
  }

  public getInvoiceById(id: number | string): Observable<Invoice> {
    return this.http.get<GetResponse>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  public createInvoice(invoice: Invoice, type: string): Observable<Invoice> {
    return this.http.post<GetResponse>(`${this.baseUrl}/create/${type}`, invoice).pipe(
      map(response => response.data),
      tap(data => console.log(data))
    );
  } 

  public createInvoiceProducts(id: number, iProduct: InvoiceProduct ): Observable<InvoiceProduct> {
    return this.http.post<GetInvProResponse>(`${this.baseUrl}/invoice-product/${id}`, iProduct).pipe(
      map(response => response.data),
      tap(data => console.log(data))
    )
  }

  public updateInvoice(invoice: Invoice, id: number): Observable<Invoice> {
    return this.http.put<GetResponse>(`${this.baseUrl}/${id}`, invoice).pipe(
      map(response => response.data)
    );
  }

  public deleteInvoice(id: number): any {
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
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
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
  data: Invoice;
}

interface GetInvProResponse {
  data: InvoiceProduct;
}
