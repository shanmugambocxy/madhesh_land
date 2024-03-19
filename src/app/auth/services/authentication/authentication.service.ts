import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserVal(): any {
    return this._currentUserSubject.value;
  }

  get isUserLoggedIn() {
    return this.currentUserVal;
  }
  constructor(private httpClient: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
    this.currentUser = this._currentUserSubject.asObservable();
  }

  authenticate(username: any, password: any) {
    return this.httpClient.post<any>('http://localhost:5000/api/login', { username, password });
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logOut() {
    sessionStorage.clear()
    localStorage.removeItem('CurrentUser');
    this._currentUserSubject.next(null);
  }

  private getUserFromLocalStorage(): User {
    try {
      return JSON.parse(localStorage.getItem('CurrentUser')!);
    } catch (error) {
      return null!;
    }
  }

  authenticatelogout(username: any) {

    return this.httpClient.post<any>('http://localhost:5000/api/logout', { username }).pipe(
      map(userData => {
        return userData;
      })
    );
  }


}
