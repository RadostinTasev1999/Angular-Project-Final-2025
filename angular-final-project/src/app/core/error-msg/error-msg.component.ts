import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-msg',
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit {

  error: string | undefined = undefined

  constructor(private errorMsgService: ErrorMsgService){}

  ngOnInit(): void {
      this.errorMsgService.apiError$.subscribe((err:HttpErrorResponse | null ) => {
        
        
        this.error = err?.message
      })
  }

}
