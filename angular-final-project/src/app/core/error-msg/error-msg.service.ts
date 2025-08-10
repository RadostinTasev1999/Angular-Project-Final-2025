import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  private apiError$$ = new BehaviorSubject(null)
  public apiError$ = this.apiError$$.asObservable()

  setError(error:any): void{
    debugger
    this.apiError$$.next(error)
  }
}
