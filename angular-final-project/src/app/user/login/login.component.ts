import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { emailValidator } from '../../utils/email.validator';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants'

@Component({
  selector: 'app-login',
  imports: [FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  domains = DOMAINS

  constructor(private userService: UserService, private router: Router){}

    onLogin(loginForm:NgForm){
      if (loginForm.invalid) {
          return;
      }
      const { email, password } = loginForm.value

      this.userService.login(email,password).subscribe((user) => {
        console.log(`User ${user.username} has just logged in! `)
        this.router.navigate(['/home'])
      })
      
    }

}
