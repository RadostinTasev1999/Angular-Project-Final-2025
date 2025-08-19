import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { emailValidator } from '../../utils/email.validator';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants'
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';
import { signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  domains = DOMAINS

  value: HttpErrorResponse | null = null
  errorMsg = signal(this.value)
  authError: boolean = false;

  constructor(private userService: UserService, private router: Router, private errorMsgService: ErrorMsgService){}

  ngOnInit(): void {
    
   
    if (!this.authError) {    
      this.errorMsgService.apiError$.subscribe((err) => {
          
          if (err) {
            this.errorMsg.set(err)
            this.authError = true
            this.errorMsgService.apiError$$.next(null)
          }     
      })
      // this.errorMsgService.apiError$$.next(null)
    }
      
  }

    onLogin(loginForm:NgForm){
      if (loginForm.invalid) {
          return;
      }
      const { email, password } = loginForm.value

      this.userService.login(email,password).subscribe((response) => {
       
        this.router.navigate(['/home'])
      })
      
    }


}
