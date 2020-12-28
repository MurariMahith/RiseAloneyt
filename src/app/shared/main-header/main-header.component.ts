import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthServiceFirebase } from './../../services/authServiceFirebase';
import { map } from 'rxjs/operators';

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

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase,@Inject(AuthServiceFirebase) private authService : AuthServiceFirebase) {

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


  }

  topFunction()
  {
    document.documentElement.scrollTop = 0;
  }
  logout()
  {
    console.log("logoyt")
    this.authService.logOut()
  }

}
