import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthServiceFirebase } from './../../services/authServiceFirebase';
import { map } from 'rxjs/operators';
import { CategoriesDatabaseService } from './../../services/categoriesDatabaseService';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  urlForLogo : string = "./../../../assets/images/loadingheader3.gif";
  title : string = "";

  dbPathLogoAndTitle = '/sanjaylogotitle';

  customersRef: AngularFireList<Object> = null;

  userLoggedIn : boolean =false;

  catobj = {
    category1 : "",
    category2 : "",
    category3 : "",
    category4 : ""
  }

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase,@Inject(AuthServiceFirebase) private authService : AuthServiceFirebase,@Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) {

    this.customersRef = db.list(this.dbPathLogoAndTitle);
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
        this.title = objectsFromDB[0]["title"];
        this.urlForLogo = objectsFromDB[0]["logoUrl"];
    });

    var isUserLoggedIn = localStorage.getItem("loggedIn")
    if(isUserLoggedIn == "true")
    {
      this.userLoggedIn = true;
    }

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

  topFunction()
  {
    document.documentElement.scrollTop = 0;
  }
  logout()
  {
    console.log("logout")
    this.authService.logOut()
  }

}
