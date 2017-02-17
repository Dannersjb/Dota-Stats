import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';



@Component({
  moduleId: module.id,
  selector: 'items',
  template: `
  <h1>Items</h1>
   <span class="item" *ngFor="let item of itemInfo">
      <img src="images/items/{{item._source.id}}.jpg" />
    </span>
  `
})

export class ItemsComponent implements OnInit { 

    itemInfo = '';

    constructor(public http: Http) {

    }

        ngOnInit() {
         this.http.get('http://localhost:8080/api/items').toPromise()
             .then(r => this.itemInfo = JSON.parse(r["_body"])) 
             .then(r => console.log(this.itemInfo))     
             //.then(r => this.itemInfo = JSON.parse(r["_body"])[0]['_source'])      
    }


  }
