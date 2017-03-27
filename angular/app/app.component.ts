import { Component, OnInit, OnDestroy } from '@angular/core';
import { SteamProfileService } from './components/steamProfile/steam.profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
  <div class="menu_overlay">
    <div class="menu_container">
        <div class="menu_icon"><a routerLink="/home" routerLinkActive="active"><img src="images/dota_icon.png" /></a></div>
        <ul class="menu">
          <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/heroes" routerLinkActive="active">Heroes</a></li>
          <li><a routerLink="/items" routerLinkActive="active">Items</a></li>
          <li><a routerLink="/matches" routerLinkActive="active">Matches</a></li>
          <li><a routerLink="/picks" routerLinkActive="active">Picks</a></li>
        </ul>
        <ul class="account">
          <li *ngIf="loggedIn==true">
            <div class="account_image"><img src="{{profileImages.small}}" /></div>
            <a routerLink="/profile" routerLinkActive="active"><i class="fa fa-user" aria-hidden="true"></i> Profile</a>
            <a (click)="steamProfileService.logout()" routerLinkActive="active"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
          </li>
          <li *ngIf="loggedIn==false">
            <a href="http://localhost:8080/api/authenticate" class="login" routerLinkActive="active"><i class="fa fa-steam" aria-hidden="true"></i> <span>Login with Steam</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="page">
      <router-outlet></router-outlet>
    </div>
    <footer>
      <p>Dota Stats</p>
    </footer>`,
    providers: [ SteamProfileService ]
})
export class AppComponent implements OnInit{ 

  profileInfo = '';
  profileImages = '';
  loggedIn : boolean;

  constructor(private steamProfileService : SteamProfileService, router: Router) {
    router.events.subscribe((val) => {
        this.ngOnInit();
    });
  }

  ngOnInit() {
        this.steamProfileService.checkLoggin().then(r=> {
          this.loggedIn = r
          if (this.loggedIn == true) {
            this.loggedIn = true;
            this.steamProfileService.getLoginSession()
            .then(r => {
              this.profileInfo = r
              this.profileImages = this.profileInfo['avatar']
            })
          } else {
            this.loggedIn = false;
          }
        })  
    }
}
