import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment/environment.development';
import { Post } from './types/post';

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

  createPost(theme:string, title: string, description: string, userId: string | undefined){

    const { apiUrl } = environment

    const payload = {
      theme,
      title,
      description,
      userId
    }

    return this.http.post<Post>(`${apiUrl}/posts`, payload)

  }


}
