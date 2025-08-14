import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Podcast } from '../../types/podcast';
import { UserService } from '../../user/user.service';

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
        debugger
        this.podcastList = podcastList
        console.log('Podcast list is:', podcastList)
      })
  }

  upVote(podcastId: string){
    const userId = this.userService.user?._id 

    this.apiService.votePodcast(podcastId,userId).subscribe((message) => {
      console.log(message)
    })

    // console.log('Podcast ID is:', _id)

  }

}
