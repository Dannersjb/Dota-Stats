import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HeroService } from '../hero/hero.service';

@Component({
  moduleId: module.id,
  selector: 'picks',
  templateUrl: 'picks.html',
  styleUrls: ['picks.css'],
  providers: [ HeroService ]
})

export class PicksComponent implements OnInit { 

    heroInfo = '';
    
    constructor(private heroService: HeroService, public http: Http) {

    }

      ngOnInit() {
         this.http.get('http://localhost:8080/api/heroes').toPromise()
             .then(r => this.heroInfo = JSON.parse(r["_body"])) 
             .then(r => console.log(this.heroInfo))     
             //.then(r => this.heroInfo = JSON.parse(r["_body"])[0]['_source'])      
    }

    
}



