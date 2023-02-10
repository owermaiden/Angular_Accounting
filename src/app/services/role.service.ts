import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Role } from '../common/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<Role[]> {
    return this.http.get<GetResponseRoles>(this.baseUrl).pipe(
      tap(response => console.log(response)),
      map(response => response.data)
    );
  }
}


interface GetResponseRoles {
  data: [];
}
