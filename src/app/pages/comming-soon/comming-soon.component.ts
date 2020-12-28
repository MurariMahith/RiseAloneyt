import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {

  course:any;
  testVar : Videocard;
  lastID : Number;
  videoCards : Videocard[] = [];
  comingSoonVideoCards : Videocard[] = [];

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService) { }

  ngOnInit(): void {
    //filtering  only coming soon video cards
    //this.comingSoonVideoCards = VIDEOCARDS.filter(o => o.videoType.includes("comingsoon"));
    this.service.getAllVideoCards()
    .subscribe(actions => {
      this.testVar =actions.payload.val() as Videocard;
      this.videoCards.push(this.testVar);  
      this.comingSoonVideoCards = this.videoCards.filter(o => o.videoType["comingsoon"]==true);
      this.comingSoonVideoCards = this.comingSoonVideoCards.reverse();
    });
  }

  GoTo(num)
  {
    console.log("clicked");
    console.log(num);
    //window.location.href= this.comingSoonVideoCards.find(o => o.cardID === num).ytLink;
    window.location.href="/base/"+num;
  }

}
