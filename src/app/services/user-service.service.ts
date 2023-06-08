import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users: User[] = [];
  private user$ = new BehaviorSubject<User[]>(this.users);

  private baseUrl = 'http://localhost:8002/api/v1/users';

  constructor(private http: HttpClient) { }

  public fetchUsers(): void {
    this.http.get<GetResponseUsers>(this.baseUrl).pipe(
      map(response  => response.data),
      tap(response => console.log(response)),
      catchError(error => this.handleError(error))
    ).subscribe(
      data => {
        this.users = data;
        this.user$.next(this.users);
      }
    );
  }

  public getUsers(): Observable<User[]> {
    return this.user$.asObservable();
  }

  public setUsers(user: User): void {
    this.users.push(user);
    this.user$.next(this.users);
  }

  public updateUsers(user: User): void{
    let index: number = this.users.findIndex(item => item.id == user.id);
    this.users[index] = user;
    this.user$.next(this.users);
  }

  public getUserById(id: number | string): Observable<User> {
    return this.http.get<GetResponseUser>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<GetResponseUser>(this.baseUrl, user).pipe(
      map(response => response.data),
      tap(user => console.log(user)),
      catchError(error => this.handleError(error))
    );
  } 

  public updateUser(user: User, id: number): Observable<User> {
    return this.http.put<GetResponseUser>(`${this.baseUrl}/${id}`, user).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error))
    );
  }

  public deleteUser(id: number): any {
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
    return throwError(() => {
        return errorMessage;
    });
  }
  
}

interface GetResponseUsers {
  data: [];
}

interface GetResponseUser {
  data: User;
}
