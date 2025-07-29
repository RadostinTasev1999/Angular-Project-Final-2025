import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';

@Component({
  selector: 'app-error-msg',
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit {

  errorMsg = signal('')

  constructor(private errorMsgService: ErrorMsgService){}

  ngOnInit(): void {
      this.errorMsgService.apiError$.subscribe((err:any) => {
          this.errorMsgService.setError(err?.message)
      })
  }

}
