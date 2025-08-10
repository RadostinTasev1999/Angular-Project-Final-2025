import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router){}

  get isLoggedIn():boolean{
      console.log('User is logged in:', this.userService.isLoggedIn)
    return this.userService.isLoggedIn
  }

  get firstName():string | undefined{
    
    return this.userService.username

  }

  onLogout(){
    // call userService
    this.userService.logout().subscribe((message) => {
        console.log(message)
        debugger
        this.router.navigate(['/home'])
    })
  }

}
