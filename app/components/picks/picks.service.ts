import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PickService {

    constructor(private http: Http) {
        console.log('PickService Initialized...');
    }

    getPicks() { 
        return this.http.get('http://localhost:8080/api/picks')
            .toPromise()
            .then(r => { return JSON.parse(r["_body"]) })  
    }

    getUserPicks(userName : any) { 
        return this.http.get('http://localhost:8080/api/picks/user/' + userName)
            .toPromise()
            .then(r => { return JSON.parse(r["_body"]) })  
    }

}