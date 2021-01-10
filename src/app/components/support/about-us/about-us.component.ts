import { Component, Inject, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoriesDatabaseService } from 'src/app/services/categoriesDatabaseService';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUSComponent implements OnInit {

  socialobj = {
    instagram : "",
    whatsapp : "",
    youtube : "",
    discord : "",
    facebook : "",
    sourcecode : "",      
  }

  constructor(@Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) { }

  ngOnInit(): void {

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
    
  }

}
