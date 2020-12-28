import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';

@Component({
  selector: 'app-top-viewed',
  templateUrl: './top-viewed.component.html',
  styleUrls: ['./top-viewed.component.scss']
})
export class TopViewedComponent implements OnInit {

  testVar : Videocard;
  videoCards : Videocard[] = [];
  topViewedVideoCards : Videocard[] = [];

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService) { }

  ngOnInit(): void {
    //filtering top viewed video cards and giving only first four videocards to view
    //this.topViewedVideoCards = VIDEOCARDS.filter(o => o.videoType.includes("topviewed"));
    this.service.getAllVideoCards()
    .subscribe(actions => {
      this.testVar =actions.payload.val() as Videocard;
      this.videoCards.push(this.testVar);  
      this.topViewedVideoCards = this.videoCards.filter(o => o.videoType["topviewed"]==true);
      this.topViewedVideoCards = this.topViewedVideoCards.reverse();
    });
  }

  GoTo(num)
  {
    console.log("clicked");
    console.log(num);
    //window.location.href= this.topViewedVideoCards.find(o => o.cardID === num).ytLink;
    window.location.href="/base/"+num;
  }

}
