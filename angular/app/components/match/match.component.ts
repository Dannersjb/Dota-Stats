import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { MatchService } from './match.service';

@Component({
  moduleId: module.id,
  selector: 'match',
  templateUrl: 'match.html',
  styleUrls: ['match.css'],
  providers: [ MatchService ]
})

export class MatchComponent implements OnInit, OnDestroy { 
  
    matchId : string;
    private sub: any;
    profileId = "76561197998443920";
    myheroes: Hero[];
    heroes: any[];
    radiant_win = '';
    public matchInfo = '';
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

    constructor(private matchService: MatchService, public http: Http, private route: ActivatedRoute) {
        
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
             .then(r => { 
                  console.log(this.matchInfo['players']);
                  this.getNetworth(this.matchInfo['players']);
              })
              setTimeout(() => {   
                this.compressResults()
              }, 1000 );
       });
    }

    getNetworth(players : any) {
      for (let player of players) {
        player['net_worth'] = player['gold'];
        this.http.get('http://localhost:8080/api/item/id/' + player['item_0']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        });
        this.http.get('http://localhost:8080/api/item/id/' + player['item_1']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        });
        this.http.get('http://localhost:8080/api/item/id/' + player['item_2']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        });
        this.http.get('http://localhost:8080/api/item/id/' + player['item_3']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        });
        this.http.get('http://localhost:8080/api/item/id/' + player['item_4']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        });
        this.http.get('http://localhost:8080/api/item/id/' + player['item_5']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        }) 
        this.http.get('http://localhost:8080/api/item/id/' + player['backpack_0']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        })
        this.http.get('http://localhost:8080/api/item/id/' + player['backpack_1']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        })
        this.http.get('http://localhost:8080/api/item/id/' + player['backpack_2']).toPromise().then(r => {
          var slot = JSON.parse(r["_body"]);
          if(slot.hasOwnProperty(0)) {
            player['net_worth'] += slot[0]['_source']['cost'];
          }
        })

      }
    }

    compressResults() {
      for(let player of this.matchInfo['players']) {
        if( player['net_worth'] > 999) {
          console.log(player['net_worth']);
          player['net_worth'] = Math.round(player['net_worth'] / 100 ) / 10; 
          player['net_worth'] = player['net_worth'] + "K";
        } 
        if(player['hero_damage'] > 999) {
          player['hero_damage'] = Math.round(player['hero_damage'] / 100 ) / 10;  
          player['hero_damage'] = player['hero_damage'] + "K";
        }  
        if(player['tower_damage'] > 999) {
          player['tower_damage'] = Math.round(player['tower_damage'] / 100 ) / 10;
          player['tower_damage'] = player['tower_damage'] + "K"
        }
        if(player['hero_healing'] > 999) {
          player['hero_healing'] = Math.round(player['hero_healing'] / 100 ) / 10;
          player['hero_healing'] = player['hero_healing'] + "K"
        }
        this.http.get('http://localhost:8080/api/user/' + player['account_id']).toPromise().then(r => {
           var userDetails = JSON.parse(r['_body']);
           if (userDetails.hasOwnProperty(0)) {
              userDetails = userDetails[0]['_source'];
              player['username'] = userDetails['personaname'];
              player['avatarmedium'] = userDetails['avatarmedium'];
              player['profileurl'] = userDetails['profileurl'];
           }

        })
      }

      this.radiantPlayers = this.matchInfo['players'].slice(0, 5);
      this.direPlayers = this.matchInfo['players'].slice(5, 10);
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

  interface Hero {
    
      name: string;
      id: number;

  }
