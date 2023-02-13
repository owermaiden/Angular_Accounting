import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<GetResponseUsers>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }

  public getUserById(id: number | string): Observable<User> {
    return this.http.get<GetResponseUser>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  public createUser(user: User): Observable<User[]> {
    return this.http.post<GetResponseUsers>(this.baseUrl, user).pipe(
      map(response => response.data)
    );
  } 

  public deleteUser(id: number): any {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => console.log(response))
    )
  }
  

}

interface GetResponseUsers {
  data: [];
}

interface GetResponseUser {
  data: User;
}
