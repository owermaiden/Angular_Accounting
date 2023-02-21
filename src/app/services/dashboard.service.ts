import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Currency } from '../common/currency';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  public fetchSummaryNumbers(): Observable<Map<string, number>> {
    return this.http.get<GetResponseMap>(`${this.baseUrl}/summary`).pipe(
      map(response => response.data),
      tap(response => console.log(response))
    );
  }

  public fetchEchangeData(): Observable<Currency> {
    return this.http.get<GetResponse>(`${this.baseUrl}/exchange`).pipe(
      map(response => response.data),
      tap(response => console.log(response))
    );
  }


}

interface GetResponse {
  data: Currency;
}

interface GetResponseMap {
  data: Map<string, number>;
}

