import { Component, Pipe, PipeTransform } from '@angular/core';
import { HeroService } from '../services/hero.service';



@Component({
  selector: 'hero',
  template: `
  <h1>Dota API</h1>
    <div *ngFor="let hero of myheroes">
      <div *ngFor="let v of generateArray(hero)">
        <div *ngFor="let h of generateArray(v)">
            <p>{{h.name}}</p>
        </div>
      </div>
    </div>
  
  `,
  providers: [ HeroService ]
})

export class HeroComponent { 
    
    myheroes: Hero[];
    heroes: any[];

    public generateArray(obj: any) {
      return Object.keys(obj).map((key) => {return obj[key]})
    }

    constructor(private heroService: HeroService) {


      this.heroService.getPosts().subscribe(res => {
            this.myheroes = this.generateArray(res);
            //let data = res.json();
            console.log(this.myheroes);
      });
    }

  }

  interface Hero {
    
      name: string;
      id: number;

  }
