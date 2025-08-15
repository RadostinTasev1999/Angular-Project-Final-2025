import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../types/post';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { UserForAuth } from '../../types/user';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../../types/comment';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [FormsModule, EmailDirective, DatePipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  
  domains = DOMAINS
  postId: string = '';
  post = {} as Post
  postOwner:string | undefined = ''
  postCreator: UserForAuth | null = null
  isPostOwner: boolean = false;
  isEditMode: boolean = false;
  postComments: Comment[] = []
  showComments: boolean = false;
  toggleDislike: boolean = false;
  isCommentOwner: boolean = false;
  isLiked: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router){}

  get isAuthenticated(): boolean{

    return this.userService.isLoggedIn
  }

  postData: Post = {
      theme: 'technology',
      title: 'Hellet Packard',
      description: 'Sample description',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s',
      likedList: [
        {_id: '688deea61f7fa86a0122099c'}
      ],
      created_at: "8.15.2025"
  }

  ngOnInit(): void {
      this.route.params.subscribe((el) => {
          console.log('Value from obs is:', el)
          this.postId = el['postId']
      })
 
      this.apiService.getPostId(this.postId).subscribe((post) => {
        // this.post = post
        console.log('Post is:', post)
        // this.isPostLiked()
        this.post = post
        this.postOwner = post.owner
        debugger
        
        console.log('Is liked:', this.isLiked)
        // retrieve the postOwner data
        this.userService.getUser(this.postOwner).subscribe((user) => {
            this.postCreator = user
        })

        // verify if logged in user is the post owner
        debugger
        this.isPostOwner = this.userService.user?._id === this.postOwner

      })     

  }

  get isLogged():boolean{
    debugger
    return this.userService.isLoggedIn
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
      const id = this.postId
      const commentOwnerId = this.userService.user?._id
      debugger
      this.apiService.createPostComment(email,message,name,id,commentOwnerId).subscribe((message) => {
          console.log('Message is:',message)
      })

    commentForm.reset()
  }

  isPostLiked(){
    const postId = this.postId
    const userId = this.userService.user?._id
    

    debugger
    this.apiService.getUserLike(postId,userId).subscribe((post) => {
      debugger
      if (post !== undefined) {
        debugger
        this.isLiked = true
      }else{
        console.log('returned response for getUserLike:', post)
        this.isLiked = false
      }
    })

  }

  showPostComments(){

        const postId = this.postId

        this.apiService.getPostComments(postId).subscribe((comments) => {
          this.postComments = comments
          this.showComments = true
      })
    
  }

   commentOwner(ownerId:string | undefined): boolean{
    debugger
    return this.userService.user?._id === ownerId

  }

  hideComments(){
  
    this.showComments = false; 

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

  onLikePost(_id:string | undefined){
    const postId = _id
    const userId = this.userService.user?._id
    debugger
    this.apiService.likePost(postId, userId).subscribe((message) => {
      console.log(message)

      this.apiService.getPostId(postId).subscribe((post) => {
        debugger
        this.post = post
        debugger
        this.isPostLiked()
      })
    })


  }

  onLikeComment(_id: string | undefined){
    
    const commentId = _id
    const postId = this.postId
    const userId = this.userService.user?._id
    debugger
    this.apiService.likeComment(commentId,postId,userId).subscribe((message) => {
      console.log({message})
    })

    // this.toggleDislike = true;
  }

}