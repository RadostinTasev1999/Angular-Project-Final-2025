import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';



@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  constructor(private apiService: ApiService, private userService: UserService){}

  onCreate(form:NgForm){
    if (form.invalid) {
        return;
    }

    const userId = this.userService.userId

    const {
      theme,
      title,
      description
    } = form.value

    this.apiService.createPost(theme!,title!,description!, userId!)

  //  console.log(form)
  }

}
