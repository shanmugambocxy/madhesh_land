import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService, User } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  private _currentUserSubject: BehaviorSubject<any>;

  constructor(private router: Router, private authService: AuthenticationService) {

    // this._currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());

  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.authService.isUserLoggedIn) {

  //     localStorage.removeItem('CurrentUser');
  //     this._currentUserSubject.next(null);
  //     let username = sessionStorage.getItem('username');
  //     (this.authService.authenticatelogout(username).subscribe(
  //       data => { },
  //       error => { }));
  //     return true;

  //   }
  //   this.router.navigate(['/']);

  //   return false;
  // }
  // private getUserFromLocalStorage(): User {
  //   try {
  //     return JSON.parse(localStorage.getItem('CurrentUser')!);
  //   } catch (error) {
  //     return null!;
  //   }
  // }

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}






