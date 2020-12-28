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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    videocardsdatastatic = [];

    allTitles2 = new Object();
    searchString : string = "";
    searchResults = [];
    searchResultsObjects = [];
    clicked : boolean = false;


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
        //console.log(objectsFromDB)
        objectsFromDB.forEach(element => {        
          this.allTitles2[element.title.trim().toLowerCase()] = element.key
        });        
        //console.log(this.allTitles2)
    });
}
  searching(event)
  {
    this.clicked = true;
    event = event.trim().toLowerCase();
    //console.log(event)
    this.searchResults.length = 0;    
    this.searchResultsObjects.length = 0;
    var titles = Object.keys(this.allTitles2);
    titles.forEach(element => {
      if(element.search(event) != -1)
      {
        element.search(event)
        this.searchResultsObjects.push(this.videocardsdatastatic.find(o => o.key == this.allTitles2[element]))
        this.searchResults.push(element)        
      }
    });
    // console.log(this.searchResults)
    // console.log(this.searchResultsObjects)
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
