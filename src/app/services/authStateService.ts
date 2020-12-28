import { Inject, Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class AuthServiceFirebase {

  signedIn : boolean = false;

  constructor() {  }

  getAuthState()
  {
      return this.getAuthState;
  }
  setAuthState()
  {
      this.signedIn = true;
  }

}