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
    debugger
    console.log('Error in error-msg.service.ts is', error)
    this.apiError$$.next(error)
  }
}
