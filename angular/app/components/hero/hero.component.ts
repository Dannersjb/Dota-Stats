import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'hero',
  template: `
  <h1>Heroes</h1>
    <span class="hero" *ngFor="let hero of heroInfo">
      <img src="images/heroes/{{hero._source.id}}.jpg" />
      <span>{{hero._source.name}}</span>
    </span>
  `,
  styleUrls: ['hero.css'],
  providers: [ HeroService ]
})

export class HeroComponent implements OnInit { 
  
    matchId = "2938613600";
    heroes: any[];
    heroInfo = '';

    public generateArray(obj: any) {
      return Object.keys(obj).map((key) => {return obj[key]})
    }

    // public callGet(matchId : string) {
    //   console.log("get button clicked");
    //   this.http.get('http://localhost:8080/api/match/' + matchId).toPromise()
    //     .then(r => r.json())
    //     .then(r => this.players = r)
    //     console.log(this.players);
    // }

    ngOnInit() {
         this.http.get('http://localhost:8080/api/heroes').toPromise()
             .then(r => this.heroInfo = JSON.parse(r["_body"])) 
             .then(r => console.log(this.heroInfo))     
             //.then(r => this.heroInfo = JSON.parse(r["_body"])[0]['_source'])      
    }

    constructor(private heroService: HeroService, public http: Http) {
    }

  }
