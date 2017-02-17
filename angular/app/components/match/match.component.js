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
var match_service_1 = require('./match.service');
var SteamProfile_service_1 = require('../../services/SteamProfile.service');
var MatchComponent = (function () {
    function MatchComponent(matchService, steamProfileService, http, route) {
        this.matchService = matchService;
        this.steamProfileService = steamProfileService;
        this.http = http;
        this.route = route;
        this.profileId = "76561197998443920";
        this.radiant_win = '';
        this.matchInfo = '';
        this.radiantPlayers = '';
        this.direPlayers = '';
        this.profileInfo = '';
        this.dire_score = '';
        this.radiant_score = '';
        this.matchDuration = '';
        this.lobbyType = '';
        this.radiantTowerStatus = '';
        this.direTowerStatus = '';
        //  this.http.get('http://localhost:8080/api/steam-profile/' + this.profileId).toPromise()
        //      .then(r => r.json())
        //      .then(r => this.profileInfo = r)
    }
    MatchComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    MatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.matchId = params['matchId']; // (+) converts string 'id' to a number
            _this.http.get('http://localhost:8080/api/match/' + _this.matchId).toPromise()
                .then(function (r) { return _this.matchInfo = JSON.parse(r["_body"])[0]['_source']; })
                .then(function (r) { return _this.radiant_win = _this.matchInfo['radiant_win']; })
                .then(function (r) { return _this.radiant_score = _this.matchInfo['radiant_score']; })
                .then(function (r) { return _this.dire_score = _this.matchInfo['dire_score']; })
                .then(function (r) { return _this.lobbyType = _this.matchInfo['lobby_type']; })
                .then(function (r) { return _this.matchDuration = _this.matchInfo['duration']; })
                .then(function (r) { return _this.setTowerColours(_this.matchInfo['tower_status_dire']); })
                .then(function (r) { return _this.radiantPlayers = _this.matchInfo['players'].slice(0, 5); })
                .then(function (r) { return _this.direPlayers = _this.matchInfo['players'].slice(5, 10); });
        });
    };
    MatchComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MatchComponent.prototype.ngOnAfter = function () {
    };
    MatchComponent.prototype.setTowerColours = function (direTowers) {
        // direTowers
    };
    MatchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'match',
            templateUrl: 'match.html',
            styleUrls: ['match.css'],
            providers: [match_service_1.MatchService, SteamProfile_service_1.SteamProfileService]
        }), 
        __metadata('design:paramtypes', [match_service_1.MatchService, SteamProfile_service_1.SteamProfileService, http_1.Http, router_1.ActivatedRoute])
    ], MatchComponent);
    return MatchComponent;
}());
exports.MatchComponent = MatchComponent;
//# sourceMappingURL=match.component.js.map