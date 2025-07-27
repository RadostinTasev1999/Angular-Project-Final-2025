import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$$ = new BehaviorSubject(null)
  user$ = this.user$$.asObservable()

  USER_KEY = '[user]'
  user: UserForAuth | null = null;

  get isLoggedIn(): boolean{
    return !!this.user
  }

  constructor(private http: HttpClient) {}

  login(){
    const url = 'http://localhost:3000'

    this.user = {
      firstName: 'Radostin',
      lastName: 'Tasev',
      email: 'radostintasev22@yahoo.com',
      phoneNumber: '123-123-123',
      password: '123123123',
      _id: 'qwe645asd@jkw4412opq'
    }
    
  }

  register(email: string, username: string, tel: string, password: string, rePassword: string){
debugger
    const payload = { 
      email,
      username,
      tel,
      password,
      rePassword
    }

    const url = 'http://localhost:3000'
debugger
    return this.http.post(`${url}/users/register`, payload).pipe(
      catchError( error => {
        return throwError(error)
      })

    )
              
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }

}
