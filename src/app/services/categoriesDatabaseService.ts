import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Videocard } from './../models/NewVideoCard';
 
@Injectable({
  providedIn: 'root'
})
export class CategoriesDatabaseService {
 
  private dbPathCategories = '/categories';
  private dbPathSocialMediaPage = '/socialmediawebsite';
 
  customersRefCategories: AngularFireList<Object> = null;
  customersRefSocialMediaPage: AngularFireList<Object> = null;

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase) {
    this.customersRefCategories = db.list(this.dbPathCategories);
    this.customersRefSocialMediaPage = db.list(this.dbPathSocialMediaPage);
  }
  getCategoriesList(): AngularFireList<Object> {
    return this.customersRefCategories;
  }

  getSocialMediaPageList() :AngularFireList<Object>
  {
    return this.customersRefSocialMediaPage;
  }
}