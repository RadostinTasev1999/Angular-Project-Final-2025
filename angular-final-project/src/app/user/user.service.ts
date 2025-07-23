import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_KEY = '[user]'
  user: UserForAuth | null = null;

  get isLoggedIn(): boolean{
    return !!this.user
  }

  constructor() {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser)
    } catch (error) {
      this.user = null;
    }
   }

  login(){

    this.user = {
      firstName: 'Radostin',
      lastName: 'Tasev',
      email: 'radostintasev22@yahoo.com',
      phoneNumber: '123-123-123',
      password: '123123123',
      _id: 'qwe645asd@jkw4412opq'
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }

}
