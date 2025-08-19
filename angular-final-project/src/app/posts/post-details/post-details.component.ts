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
  noComments: boolean = false;
  toggleDislike: boolean = false;
  isCommentOwner: boolean = false;
  isLiked: boolean = false;
  isPostLiked: boolean = false;
  userId: string | undefined = undefined
  isCommentLiked: boolean = false;

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

  
 
  get isLogged():boolean{
    
    return this.userService.isLoggedIn
  }

 

  ngOnInit(): void {

      this.userId = this.userService.user?._id

      this.route.params.subscribe((el) => {
         
          this.postId = el['postId']
      })
 
      this.apiService.getPostId(this.postId).subscribe((post) => {
       
        this.post = post
        this.postOwner = post.owner
        
        if (post.likedList.includes(`${this.userId}`)) {

            this.isPostLiked = true
        }
        
        
       
        
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
     
      
      const id = this.postId
      const commentOwnerId = this.userService.user?._id
      
      this.apiService.createPostComment(email,message,name,id,commentOwnerId).subscribe((message) => {
          
      this.hideComments()
      })

    commentForm.reset()
  }

  

  showPostComments(){

        const postId = this.postId

        this.apiService.getPostComments(postId).subscribe((comments) => {
         
          
          if (comments.length !== 0) {
            
              this.postComments = comments
              
              
          }else{
            
              this.noComments = true;         
          }
          
          
              this.showComments = true
      })
    
  }
 

   commentOwner(ownerId:string | undefined): boolean{
    
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

    
    
    this.apiService.editPost(content,image,theme,title,id).subscribe((message) => {
       
        
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
    
    this.apiService.likePost(postId, userId).subscribe((response) => {
          
          if (response.message?.includes(`${userId}`)) {
              this.isPostLiked = true
          }
            this.apiService.getPostId(postId).subscribe((post) => {        
            this.post = post 
            if (post.likedList?.includes(`${userId}`)) {
              this.isPostLiked = true
            }
      })      
           
    })


  }

  onLikeComment(_id: string | undefined){
    
    const commentId = _id
    const postId = this.postId
    const userId = this.userService.user?._id
    
    this.apiService.likeComment(commentId,postId,userId).subscribe((response) => {
        console.log('Message is:', response)
        if (response.message === 'Comment successfully liked!') {
            this.isCommentLiked = true
            
        }
        if (response.message === `User ${userId} has already liked comment ${commentId}`) {
            this.isCommentLiked = true
            
        }
        
        this.apiService.getPostComments(postId).subscribe(
          (comments) => {
            this.postComments = comments
          }
        )
      
    })

    // this.toggleDislike = true;
  }

}