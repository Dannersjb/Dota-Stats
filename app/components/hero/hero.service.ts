import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {
    key = 'BC047CF7E5D0CF76E35D7F63E6E07392';

    constructor(private http: Http) {
        console.log('HeroService Initialized...');
    }

    getPosts() { 
        return this.http.get('https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=' + this.key)
            .map(res => {
                let data = res.json();
                return data;
            });
    }
}