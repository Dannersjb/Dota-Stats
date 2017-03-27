import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { MatchService } from './match.service';

@Component({
  moduleId: module.id,
  selector: 'match-list',
  templateUrl: 'match_list.html',
  styleUrls: ['match.css'],
  providers: [ MatchService ]
})

export class MatchListComponent implements OnInit { 
  
    matchId : string;
    private sub: any;
    profileId = "76561197998443920";
    heroes: any[];
    radiant_win = '';
    matchInfo = '';
    profileInfo = '';
    dire_score = '';
    radiant_score = '';
    matchDuration = '';

    matchData : any[];

    info : string[];

    public generateArray(obj: any) {
      return Object.keys(obj).map((key) => {return obj[key]})
    }

    constructor(private matchService: MatchService, public http: Http, private route: ActivatedRoute) {
   
    }

    ngOnInit() {
        this.getAllMatchData()
    }

    getAllMatchData() {
        this.http.get('http://localhost:8080/api/matches').toPromise()
            .then(r => this.matchData = (JSON.parse(r["_body"])))
            //.then(r => console.log(this.matchData))
            .then(r => this.setMatchData(this.matchData)) 
        console.log(this.matchData);
    }

    getMatchDataByGameMode(gameMode : any) {
        this.http.get('http://localhost:8080/api/matches/game-mode?game_mode=' + gameMode).toPromise()
             .then(r => this.matchData = (JSON.parse(r["_body"])))
             .then(r => this.setMatchData(this.matchData))
    }

    getMatchDataByLobbyMode(lobbyType : any) {
        this.http.get('http://localhost:8080/api/matches/lobby-type?lobby_type=' + lobbyType).toPromise()
             .then(r => this.matchData = (JSON.parse(r["_body"])))
             .then(r => this.setMatchData(this.matchData))
    }

    setMatchData(items : any) {
        this.matchData = [];
        for (let item of items) {
            var date = new Date(item['_source']['start_time']*1000);
            item['_source']['start_time'] = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
            this.matchData.push(item['_source'])

        }
        console.log(this.matchData);
    }

    ngOnAfter() {
    }

  }