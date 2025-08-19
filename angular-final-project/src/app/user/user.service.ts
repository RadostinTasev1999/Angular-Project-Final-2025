import { Injectable, OnInit } from '@angular/core';
// import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { tap, Subscription } from 'rxjs'
import { UserForAuth } from '../types/user';
import { count } from 'console';
//import { environment } from '../environment/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService{

  private user$$ = new BehaviorSubject<UserForAuth | null>(null)
  user$ = this.user$$.asObservable()

  USER_KEY = '[user]'
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  

  constructor(private http: HttpClient) {
    
    if (typeof window !== 'undefined' && window.localStorage) {
       
      const localStorageUser = localStorage.getItem(this.USER_KEY)
        
        if (localStorageUser) {
          try {
            
          const user = JSON.parse(localStorageUser) as UserForAuth
          
          this.user$$.next(user)
        } catch (error) {
          console.error('Error parsing user from localStorage', error)
          localStorage.removeItem(this.USER_KEY)
        }
    }

    }
      this.user$.subscribe((user) => {
        
        this.user = user
       
    })
  }

  get isLoggedIn(): boolean{

    return !!this.user
  }

  // get userId():string | undefined{

  //   return this.user?._id
  // }

  get username():string | undefined{

    return this.user?.username

  }

  getUser(userId:string | undefined) {

    const API = '/api'
   
    
    return this.http.get<UserForAuth>(`${API}/users/${userId}`)

  }

  

 

  login(email: string, password: string){
    
    const API = '/api'

    return this.http.post<UserForAuth>(`${API}/users/login`, { email, password })
           .pipe(
              tap(user => {
                
                localStorage.setItem(this.USER_KEY,JSON.stringify(user))
                
                this.user$$.next(user)
              })
           )
    
  }

  register(username:string, email: string, phonenumber: string, position: string, born: string, city: string,country: string,password: string, rePassword: string){

    const payload = { 
      username,
      email,
      phonenumber,
      position,
      born,
      city,
      country,
      password,
      rePassword
    }

    const API = '/api'
    // 
    return this.http.post<UserForAuth>(`${API}/users/register`, payload)
              .pipe(tap(user => {
               
                this.user$$.next(user)
              }))
              
  }

  logout(){
    const API = '/api'
    
    return this.http.post(`${API}/users/logout`,{})
            .pipe(
              tap(
                () => {
                  localStorage.removeItem(this.USER_KEY)
                  this.user$$.next(null)
                } 
              )
            )
  }

}
