import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Company } from '../common/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:8002/api/v1/companies/2';

  constructor(private http: HttpClient) { }

  public getCompanyById(): Observable<Company> {
    return this.http.get<GetResponseCompany>(this.baseUrl).pipe(
      tap(response => console.log(response)),
      map(response => response.data)
    );
  }


}

interface GetResponseCompany {
  data: any;
}
