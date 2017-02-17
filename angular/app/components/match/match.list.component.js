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
var MatchListComponent = (function () {
    function MatchListComponent(matchService, steamProfileService, http, route) {
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
        //  this.http.get('http://localhost:8080/api/steam-profile/' + this.profileId).toPromise()
        //      .then(r => r.json())
        //      .then(r => this.profileInfo = r)
    }
    MatchListComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    MatchListComponent.prototype.ngOnInit = function () {
        this.getAllMatchData();
    };
    MatchListComponent.prototype.getAllMatchData = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/matches').toPromise()
            .then(function (r) { return _this.matchData = (JSON.parse(r["_body"])); })
            .then(function (r) { return _this.setMatchData(_this.matchData); })
            .then(function (r) { return _this.radiantPlayers = _this.matchData['players'].slice(0, 5); })
            .then(function (r) { return _this.direPlayers = _this.matchData['players'].slice(5, 10); });
        console.log(this.matchData);
    };
    MatchListComponent.prototype.getMatchDataByGameMode = function (gameMode) {
        var _this = this;
        this.http.get('http://localhost:8080/api/matches/game-mode/' + gameMode).toPromise()
            .then(function (r) { return _this.matchData = (JSON.parse(r["_body"])); })
            .then(function (r) { return _this.setMatchData(_this.matchData); });
    };
    MatchListComponent.prototype.getMatchDataByLobbyMode = function (lobbyType) {
        var _this = this;
        this.http.get('http://localhost:8080/api/matches/lobby-type/' + lobbyType).toPromise()
            .then(function (r) { return _this.matchData = (JSON.parse(r["_body"])); })
            .then(function (r) { return _this.setMatchData(_this.matchData); });
    };
    MatchListComponent.prototype.setMatchData = function (items) {
        this.matchData = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.matchData.push(item['_source']);
        }
        console.log(this.matchData);
    };
    MatchListComponent.prototype.ngOnAfter = function () {
    };
    MatchListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'match-list',
            templateUrl: 'match_list.html',
            styleUrls: ['match.css'],
            providers: [match_service_1.MatchService, SteamProfile_service_1.SteamProfileService]
        }), 
        __metadata('design:paramtypes', [match_service_1.MatchService, SteamProfile_service_1.SteamProfileService, http_1.Http, router_1.ActivatedRoute])
    ], MatchListComponent);
    return MatchListComponent;
}());
exports.MatchListComponent = MatchListComponent;
//# sourceMappingURL=match.list.component.js.map