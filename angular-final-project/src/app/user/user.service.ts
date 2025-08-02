import { Injectable, OnInit } from '@angular/core';
// import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { tap, Subscription } from 'rxjs'
import { UserForAuth } from '../types/user';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private user$$ = new BehaviorSubject<UserForAuth | null>(null)
  user$ = this.user$$.asObservable()

  USER_KEY = '[user]'
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;


  get isLoggedIn(): boolean{
  //  console.log('User is:', this.user)
    return !!this.user
  }

  get userId():string | undefined{

    return this.user?._id
  }

  get username():string | undefined{

    return this.user?.username

  }

  constructor(private http: HttpClient) {
     this.user$.subscribe(user => {
      this.user = user;
    })
  }

 

  login(email: string, password: string){
    
    const API = '/api'

    return this.http.post<UserForAuth>(`${API}/users/login`, { email, password })
           .pipe(tap((user) => this.user$$.next(user)))
    
  }

  register(email: string, username: string, tel: string, password: string, rePassword: string){

    const payload = { 
      email,
      username,
      tel,
      password,
      rePassword
    }

    const API = '/api'
    // debugger
    return this.http.post<UserForAuth>(`${API}/users/register`, payload)
              .pipe(tap(user => {
                console.log('User is:', user)
                this.user$$.next(user)
              }))
              
  }

  logout(){
    const API = '/api'
    
    return this.http.post(`${API}/users/logout`,{})
            .pipe(tap(() => this.user$$.next(null)))
  }

}
