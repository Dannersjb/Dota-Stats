"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var hero_service_1 = require('./hero.service');
var HeroComponent = (function () {
    function HeroComponent(heroService, http) {
        this.heroService = heroService;
        this.http = http;
        this.matchId = "2938613600";
        this.heroInfo = '';
    }
    HeroComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    // public callGet(matchId : string) {
    //   console.log("get button clicked");
    //   this.http.get('http://localhost:8080/api/match/' + matchId).toPromise()
    //     .then(r => r.json())
    //     .then(r => this.players = r)
    //     console.log(this.players);
    // }
    HeroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/heroes').toPromise()
            .then(function (r) { return _this.heroInfo = JSON.parse(r["_body"]); })
            .then(function (r) { return console.log(_this.heroInfo); });
        //.then(r => this.heroInfo = JSON.parse(r["_body"])[0]['_source'])      
    };
    HeroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero',
            template: "\n  <h1>Heroes</h1>\n    <span class=\"hero\" *ngFor=\"let hero of heroInfo\">\n      <img src=\"images/heroes/{{hero._source.id}}.jpg\" />\n      <span>{{hero._source.name}}</span>\n    </span>\n  ",
            styleUrls: ['hero.css'],
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, http_1.Http])
    ], HeroComponent);
    return HeroComponent;
}());
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map