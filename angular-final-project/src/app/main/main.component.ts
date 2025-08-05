import { Component } from '@angular/core';
import { PostsComponent } from '../posts/posts/posts.component';

@Component({
  selector: 'app-main',
  imports: [PostsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
