import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment/environment.development';
import { Post } from './types/post';
import { Comment } from './types/comment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

   
  getPosts(){

    const { apiUrl } = environment
    // http://localhost:3000/api

    return this.http.get<Post[]>(`${apiUrl}/posts`)
    
  }

  createPost(theme:string, title: string, description: string,image: string, userId: string | undefined){

    const API = '/api'

    const payload = {
      theme,
      title,
      description,
      image,
      userId
    }

    return this.http.post<Post>(`${API}/posts`, payload)

  }

  getPostId(postId:string) {

    const { apiUrl } = environment

    return this.http.get<Post>(`${apiUrl}/posts/${postId}`)

  }

  createPostComment(email:string, message:string, name: string, postId: string,commentOwnerId:string | undefined){

    const data = { email, message, name }

    const API = '/api'
    debugger
    return this.http.post<Comment>(`${API}/posts/${postId}/comments`, {...data, commentOwnerId})

  }

  deletePost(postId: string){
    const API = '/api'

    return this.http.delete(`${API}/posts/${postId}`)
  }


}
