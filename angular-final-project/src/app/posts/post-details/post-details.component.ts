import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../types/post';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { UserForAuth } from '../../types/user';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  postId: string = '';
  post = {} as Post
  postOwner:string = ''
  postCreator: UserForAuth | null = null

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService){}

  ngOnInit(): void {
      this.route.params.subscribe((el) => {
          console.log('Value from obs is:', el)
          this.postId = el['postId']
      })
 
      this.apiService.getPostId(this.postId).subscribe((post) => {
        // this.post = post
        console.log('Post is:', post)
        this.post = post
        this.postOwner = post.owner
      })

      this.userService.getUser(this.postOwner).subscribe((user) => {
        this.postCreator = user
        console.log('Post creator is:', user)
      })

  }

}
