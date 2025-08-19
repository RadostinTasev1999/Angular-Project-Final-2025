import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants'
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.minLength(5), Validators.required]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    phonenumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
    position: new FormControl('',[Validators.required, Validators.minLength(8)]),
    born: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    passGroup: new FormGroup(
      {

        password: new FormControl('',[Validators.required, Validators.minLength(5)]),

        rePassword: new FormControl('', [Validators.required])

      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')]
      }
  )
  })

  constructor(private userService: UserService, private router: Router){}

  onRegister(){
    
    if (this.registerForm.invalid) {
      return;
    }
    const {
      username,
      email,
      phonenumber,
      position,
      born,
      city,
      country,
      passGroup: {password, rePassword} = {}
    } = this.registerForm.value 
      
     this.userService.register(username!,email!,phonenumber!,position!,born!,city!,country!,password!,rePassword!).subscribe({
        next: (user) => {
          
         
         this.router.navigate(['/posts'])
        },
        error: (err) => {
          console.error('Registration failed:', err)
        }
     })
        
 
  }

  isFieldTextMissing(controlName:string){
    return (
      this.registerForm.get(controlName)?.touched 
                       && 
      this.registerForm.get(controlName)?.hasError('required')
    )
  }

  isNotMinLength(controlName: string){

    return(
      this.registerForm.get(controlName)?.touched
                      &&
      this.registerForm.get(controlName)?.hasError('minlength')
    )
  }

  get isEmailNotValid(){
    return (
      this.registerForm.get('email')?.touched 
                    &&
      this.registerForm.get('email')?.hasError('emailValidator')
    )
  }

  get passGroup(){
    return this.registerForm.get('passGroup')
  }

}
