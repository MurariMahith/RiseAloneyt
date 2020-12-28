import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
// import { Videocard } from './../../models/Videocard';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

    course:any;
    testVar : Videocard;
    lastID : Number;
    videoCards : Videocard[] = [];
    featuredVideoCards : Videocard[] = [];
    comingSoonVideoCards : Videocard[] = [];
    topViewedVideoCards : Videocard[] = [];
    mostRecentVideoCards : Videocard[] = [];
    videoDescriptionClicked = false;

    subscribers;
    videoCount;
    viewCount;
    channelID = 'UCQBJ3aDHhSJZLduIP8Viqkw';
    ytAPIkey = 'AIzaSyA5tulkmk0ZbBjlAfZQioHFEx4rzN6m5JQ' 

    constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService,@Inject(HttpClient) private http : HttpClient) { }

    ngOnInit(): void {

        localStorage.setItem("developed by","Murari Mahith, Rohith Reddy, Mukesh, Prasanna")

        //
    this.service.getAllVideoCards()
    .subscribe(actions => {
      this.testVar =actions.payload.val() as Videocard;
      this.videoCards.push(this.testVar);  

      this.featuredVideoCards = this.videoCards.filter(o => o.videoType["featured"]==true);
      this.featuredVideoCards = this.featuredVideoCards.reverse()

      this.topViewedVideoCards = this.videoCards.filter(o => o.videoType["topviewed"]==true);
      this.topViewedVideoCards = this.topViewedVideoCards.reverse()

      this.comingSoonVideoCards = this.videoCards.filter(o => o.videoType["comingsoon"]==true);
      this.comingSoonVideoCards = this.comingSoonVideoCards.reverse()

      this.mostRecentVideoCards = this.videoCards.filter(o => o.videoType["mostrecent"]==true);
      this.mostRecentVideoCards = this.mostRecentVideoCards.reverse()

      this.featuredVideoCards = this.featuredVideoCards.slice(0, 4);
      this.comingSoonVideoCards = this.comingSoonVideoCards.slice(0,4);
      this.mostRecentVideoCards = this.mostRecentVideoCards.slice(0,4);
      this.topViewedVideoCards = this.topViewedVideoCards.slice(0,4);
    });
        //
        this.http.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id="+this.channelID+"&key="+this.ytAPIkey).toPromise()
          .then(a => {
            // console.log(a["items"][0]["statistics"]["viewCount"]);
            // console.log(a["items"][0]["statistics"]["likeCount"]);
            this.viewCount = a["items"][0]["statistics"]["viewCount"];
            this.videoCount = a["items"][0]["statistics"]["videoCount"];
            this.subscribers = a["items"][0]["statistics"]["subscriberCount"]
          });
    }

    showVideoDescription(){
        this.videoDescriptionClicked = !this.videoDescriptionClicked;
    }

    GoTo(num)
    {
        console.log("clicked");
        console.log(num);
        //window.location.href= VIDEOCARDS.find(o => o.cardID === num).ytLink;
        window.location.href="/base/"+num;
        //this function is implemented in rohith branch will update at last dont edit this function
    }
}
