import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {


  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
    // return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  // private _localStorageService: LocalStorageService
  constructor(private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageService
    ) {}

  login(user: User) {
    // if (user.email !== '' && user.password !== '' ) {
    // if (user.email === 'demo' && user.password === 'demo' ) {
    if (user.email !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    } else {
      alert ('Invalid username or password');
    }
    // localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    // localStorage.removeItem('ACCESS_TOKEN');
  }

  isAuthenticated(): boolean {
    if (this.localStorage.get('isLoggedIn')) {
      return true;
    } else {
      return false;
    }
  }


}
