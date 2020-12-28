import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Scrollable } from './../../models/Scrollable';
import {SCROLLABLES} from './../../models/Scrollables-static';

import {Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-scrolling-content',
    templateUrl: './scrolling-content.component.html',
    styleUrls: ['./scrolling-content.component.scss']
})
export class ScrollingContentComponent implements OnInit {

    dbPathScrollImages = '/sanjayscroll';

    customersRef: AngularFireList<Object> = null;

    scrollingImagesFromDb = [];

    slideshowDelay=2500;

    constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase) { 
        this.customersRef = db.list(this.dbPathScrollImages);
     }

    ngOnInit(): void {

        this.customersRef.snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(objectsFromDB => {
              //console.log(objectsFromDB)
              objectsFromDB.forEach(e => this.scrollingImagesFromDb.push(e["url"]));
              
              //console.log(this.scrollingImagesFromDb)
          });
    }
    dataSource = [];
    dataSource1 = SCROLLABLES.forEach(e => this.dataSource.push(e.imageUrl));

}
