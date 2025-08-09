import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  constructor(private apiService: ApiService, private userService: UserService, private router: Router){}

  onCreate(form:NgForm){
    if (form.invalid) {
        return;
    }

    const owner = this.userService.user?._id
    // logged in user id

    const {
      theme,
      title,
      description,
      image
    } = form.value

    // console.log('Properties from create form are:', theme, title, description)
    debugger
    console.log('UserId is:', owner)

    this.apiService.createPost(theme,title,description, image,owner).subscribe(() => {
        this.router.navigate(['/posts'])
    })
    
  }

}
