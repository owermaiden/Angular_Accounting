import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<GetResponseUsers>(this.baseUrl).pipe(
      map(response => response.data.users)
    );
  }
  

}

interface GetResponseUsers {
  data: {
    users: User[];
  }
}
