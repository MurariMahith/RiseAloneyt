import { Component, OnInit } from '@angular/core';
// import {AngularFireDatabase} from 'angularfire2/database'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import {Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Videocard } from './../../models/NewVideoCard'
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import * as firebase from "firebase/app";
import { AuthServiceFirebase } from './../../services/authServiceFirebase'
import { VideoType } from 'src/app/models/VideoType';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-edithomepage',
  templateUrl: './edithomepage.component.html',
  styleUrls: ['./edithomepage.component.scss']
})
export class EdithomepageComponent implements OnInit {

    scrollBool :boolean = false;
    titleBool :boolean = false;
    urlForView = "./../../../assets/images/loading.gif";
    
    urlForLogo = "";
    title : string = "";
    task : AngularFireUploadTask;

    basePathLogo = "/logo";
    dbPathLogoAndTitle = '/sanjaylogotitle';

    customersRef: AngularFireList<Object> = null;

    obj = {
        title : "",
        logoUrl :""
    };

    uploaded : boolean = false;

  constructor(@Inject(AngularFireStorage) private fireStorage : AngularFireStorage,@Inject(AngularFireDatabase) private db: AngularFireDatabase) { 
    
    this.customersRef = db.list(this.dbPathLogoAndTitle);

    var isUserLoggedIn = localStorage.getItem("loggedIn")
    if(!(isUserLoggedIn == "true"))
    {
      window.location.href = "/admin";
      console.log("working")
    }
    else
    {
      console.log("signed in as admin no issues")
    }
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
          this.urlForView = objectsFromDB[0]["logoUrl"];
          this.urlForLogo = this.urlForView;
      });
      
  }

  async selectedFile(event)
  {
    if(event.target.files)
    {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event : any) => {
        this.urlForView = event.target.result;
      }
    }
    const file = event.target.files[0];
    if(file)
    {
      const filePath = `${this.basePathLogo}/${file.name}`;
      this.task = this.fireStorage.upload(filePath, file);

      (await this.task).ref.getDownloadURL().then(o => {this.urlForLogo = o;console.log(this.urlForLogo);this.uploaded = true})
    }
  }

  async UpdateTitleAndLogo()
  {
    //first delete previous title and logo
    this.customersRef.remove();
    this.obj.title = this.title;
    this.obj.logoUrl = this.urlForLogo
    console.log(this.urlForLogo)
    console.log(this.obj)
    this.customersRef.push(this.obj).then(() => {window.location.href="/editlogoandtitle";})
    // setTimeout(() =>{
    //     window.location.href="/editlogoandtitle";
    //   },500);
    //window.location.href="/editlogoandtitle"
  }

  scrollCardsUpdate()
  {
    this.scrollBool = true;
    this.titleBool = false;
  }

  titleUpdate()
  {
    this.scrollBool = false;
    this.titleBool = true;
  }

  logout()
  {

  }
}
