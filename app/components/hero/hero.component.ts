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
      <span class="name">{{hero._source.name}}</span>
      <div class="hero_info">
        <span *ngIf="hero._source.push!=null">Push: {{hero._source.push}}</span>
        <span *ngIf="hero._source.durable!=null">Durable: {{hero._source.durable}}</span>
        <span *ngIf="hero._source.nuke!=null">Nuke: {{hero._source.nuke}}</span>
        <span *ngIf="hero._source.support!=null">Support: {{hero._source.support}}</span>
        <span *ngIf="hero._source.laneSupport!=null">Lane Support: {{hero._source.laneSupport}}</span>
        <span *ngIf="hero._source.escape!=null">Escape: {{hero._source.escape}}</span>
        <span *ngIf="hero._source.carry!=null">Carry: {{hero._source.carry}}</span>
        <span *ngIf="hero._source.teamFight!=null">Team Fight: {{hero._source.teamFight}}</span>
        <span *ngIf="hero._source.jungle!=null">Jungle: {{hero._source.jungle}}</span>
        <span *ngIf="hero._source.initiation!=null">Initiation: {{hero._source.initiation}}</span>
        <span *ngIf="hero._source.disable!=null">Disable: {{hero._source.disable}}</span>
      </div>
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
