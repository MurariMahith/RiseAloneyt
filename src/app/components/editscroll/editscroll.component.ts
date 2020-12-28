import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import {Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editscroll',
  templateUrl: './editscroll.component.html',
  styleUrls: ['./editscroll.component.scss']
})
export class EditscrollComponent implements OnInit {

    task : AngularFireUploadTask;

    basePathLogo = "/scroll";
    dbPathScrollImages = '/sanjayscroll';

    customersRef: AngularFireList<Object> = null;

    scrollingImagesFromDb = [];

    urlForView = "./../../../assets/images/noimage.png";

    urlForUpload = './../../../assets/images/noimage.png';

    priority : number = 0;

    obj = {
        url : '',
        priority : 0
    }
    
    uploaded : boolean = false;
    readyToPush : boolean = false;


  constructor(@Inject(AngularFireStorage) private fireStorage : AngularFireStorage,@Inject(AngularFireDatabase) private db: AngularFireDatabase) { 
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
          console.log(objectsFromDB)
          this.scrollingImagesFromDb = objectsFromDB;
          //this.title = objectsFromDB[0]["title"];
          //this.urlForView = objectsFromDB[0]["logoUrl"];
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

      (await this.task).ref.getDownloadURL().then(o => {this.urlForUpload = o;this.uploaded = true;this.readyToPush=true})
    }
  }

  async addScrollImage()
  {
    console.log(this.priority)
    this.obj.priority = this.priority;
    this.obj.url = this.urlForUpload
    this.customersRef.push(this.obj)
    location.reload();
    // setTimeout(() =>{
    //     window.location.href="/editlogoandtitle";
    //   },900);
  }

  deleteScrollImage(key)
  {
    var downloadURL = this.scrollingImagesFromDb.find(o => o["key"] == key)["url"]
    this.customersRef.remove(key).then(()=>{console.log("deleted")})
    this.fireStorage.storage.refFromURL(downloadURL).delete().then(() => {console.log("deleted image from db")}).catch(() => console.log("image not fount in database"))
    //console.log(downloadURL)
    


  }

}
