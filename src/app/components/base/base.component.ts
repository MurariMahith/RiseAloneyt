import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
import { Videocard } from './../../models/NewVideocard';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    selectedID: number;
    youtubeurl: string;
    videoTitle: string;
    videoDescription: string;
    safeSrc: SafeResourceUrl;
    constantyturl : string = "https://www.youtube.com/embed/";

    course:any;
    testVar : Videocard;
    lastID : Number;
    videoCards : Videocard[] = [];
    videocardsdatastatic = [];

    ytAPIkey = 'AIzaSyA5tulkmk0ZbBjlAfZQioHFEx4rzN6m5JQ'

    views : string;
    likes : string;
    comments : string;

    videoAvailable : boolean = false;
    videoAvailableTwo : boolean = true;
    // allTitles2 = new Object();
    // searchString : string = "";
    // searchResults = [];
    // searchResultsObjects = [];


  constructor(@Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, @Inject(DomSanitizer) private sanitizer: DomSanitizer,@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService, @Inject(HttpClient) private http : HttpClient) { }

  ngOnInit(): void {

    this.service.getVideoCardsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(objectsFromDB => {
        this.videocardsdatastatic = objectsFromDB
        console.log(objectsFromDB)
        // objectsFromDB.forEach(element => {        
        //   this.allTitles2[element.title.toLowerCase()] = element.key
        // });
        // console.log(this.allTitles2)
        this.selectedID = this.activatedRoute.snapshot.params.id;
        this.youtubeurl = this.constantyturl + this.videocardsdatastatic.find(o => o.cardID == this.selectedID).ytLink.slice(32,);
        var autoPlayYtUrl = this.youtubeurl + "?autoplay=1&mute=1"
        this.videoTitle = this.videocardsdatastatic.find(o => o.cardID == this.selectedID).title;
        this.videoDescription = this.videocardsdatastatic.find(o => o.cardID == this.selectedID).description;
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(autoPlayYtUrl)
        this.videoAvailable = true;
        this.videoAvailableTwo = false;
        console.log(this.youtubeurl)
        console.log(this.youtubeurl.slice(30,))
        this.http.get('https://www.googleapis.com/youtube/v3/videos?part=statistics&id='+this.youtubeurl.slice(30,)+'&key=AIzaSyA5tulkmk0ZbBjlAfZQioHFEx4rzN6m5JQ').toPromise()
          .then(a => {
            console.log(a["items"][0]["statistics"]["viewCount"]);
            console.log(a["items"][0]["statistics"]["likeCount"]);
            this.views = a["items"][0]["statistics"]["viewCount"];
            this.likes = a["items"][0]["statistics"]["likeCount"];
            this.comments = a["items"][0]["statistics"]["commentCount"]
          });
    });
    setTimeout(()=>
    {
      console.log(this.youtubeurl)
    },500)
}
}
