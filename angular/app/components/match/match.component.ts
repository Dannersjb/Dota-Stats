import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { MatchService } from './match.service';
import { SteamProfileService } from '../../services/SteamProfile.service';

@Component({
  moduleId: module.id,
  selector: 'match',
  templateUrl: 'match.html',
  styleUrls: ['match.css'],
  providers: [ MatchService, SteamProfileService ]
})

export class MatchComponent implements OnInit, OnDestroy { 
  
    matchId : string;
    private sub: any;
    profileId = "76561197998443920";
    myheroes: Hero[];
    heroes: any[];
    radiant_win = '';
    matchInfo = '';
    radiantPlayers = ''; 
    direPlayers = '';
    profileInfo = '';
    dire_score = '';
    radiant_score = '';
    matchDuration = '';
    lobbyType = '';

    radiantTowerStatus = '';
    direTowerStatus = '';

    buildingColours : string[];

    info : string[];

    public generateArray(obj: any) {
      return Object.keys(obj).map((key) => {return obj[key]})
    }

    constructor(private matchService: MatchService, private steamProfileService : SteamProfileService, public http: Http, private route: ActivatedRoute) {
        
        //  this.http.get('http://localhost:8080/api/steam-profile/' + this.profileId).toPromise()
        //      .then(r => r.json())
        //      .then(r => this.profileInfo = r)
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.matchId = params['matchId']; // (+) converts string 'id' to a number
         this.http.get('http://localhost:8080/api/match/' + this.matchId).toPromise()
             .then(r => this.matchInfo = JSON.parse(r["_body"])[0]['_source'])
             .then(r => this.radiant_win = this.matchInfo['radiant_win'])
             .then(r => this.radiant_score = this.matchInfo['radiant_score'])
             .then(r => this.dire_score = this.matchInfo['dire_score'])
             .then(r => this.lobbyType = this.matchInfo['lobby_type'])
             .then(r => this.matchDuration = this.matchInfo['duration'])   
             
             .then(r => this.setTowerColours(this.matchInfo['tower_status_dire']))
             //this.matchInfo['tower_status_radiant']

             .then(r => this.radiantPlayers = this.matchInfo['players'].slice(0, 5))
             .then(r => this.direPlayers = this.matchInfo['players'].slice(5, 10))          
       });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    ngOnAfter() {
    }

    setTowerColours(direTowers : number) {
       // direTowers

    }
  }

  interface Player {
    account_id: number;
    player_slot: number;
    hero_id: number;
    item_0: number;
    item_1: number;
    item_2: number;
    item_3: number;
    item_4: number;
    item_5: number;
    backpack_0: number;
    backpack_1: number;
    backpack_2: number;
    kills: number;
    deaths: number;
    assists: number;
    leaver_status: number;
    last_hits: number;
    denies: number;
    gold_per_min: number;
    xp_per_min: number;
    level: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
    gold: number;
    gold_spent: number;
    scaled_hero_damage: number;
    scaled_tower_damage: number;
    scaled_hero_healing: number;
    //ability_upgrades : any;
  }

  interface Hero {
    
      name: string;
      id: number;

  }
