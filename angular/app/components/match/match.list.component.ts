import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { MatchService } from './match.service';
import { SteamProfileService } from '../../services/SteamProfile.service';

@Component({
  moduleId: module.id,
  selector: 'match-list',
  templateUrl: 'match_list.html',
  styleUrls: ['match.css'],
  providers: [ MatchService, SteamProfileService ]
})

export class MatchListComponent implements OnInit { 
  
    matchId : string;
    private sub: any;
    profileId = "76561197998443920";
    heroes: any[];
    radiant_win = '';
    matchInfo = '';
    radiantPlayers = ''; 
    direPlayers = '';
    profileInfo = '';
    dire_score = '';
    radiant_score = '';
    matchDuration = '';

    matchData : any[];

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
        this.getAllMatchData()
    }

    getAllMatchData() {
        this.http.get('http://localhost:8080/api/matches').toPromise()
            .then(r => this.matchData = (JSON.parse(r["_body"])))
            //.then(r => console.log(this.matchData))
            .then(r => this.setMatchData(this.matchData))
            .then(r => this.radiantPlayers = this.matchData['players'].slice(0, 5))
            .then(r => this.direPlayers = this.matchData['players'].slice(5, 10))    
        console.log(this.matchData);
    }

    getMatchDataByGameMode(gameMode : any) {
        this.http.get('http://localhost:8080/api/matches/game-mode/' + gameMode).toPromise()
             .then(r => this.matchData = (JSON.parse(r["_body"])))
             .then(r => this.setMatchData(this.matchData))
    }

    getMatchDataByLobbyMode(lobbyType : any) {
        this.http.get('http://localhost:8080/api/matches/lobby-type/' + lobbyType).toPromise()
             .then(r => this.matchData = (JSON.parse(r["_body"])))
             .then(r => this.setMatchData(this.matchData))
    }

    setMatchData(items : any) {
        this.matchData = [];
        for (let item of items) {
            this.matchData.push(item['_source'])
        }
        console.log(this.matchData);
    }

    ngOnAfter() {
    }

  }