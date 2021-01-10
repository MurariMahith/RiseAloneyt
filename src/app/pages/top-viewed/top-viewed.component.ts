import { Component, OnInit } from '@angular/core';
import { VIDEOCARDS } from './../../models/Videocards-static';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'

import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import { CategoriesDatabaseService } from 'src/app/services/categoriesDatabaseService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-top-viewed',
  templateUrl: './top-viewed.component.html',
  styleUrls: ['./top-viewed.component.scss']
})
export class TopViewedComponent implements OnInit {

  testVar : Videocard;
  videoCards : Videocard[] = [];
  topViewedVideoCards : Videocard[] = [];

  catobj = {
    category1 : "`",
    category2 : "`",
    category3 : "`",
    category4 : "`"
  }

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase, @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService,@Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) { }

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
  }

  GoTo(num)
  {
    console.log("clicked");
    console.log(num);
    //window.location.href= this.topViewedVideoCards.find(o => o.cardID === num).ytLink;
    window.location.href="/base/"+num;
  }

}
