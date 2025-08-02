import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.minLength(5), Validators.required]),
    email: new FormControl('', [Validators.minLength(5), Validators.required]),
    tel: new FormControl('', [Validators.required]),
    passGroup: new FormGroup({
        password: new FormControl('',[Validators.required, Validators.minLength(5)]),
        rePassword: new FormControl('', [Validators.required])
    })
  })

  constructor(private userService: UserService, private router: Router){}

  onRegister(){
    
    if (this.registerForm.invalid) {
      return;
    }
    const {
      email,
      tel,
      username,
      passGroup: {password, rePassword} = {}
    } = this.registerForm.value 
      debugger
     this.userService.register(email!,username!,tel!,password!,rePassword!).subscribe({
        next: (user) => {
          console.log('User registered!')
         this.router.navigate(['/posts'])
        },
        error: (err) => {
          console.error('Registration failed:', err)
        }
     })
        
 
  }

}
