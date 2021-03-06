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
var MatchComponent = (function () {
    function MatchComponent(matchService, http, route) {
        this.matchService = matchService;
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
                .then(function (r) {
                console.log(_this.matchInfo['players']);
                _this.getNetworth(_this.matchInfo['players']);
            });
            setTimeout(function () {
                _this.compressResults();
            }, 1000);
        });
    };
    MatchComponent.prototype.getNetworth = function (players) {
        var _loop_1 = function(player) {
            player['net_worth'] = player['gold'];
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_0']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_1']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_2']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_3']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_4']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['item_5']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['backpack_0']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['backpack_1']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
            this_1.http.get('http://localhost:8080/api/item/id/' + player['backpack_2']).toPromise().then(function (r) {
                var slot = JSON.parse(r["_body"]);
                if (slot.hasOwnProperty(0)) {
                    player['net_worth'] += slot[0]['_source']['cost'];
                }
            });
        };
        var this_1 = this;
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            _loop_1(player);
        }
    };
    MatchComponent.prototype.compressResults = function () {
        var _loop_2 = function(player) {
            if (player['net_worth'] > 999) {
                console.log(player['net_worth']);
                player['net_worth'] = Math.round(player['net_worth'] / 100) / 10;
                player['net_worth'] = player['net_worth'] + "K";
            }
            if (player['hero_damage'] > 999) {
                player['hero_damage'] = Math.round(player['hero_damage'] / 100) / 10;
                player['hero_damage'] = player['hero_damage'] + "K";
            }
            if (player['tower_damage'] > 999) {
                player['tower_damage'] = Math.round(player['tower_damage'] / 100) / 10;
                player['tower_damage'] = player['tower_damage'] + "K";
            }
            if (player['hero_healing'] > 999) {
                player['hero_healing'] = Math.round(player['hero_healing'] / 100) / 10;
                player['hero_healing'] = player['hero_healing'] + "K";
            }
            this_2.http.get('http://localhost:8080/api/user/' + player['account_id']).toPromise().then(function (r) {
                var userDetails = JSON.parse(r['_body']);
                if (userDetails.hasOwnProperty(0)) {
                    userDetails = userDetails[0]['_source'];
                    player['username'] = userDetails['personaname'];
                    player['avatarmedium'] = userDetails['avatarmedium'];
                    player['profileurl'] = userDetails['profileurl'];
                }
            });
        };
        var this_2 = this;
        for (var _i = 0, _a = this.matchInfo['players']; _i < _a.length; _i++) {
            var player = _a[_i];
            _loop_2(player);
        }
        this.radiantPlayers = this.matchInfo['players'].slice(0, 5);
        this.direPlayers = this.matchInfo['players'].slice(5, 10);
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
            providers: [match_service_1.MatchService]
        }), 
        __metadata('design:paramtypes', [match_service_1.MatchService, http_1.Http, router_1.ActivatedRoute])
    ], MatchComponent);
    return MatchComponent;
}());
exports.MatchComponent = MatchComponent;
//# sourceMappingURL=match.component.js.map