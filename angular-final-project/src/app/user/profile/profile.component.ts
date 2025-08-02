import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { UserForAuth } from '../../types/user';
import { ProfileDetails } from '../../types/profile';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UserService){}

  get firstName():string | undefined {

    return this.userService.username

  }

  userData: ProfileDetails = {
      username: 'Tasev',
      position: 'Web Developer',
      born: '04/19/1999',
      city: 'Sofia',
      country: 'Bulgaria',
      email: 'tasev@gmail.com',
      phoneNumber: '123-123-123'
  }
  
  isEditMode: boolean = false;

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    position: new FormControl('',[Validators.required]),
    born: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('',[Validators.required])
  })

  ngOnInit(): void{
    this.profileForm.patchValue(this.userData)
  }

  
  toggleEditMode(){
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

    this.userData = this.profileForm?.value as ProfileDetails

    this.toggleEditMode()

  }

  onCancel(){
    this.toggleEditMode()
  }


}
