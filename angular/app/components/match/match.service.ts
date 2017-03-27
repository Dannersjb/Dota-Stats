import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MatchService {
    key = 'BC047CF7E5D0CF76E35D7F63E6E07392';
    matchInfo = '';

    constructor(private http: Http) {
        console.log('MatchService Initialized...');
        this.getPosts("2938613600");
    }

    // does not return anything?
    getPosts(matchId : string) { 
       this.http.get('http://localhost:8080/api/match/' + matchId).toPromise()   
            .then(r => r.json())
            .then(r => this.matchInfo = r)
    }

    getUserMatchData(userId : string) {
         return this.http.get('http://localhost:8080/api/matches/user/' + userId)
            .toPromise()
            .then(r => { return JSON.parse(r["_body"]) })  
    }

}