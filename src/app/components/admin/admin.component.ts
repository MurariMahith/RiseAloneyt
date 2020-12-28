import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthServiceFirebase } from './../../services/authServiceFirebase'
import { FirebaseDatabaseService } from './../../services/firebaseDatabaseService'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  email:string = '';
  password :string = '';
  uerror : boolean;
  perror : boolean;
  toomanyreqs : boolean;
  userLoggedIn : boolean = false;

  constructor(@Inject(AuthServiceFirebase) private authService : AuthServiceFirebase) { }

  ngOnInit(): void 
  {
    var isUserLoggedIn = localStorage.getItem("loggedIn")
    if(isUserLoggedIn == "true")
    {
      this.userLoggedIn = true;
      console.log("working")
    }

  }
  onSubmit()
  {
    this.logintheuser()   
  }
  async logintheuser()
  {
    this.authService.logIn(this.email,this.password)
    .then(a => 
        {
            console.log('user is logged in');
            localStorage.setItem("loggedIn","true");
            window.location.href="/add";
            this.email = '';
            this.password = '';
        })
    .catch(a => 
        {
            if(a.code == "auth/wrong-password")
            {
                this.perror = true;
                this.password = '';
                document.getElementById("formGroupExampleInput2").style.border = "1px solid red";
            }
            else if(a.code == "auth/user-not-found")
            {
                this.uerror = true;
                this.email = '';
                this.password = '';
                document.getElementById("formGroupExampleInput").style.border = "1px solid red";
            }
            else if(a.code == "auth/too-many-requests")
            {
                this.toomanyreqs = true;
            }
        });
  }
  logout()
  {
      this.authService.logOut()
  }
  admingo()
  {
      window.location.href="/add";
  }
}
