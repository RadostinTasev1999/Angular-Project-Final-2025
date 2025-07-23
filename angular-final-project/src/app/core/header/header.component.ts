import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService: UserService){}

  get isLoggedIn():boolean{
      
    return this.userService.isLoggedIn
  }

  onLogout(){
    // call userService
    this.userService.logout()
  }

}
