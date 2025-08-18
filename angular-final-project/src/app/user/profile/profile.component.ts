import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { UserForAuth } from '../../types/user';
import { ProfileDetails } from '../../types/profile';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UserService){}

  userDetails: ProfileDetails | null = null

  get firstName():string | undefined {

    return this.userService.username

  }
  
  isEditMode: boolean = false;

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    position: new FormControl('',[Validators.required]),
    born: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    phonenumber: new FormControl('',[Validators.required, Validators.minLength(11)])
  })

  ngOnInit(): void{
    
    console.log('User properties are:', this.userService.user)
    this.userDetails = this.userService.user
    debugger
    if (this.userDetails) {
      debugger
      this.profileForm.patchValue(this.userDetails)
    }

  }

  
  toggleEditMode(){
    debugger
    this.isEditMode = !this.isEditMode
  }

  onEdit(){
    this.toggleEditMode()
  }

  onSubmit(){
    if (this.profileForm.invalid) {
        return;
    }

    // const {
    //   username,
    //   position,
    //   born,
    //   city,
    //   country,
    //   email,
    //   phoneNumber
    // } = this.profileForm.value
  debugger
    this.userDetails = this.profileForm?.value as ProfileDetails
    console.log('userDetails are:', this.userDetails)
    this.toggleEditMode()

  }

  onCancel(){
    this.toggleEditMode()
  }


}