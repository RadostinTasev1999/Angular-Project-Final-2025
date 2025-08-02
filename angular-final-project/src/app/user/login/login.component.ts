import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router){}

    onLogin(form:NgForm){
      if (form.invalid) {
          return;
      }
      const { email, password } = form.value

      this.userService.login(email,password).subscribe((user) => {
        console.log(`User ${user.username} has just logged in! `)
        this.router.navigate(['/home'])
      })
      
    }

}
