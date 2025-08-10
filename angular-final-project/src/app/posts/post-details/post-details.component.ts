import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../types/post';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { UserForAuth } from '../../types/user';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-details',
  imports: [FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  postId: string = '';
  post = {} as Post
  postOwner:string | undefined = ''
  postCreator: UserForAuth | null = null
  isPostOwner: boolean = false;
  isEditMode: boolean = false;
  
  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router){}

  get isAuthenticated(): boolean{

    return this.userService.isLoggedIn
  }

  postData: Post = {
      theme: 'technology',
      title: 'Hellet Packard',
      description: 'Sample description',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s'

  }

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

        // retrieve the postOwner data
        this.userService.getUser(this.postOwner).subscribe((user) => {
            this.postCreator = user
        })

        // verify if logged in user is the post owner
        this.isPostOwner = this.userService.user?._id === this.postOwner

      })

          

  }

  createComment(commentForm:NgForm){

    if (commentForm?.invalid) {
        return;
    }

    const {
      email,
      message,
      name
    } = commentForm.value
      console.log('Comment form props are:', email, message, name)
      debugger
      const commentOwnerId = this.userService.user?._id
      debugger
      this.apiService.createPostComment(email,message,name,this.postId,commentOwnerId).subscribe((message) => {
          console.log('Message is:',message)
      })

    commentForm.reset()
  }

  onDelete(){

    const id = this.postId

    this.apiService.deletePost(id).subscribe((message) => {
     window.alert({message})
    this.router.navigate(['/posts'])
    })
  }

  editPost(form:NgForm){
    if (form.invalid) {
        return;
    }

    const id = this.postId

    const {
      content,
      image,
      theme,
      title
    } = form.value

    console.log('Form properties:',{
        content,
        image,
        theme,
        title
    })
    debugger
    this.apiService.editPost(content,image,theme,title,id).subscribe((message) => {
        console.log('Message:', message)
        debugger
        form.reset()
        this.toggleEditMode()
        this.router.navigate([`/posts/${id}`]).then(() => {
            this.apiService.getPostId(id).subscribe((post) => {
              this.post = post
            })
        })
    })
    




  }

  onEdit(){
    this.toggleEditMode()
  }

  onCancel(){
    this.toggleEditMode()
  }

  toggleEditMode(){
    this.isEditMode = !this.isEditMode
  }


}
