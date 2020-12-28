import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Videocard } from './../models/NewVideoCard';
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {
 
  private dbPath = '/sanjayytdb';
 
  customersRef: AngularFireList<Videocard> = null;

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase) {
    this.customersRef = db.list(this.dbPath);
  }
 
  createVideoCard(videoCard: Videocard): void {
    this.customersRef.push(videoCard);
  }
 
  updateVideoCard(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
 
  deleteVideoCard(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
 
  getVideoCardsList(): AngularFireList<Videocard> {
    return this.customersRef;
  }

  getAllVideoCards()
  {
    return this.db.list(this.dbPath).stateChanges(['child_added']);
  }
 
  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }
}