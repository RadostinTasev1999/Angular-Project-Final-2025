import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Podcast } from '../types/podcast';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-podcasts',
  imports: [],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent implements OnInit{

  podcastList: Podcast[] = []
 

  constructor(private apiService: ApiService, private userService: UserService){}

  ngOnInit(): void {
      this.apiService.getPodcasts().subscribe((podcastList) => {
        
        this.podcastList = podcastList
       
      })
  }



}
