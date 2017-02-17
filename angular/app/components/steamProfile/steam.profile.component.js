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
var router_1 = require('@angular/router');
require('rxjs/add/operator/toPromise');
var SteamProfile_service_1 = require('../../services/SteamProfile.service');
var SteamProfile = (function () {
    function SteamProfile(route, http, steamProfileService) {
        this.route = route;
        this.http = http;
        this.steamProfileService = steamProfileService;
        this.profileInfo = '';
    }
    SteamProfile.prototype.ngOnInit = function () {
        this.http.get('http://localhost:8080/api').toPromise()
            .then(function (r) { return console.log(r); });
        //  .then(r => r.json())
        //  .then(r => this.profileInfo = r
        //ask for login
        //login
        //downloading matches
        //display profile info
        //select view matches or hav matches under
    };
    SteamProfile.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SteamProfile = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'match',
            template: "\n  <h1>Profile</h1>\n    <a href=\"http://localhost:8080/api/authenticate\"><img src=\"https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png\"/></a>\n   <ul *ngFor=\"let profile of profileInfo\">\n      <li>\n        <span><a href=\"{{profile.profileurl}}\" target=\"_blank\">{{profile.personaname}}</a></span>\n        <img src=\"{{profile.avatarmedium}}\" />\n        <span>{{profile.realname}}</span>\n      </li>\n    </ul>\n  ",
            providers: [SteamProfile_service_1.SteamProfileService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, SteamProfile_service_1.SteamProfileService])
    ], SteamProfile);
    return SteamProfile;
}());
exports.SteamProfile = SteamProfile;
//# sourceMappingURL=steam.profile.component.js.map