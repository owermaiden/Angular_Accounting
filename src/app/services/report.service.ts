import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { InvoiceProduct } from '../common/invoice-product';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl: string = 'http://localhost:8002/api/v1/reports';

  constructor(private http: HttpClient) { }

  public fetchStockData(): Observable<InvoiceProduct[]> {
    return this.http.get<GetResponses>(`${this.baseUrl}/stockData`).pipe(
      map(response => response.data)
    );
  }

  public fetchProfitLossData(): Observable<Map<string, number>> {
    return this.http.get<GetResponse>(`${this.baseUrl}/profitLossData`).pipe(
      map(response => response.data),
      tap(response => console.log(response))
    );
  }
}

interface GetResponses {
  data: [];
}

interface GetResponse {
  data: Map<string, number>;
}
