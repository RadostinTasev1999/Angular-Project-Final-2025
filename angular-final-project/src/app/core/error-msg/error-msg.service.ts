import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  error: HttpErrorResponse | null = null

  public apiError$$ = new BehaviorSubject(this.error)
  public apiError$ = this.apiError$$.asObservable()

  setError(error:HttpErrorResponse): void{
    
   
    if (error.status === 401) {
      const message = error.error.message
      return  this.apiError$$.next(message)
    }else{
      return this.apiError$$.next(error)
    }
    
  }
}
