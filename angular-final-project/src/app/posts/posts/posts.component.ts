import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common'
import { SlicePipe } from '../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-posts',
  imports: [RouterLink,DatePipe, SlicePipe],
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
        console.log('Post collection is:', post)
      })

      
  }

}
