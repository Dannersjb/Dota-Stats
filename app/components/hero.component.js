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
var hero_service_1 = require('../services/hero.service');
var HeroComponent = (function () {
    function HeroComponent(heroService) {
        var _this = this;
        this.heroService = heroService;
        this.heroService.getPosts().subscribe(function (res) {
            _this.myheroes = _this.generateArray(res);
            //let data = res.json();
            console.log(_this.myheroes);
        });
    }
    HeroComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    HeroComponent = __decorate([
        core_1.Component({
            selector: 'hero',
            template: "\n  <h1>Dota API</h1>\n    <div *ngFor=\"let hero of myheroes\">\n      <div *ngFor=\"let v of generateArray(hero)\">\n        <div *ngFor=\"let h of generateArray(v)\">\n            <p>{{h.name}}</p>\n        </div>\n      </div>\n    </div>\n  \n  ",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroComponent);
    return HeroComponent;
}());
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map