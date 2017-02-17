import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="menu_container">
      <ul>
        <li><a routerLink="/" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/heroes" routerLinkActive="active">Heroes</a></li>
        <li><a routerLink="/items" routerLinkActive="active">Items</a></li>
        <li><a routerLink="/matches" routerLinkActive="active">Matches</a></li>
        <li><a routerLink="/picks" routerLinkActive="active">Picks</a></li>
        <li><a routerLink="/profile" routerLinkActive="active">Profile</a></li>
      </ul>
    </div>
    <div class="page">
      <router-outlet></router-outlet>
    </div>
    <footer>
      <p>Dota Stats</p>
    </footer>`
})
export class AppComponent  { 

}
