import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
// import { Videocard } from './../../models/Videocard';
import {Inject} from '@angular/core';
import * as randomA from 'random';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import { HttpClient } from '@angular/common/http';
import { CategoriesDatabaseService } from 'src/app/services/categoriesDatabaseService';
import { map } from 'rxjs/operators';


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

    catobj = {
        category1 : "`",
        category2 : "`",
        category3 : "`",
        category4 : "`"
      }

      socialobj = {
        instagram : "",
        whatsapp : "",
        youtube : "",
        discord : "",
        facebook : "",
        sourcecode : "",      
      }

    constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, 
                @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService,
                @Inject(HttpClient) private http : HttpClient,
                @Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) { }

    ngOnInit(): void {

        localStorage.setItem("developed by","Murari Mahith, Rohith Reddy, Mukesh, Prasanna")
        this.catDB.getCategoriesList().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(objectsFromDB => {
              //console.log(objectsFromDB)
              this.catobj.category1 = objectsFromDB[0]["category1"];
              this.catobj.category2 = objectsFromDB[0]["category2"];
              this.catobj.category3 = objectsFromDB[0]["category3"];
              this.catobj.category4 = objectsFromDB[0]["category4"];
          });

          this.catDB.getSocialMediaPageList().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(objectsFromDB => {
              //console.log(objectsFromDB)
              this.socialobj.instagram = objectsFromDB[0]["instagram"];
              this.socialobj.whatsapp = objectsFromDB[0]["whatsapp"];
              this.socialobj.youtube = objectsFromDB[0]["youtube"];
              this.socialobj.discord = objectsFromDB[0]["discord"];
              this.socialobj.facebook = objectsFromDB[0]["facebook"];
              this.socialobj.sourcecode = objectsFromDB[0]["sourcecode"];              
          });

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
          })
          .catch(() => {
              console.log("youtube data API is down. Data will be realtime after Youtube API is back online")
          });
    }

    showVideoDescription(){
        this.videoDescriptionClicked = !this.videoDescriptionClicked;
    }

    GoTo(num)
    {
        console.log("clicked");
        console.log(num);
        //very important step
        window.location.href="/base/"+num;
        // document.body.style.backgroundColor = "white";
        // var x=document.querySelectorAll<HTMLElement>('.card-body');
        // for (var i = 0; i < x.length; i++) {
        //     x[i].style.backgroundColor="white";
        // }

        //random code generator and offer period maker for mukesh app
        var randomNumStr = Math.floor((Math.random() * 10000000) + 1).toString()
        if(randomNumStr.length != 7)
        {
            for (var i=randomNumStr.length;i<7;i++)
            {
                randomNumStr=randomNumStr+'0';
            }
        }
        console.log("dear customer your unique code is: BDAY"+randomNumStr+"MUR")
        this.getOfferPeriod(new Date("1999-02-28"));
    }

    getOfferPeriod(date : Date)
    {
        console.log(date)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateNow = new Date()
        var yearNow = dateNow.getFullYear();

        //check for max and min dates
        var dayFromDate = date.getDate();
        var minOfferDate = dayFromDate-3;
        var maxOfferDate = dayFromDate+3;
        var minOfferMonth = date.getMonth()+1;
        var maxOfferMonth = date.getMonth()+1;

        var totalDaysInMonth = this.daysInMonth(date.getMonth()+1,yearNow)

        if(dayFromDate+3>totalDaysInMonth)
        {
            maxOfferDate = dayFromDate+3-totalDaysInMonth;
            maxOfferMonth = date.getMonth()+2
        }
        if(dayFromDate-3<=0)
        {
            minOfferDate = this.daysInMonth(date.getMonth(),yearNow)-(dayFromDate-3);
            minOfferMonth = date.getMonth();
        }
        console.log("offer is valid from "+minOfferDate+"/"+minOfferMonth+"/"+yearNow+" to "+maxOfferDate+"/"+maxOfferMonth+"/"+yearNow);
    }

    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
}
