import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ClientVendor } from '../common/client-vendor';

@Injectable({
  providedIn: 'root'
})
export class ClientVendorService {

  private clientVendors: ClientVendor[] = [];
  private clientVendors$ = new BehaviorSubject<ClientVendor[]>(this.clientVendors);

  baseUrl: string = 'http://localhost:8080/api/v1/clientVendors';

  constructor(private http: HttpClient) { }

  public fetchClientVendors(): void {
    this.http.get<GetResponses>(this.baseUrl).pipe(
      map(response  => response.data)
    ).subscribe(
      data => {
        this.clientVendors = data;
        this.clientVendors$.next(this.clientVendors);
      }
    );
  }
  public getClientVendors(): Observable<ClientVendor[]> {
    return this.clientVendors$.asObservable();
  }

  public setClientVendors(ClientVendor: ClientVendor): void {
    this.clientVendors.push(ClientVendor);
    this.clientVendors$.next(this.clientVendors);
  }

  public updateClientVendors(ClientVendor: ClientVendor): void{
    let index: number = this.clientVendors.findIndex(item => item.id == ClientVendor.id);
    this.clientVendors[index] = ClientVendor;
    this.clientVendors$.next(this.clientVendors);
  }

  public getClientVendorById(id: number | string): Observable<ClientVendor> {
    return this.http.get<GetResponse>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  public createClientVendor(ClientVendor: ClientVendor): Observable<ClientVendor> {
    return this.http.post<GetResponse>(this.baseUrl, ClientVendor).pipe(
      map(response => response.data)
    );
  } 

  public updateClientVendor(clientVendor: ClientVendor, id: number): Observable<ClientVendor> {
    return this.http.put<GetResponse>(`${this.baseUrl}/${id}`, clientVendor).pipe(
      map(response => response.data)
    );
  }

  public deleteClientVendor(id: number): any {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => console.log(response))
    )
  }

}

interface GetResponses {
  data: [];
}

interface GetResponse {
  data: ClientVendor;
}
