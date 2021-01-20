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
    customersRefCategories: AngularFireList<Object> = null;
    customersRefSocialMediaPage: AngularFireList<Object> = null;
    customersRefColors: AngularFireList<Object> = null;

    obj = {
        title : "",
        logoUrl :""
    };

    uploaded : boolean = false;

    category1 = "";
    category2 = "";
    category3 = "";
    category4 = "";

    catobj = {
      category1 : "",
      category2 : "",
      category3 : "",
      category4 : "",
    }

    dbPathCategories = '/categories';

    socialobj = {
      instagram : "",
      whatsapp : "",
      youtube : "",
      discord : "",
      facebook : "",
      sourcecode : "",      
    }

    dbPathSocialMediaPage = '/socialmediawebsite'

    colorsobj = {
      primary : "",
      secondary : "",
      isNeon : false,
      mode : ""
    }

    dbPathColors = '/colors'

    light :boolean = false;
    dark :boolean = false;
    deepdark :boolean = false;
    neon :boolean = false;

    colorsobjAPPLY = {
      primary : "",
      secondary : "",
      isNeon : false,
      key : "",
      mode : ""
    }

  constructor(@Inject(AngularFireStorage) private fireStorage : AngularFireStorage,@Inject(AngularFireDatabase) private db: AngularFireDatabase) { 
    
    this.customersRef = db.list(this.dbPathLogoAndTitle);

    this.customersRefCategories = db.list(this.dbPathCategories);

    this.customersRefSocialMediaPage = db.list(this.dbPathSocialMediaPage);

    this.customersRefColors = db.list(this.dbPathColors);

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

    this.customersRefColors.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(objectsFromDB => {
        console.log(objectsFromDB)
        this.colorsobjAPPLY.primary = objectsFromDB[0]["primary"];
        this.colorsobjAPPLY.secondary = objectsFromDB[0]["secondary"];
        this.colorsobjAPPLY.isNeon = objectsFromDB[0]["isNeon"];
        this.colorsobjAPPLY.mode = objectsFromDB[0]["mode"];
    });

    var headers = document.querySelectorAll<HTMLElement>('.dynamic-header');
    for (var i = 0; i < headers.length; i++) 
    {
      headers[i].style.backgroundColor = this.colorsobjAPPLY.secondary
      
      if(this.colorsobjAPPLY.mode == "dark" || this.colorsobjAPPLY.mode == "deepdark")
      {
        headers[i].style.color = "white"
      }
    }
    var bodies = document.querySelectorAll<HTMLElement>('.dynamic-body');
    for (var i = 0; i < bodies.length; i++) 
    {
      bodies[i].style.backgroundColor = this.colorsobjAPPLY.primary
      document.body.style.backgroundColor = this.colorsobjAPPLY.secondary
      if(this.colorsobjAPPLY.mode == "dark" || this.colorsobjAPPLY.mode == "deepdark")
      {
        headers[i].style.color = "white"     
        document.body.style.color = "white"  
      }
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

      this.customersRefCategories.snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(objectsFromDB => {
          //console.log(objectsFromDB)
          this.category1 = objectsFromDB[0]["category1"];
          this.category2 = objectsFromDB[0]["category2"];
          this.category3 = objectsFromDB[0]["category3"];
          this.category4 = objectsFromDB[0]["category4"];
      });      
    
      this.customersRefSocialMediaPage.snapshotChanges().pipe(
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

  async UpdateCategories()
  {
    console.log("updated categories")
    this.customersRefCategories.remove();
    this.catobj.category1 = this.category1
    this.catobj.category2 = this.category2
    this.catobj.category3 = this.category3
    this.catobj.category4 = this.category4
    //console.log(this.catobj)
    this.customersRefCategories.push(this.catobj)
    .then(() => {
      window.location.href="/editlogoandtitle";
    })
    .catch(() => {
      alert("Something's wrong, please try again later");
      window.location.href="/editlogoandtitle";
    })
  }

  async UpdateSocialMediaLinks()
  {
    this.customersRefSocialMediaPage.remove();
    this.customersRefSocialMediaPage.push(this.socialobj)
    .then(() => {
      window.location.href="/editlogoandtitle";
    })
    .catch(() => {
      alert("Something's wrong, please try again later");
      window.location.href="/editlogoandtitle";
    })

  }

  async UpdateColors(mode)
  {
    console.log(mode)
    switch(mode) {
      case 'light':
        this.colorsobj.primary = "rgb(247,247,247)"
        this.colorsobj.secondary = "white"
        this.colorsobj.mode = mode
        // code block
        break;
      case "dark":
        this.colorsobj.primary = "#333545"
        this.colorsobj.secondary = "rgb(31,37,51)"
        this.colorsobj.mode = mode
        // code block
        break;
      case "deepdark":
        this.colorsobj.primary = "rgba(0, 0, 0, 0.904)"
        this.colorsobj.secondary = "black"
        this.colorsobj.mode = mode
        break;
      case "neon":
        this.colorsobj.primary = "rgba(0, 0, 0, 0.904)"
        this.colorsobj.secondary = "black"
        this.colorsobj.isNeon = true
        this.colorsobj.mode = mode
        break
    }
    this.customersRefColors.remove();
    this.customersRefColors.push(this.colorsobj)
    .then(() => {
      window.location.href="/editlogoandtitle";
    })
    .catch(() => {
      alert("Something's wrong, please try again later");
      window.location.href="/editlogoandtitle";
    })

    console.log(this.colorsobj)
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
