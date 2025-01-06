import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  setUser(userData: any): void {
    this.user = userData;
  }

  getUser(): any {
    return this.user;
  }
}