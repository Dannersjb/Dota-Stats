import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { SteamProfileService } from '../../services/SteamProfile.service';

@Component({
  moduleId: module.id,
  selector: 'match',
  template: `
  <h1>Profile</h1>
    <a href="http://localhost:8080/api/authenticate"><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"/></a>
   <ul *ngFor="let profile of profileInfo">
      <li>
        <span><a href="{{profile.profileurl}}" target="_blank">{{profile.personaname}}</a></span>
        <img src="{{profile.avatarmedium}}" />
        <span>{{profile.realname}}</span>
      </li>
    </ul>
  `,
  providers: [ SteamProfileService ]
})

export class SteamProfile implements OnInit, OnDestroy { 

    profileId: string;
    private sub: any;
    profileInfo = '';

    constructor( private route: ActivatedRoute, public http: Http, private steamProfileService : SteamProfileService) {

    }

     

    ngOnInit() {
             this.http.get('http://localhost:8080/api').toPromise()
               .then(r => console.log(r))
             //  .then(r => r.json())
             //  .then(r => this.profileInfo = r
 
      
      //ask for login
      //login
      //downloading matches
      //display profile info
      //select view matches or hav matches under
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}


