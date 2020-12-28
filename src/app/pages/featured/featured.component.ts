import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  course:any;
  testVar : Videocard;
  lastID : Number;
  videoCards : Videocard[] = [];
  featuredVideoCards : Videocard[] = [];

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService) { }

  ngOnInit(): void {    
    //filtering only featured video cards
    //this.featuredVideoCards = VIDEOCARDS.filter(o => o.videoType.includes("featured"));
    this.service.getAllVideoCards()
    .subscribe(actions => {
      this.testVar =actions.payload.val() as Videocard;
      this.videoCards.push(this.testVar);  
      this.featuredVideoCards = this.videoCards.filter(o => o.videoType["featured"]==true);
      this.featuredVideoCards = this.featuredVideoCards.reverse();
    });
  }

  GoTo(num)
  {
    console.log("clicked");
    console.log(num);
    //window.location.href= this.featuredVideoCards.find(o => o.cardID === num).ytLink;
    window.location.href="/base/"+num;
  }

}
