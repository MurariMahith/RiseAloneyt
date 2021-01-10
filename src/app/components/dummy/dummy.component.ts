import { Component, Injectable, OnInit } from '@angular/core';
// import {AngularFireDatabase} from 'angularfire2/database'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import {Inject} from '@angular/core';

import { Videocard } from './../../models/NewVideoCard'
import { FirebaseDatabaseService } from 'src/app/services/firebaseDatabaseService';
import * as firebase from "firebase/app";
import { AuthServiceFirebase } from './../../services/authServiceFirebase'
import { VideoType } from 'src/app/models/VideoType';

import { map } from 'rxjs/operators';
import { CategoriesDatabaseService } from 'src/app/services/categoriesDatabaseService';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  course:any;
  testVar : Videocard;
  lastID : Number;
  videoCards : Videocard[] = [];
  featuredVideoCards : Videocard[] = [];
  comingSoonVideoCards : Videocard[] = [];
  topViewedVideoCards : Videocard[] = [];
  mostRecentVideoCards : Videocard[] = [];

  addCardSelectedBool : boolean = false;
  deleteCardSelectedBool : boolean = false;
  updateCardSelectedBool : boolean = false;

  newCard : Videocard = {
    cardID: 0,
    description: "",
    imageUrl: "",
    title: "",
    videoType: {comingsoon: false, featured: false, mostrecent: false, topviewed: false},
    ytLink: ""
  }

  urlForView = "./../../../assets/images/nophoto.png";
  basePath = "/images";
  urlForVideoCard = ""
  task : AngularFireUploadTask;

  selectedRecordForEdit : boolean = false;
  selectedCardForEditing;
  selectedCardForEditingImageUrl :string = "";

  uploaded : boolean = false;

  catobj = {
    category1 : "`",
    category2 : "`",
    category3 : "`",
    category4 : "`"
  }

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase,
              @Inject(FirebaseDatabaseService) private service : FirebaseDatabaseService, 
              @Inject(AngularFireStorage) private fireStorage : AngularFireStorage, 
              @Inject(AuthServiceFirebase) private authService : AuthServiceFirebase,
              @Inject(CategoriesDatabaseService) private catDB :CategoriesDatabaseService) { }

  videocardsdatastatic;

  ngOnInit(): void {

    //console.log(this.authService.getAuthState())
    // console.log("above getauthstate")
    // console.log(firebase.auth().currentUser)
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

    this.service.getVideoCardsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(objectsFromDB => {
        this.videocardsdatastatic = objectsFromDB
    });

    this.catDB.getCategoriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(objectsFromDB => {
        console.log(objectsFromDB)
        this.catobj.category1 = objectsFromDB[0]["category1"];
        this.catobj.category2 = objectsFromDB[0]["category2"];
        this.catobj.category3 = objectsFromDB[0]["category3"];
        this.catobj.category4 = objectsFromDB[0]["category4"];
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
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.fireStorage.upload(filePath, file);

      (await this.task).ref.getDownloadURL().then(o => {this.urlForVideoCard = o;console.log(this.urlForVideoCard);this.uploaded = true})
    }
  }

  async onSubmit()
  {
    console.log(this.newCard);
    var vCardVariable = new Videocard();
    var videoTypeVariable = new VideoType();
    vCardVariable.title = this.newCard.title;
    vCardVariable.ytLink = this.newCard.ytLink;
    vCardVariable.description = this.newCard.description;
    vCardVariable.imageUrl = this.urlForVideoCard;
    videoTypeVariable.featured = this.newCard.videoType.featured;
    videoTypeVariable.comingsoon = this.newCard.videoType.comingsoon;
    videoTypeVariable.topviewed = this.newCard.videoType.topviewed;
    videoTypeVariable.mostrecent = this.newCard.videoType.mostrecent;
    vCardVariable.videoType = videoTypeVariable;
    console.log(vCardVariable);
    var videocardsdatastatic;
    this.service.getVideoCardsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(objectsFromDB => {
        videocardsdatastatic = objectsFromDB     
        if(typeof videocardsdatastatic[objectsFromDB.length-1].cardID === "undefined")
        {
          vCardVariable.cardID = 1;
        }   
        else
        {
          vCardVariable.cardID = videocardsdatastatic[objectsFromDB.length-1].cardID+1;
        }        
        console.log(vCardVariable.cardID);
        console.log(vCardVariable);       
    });
    setTimeout(() =>{
      this.service.createVideoCard(vCardVariable)
      window.location.href="/add";
    },500); 
  }

  addCardSelected()
  {
    this.addCardSelectedBool = true;
    this.deleteCardSelectedBool = false;
    this.updateCardSelectedBool = false;
  }
  deleteCardSelected()
  {
    this.addCardSelectedBool = false;
    this.deleteCardSelectedBool = true;
    this.updateCardSelectedBool = false;
  }
  updateCardSelected()
  {
    this.addCardSelectedBool = false;
    this.deleteCardSelectedBool = false;
    this.updateCardSelectedBool = true;
  }

  logout()
  {
      this.authService.logOut()
  }

  deleteCard(id)
  {
    console.log("deleting",id);
    console.log(this.videocardsdatastatic)
    alert("you are deleting videocard: "+this.videocardsdatastatic.find(o => o.cardID == id).title +" there is no coming back")
    var deleteImageUrl = this.videocardsdatastatic.find(o => o.cardID == id).imageUrl
    this.fireStorage.storage.refFromURL(deleteImageUrl).delete().then(() => console.log("image deleted"))
    this.service.deleteVideoCard(this.videocardsdatastatic.find(o => o.cardID == id).key).catch(o=>alert("something went wrong contact developer or try again"))
  }

  editCard(id)
  {
    this.selectedRecordForEdit = true;
    this.selectedCardForEditing = this.videocardsdatastatic.find(o => o.cardID == id);
    this.selectedCardForEditingImageUrl = this.selectedCardForEditing.imageUrl;
    console.log(this.selectedCardForEditing)
    console.log(this.selectedCardForEditing.imageUrl)
    window.scrollTo(0,document.body.scrollHeight);
  }
  updateCard(id)
  {
    console.log(this.selectedCardForEditing);
    this.service.updateVideoCard(this.videocardsdatastatic.find(o => o.cardID == id).key,this.selectedCardForEditing)
    window.location.href = "/add";
  }
}
