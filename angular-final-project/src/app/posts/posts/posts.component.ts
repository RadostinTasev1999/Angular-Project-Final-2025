import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{

  posts:Post[] = []

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getPosts().subscribe((post) => {
        debugger
        this.posts = post
      })
  }

}
