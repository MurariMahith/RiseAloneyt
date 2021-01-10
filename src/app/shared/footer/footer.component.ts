import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoriesDatabaseService } from './../../services/categoriesDatabaseService'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  catobj = {
    category1 : "`",
    category2 : "`",
    category3 : "`",
    category4 : "`"
  }

  constructor(@Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) { }

  ngOnInit(): void {

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

}
