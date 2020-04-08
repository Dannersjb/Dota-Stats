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
var steam_profile_service_1 = require('./steam.profile.service');
var match_service_1 = require('../match/match.service');
var picks_service_1 = require('../picks/picks.service');
var SteamProfile = (function () {
    function SteamProfile(route, http, steamProfileService, matchService, pickService) {
        this.route = route;
        this.http = http;
        this.steamProfileService = steamProfileService;
        this.matchService = matchService;
        this.pickService = pickService;
        this.profileInfo = '';
        this.profileImages = '';
        this.total_games = 0;
        this.total_wins = 0;
        this.win_percent = "";
        this.total_picks = 0;
    }
    SteamProfile.prototype.ngOnInit = function () {
        var _this = this;
        console.log("cookies : " + document.cookie);
        this.steamProfileService.checkLoggin().then(function (r) {
            _this.loggedIn = r;
            if (_this.loggedIn == true) {
                _this.loggedIn = true;
                _this.steamProfileService.getLoginSession()
                    .then(function (r) {
                    _this.profileInfo = r;
                    _this.profileImages = _this.profileInfo['avatar'];
                    _this.getLatestGames(_this.profileInfo['steamid32']);
                    _this.getUserPicks();
                    $('.profile_menu li a').click(function (e) {
                        e.preventDefault();
                        if (!$(this).hasClass('.open')) {
                            var openItem = $('.profile_menu li a.open').attr('href');
                            $('.profile_menu li a.open').removeClass('open');
                            $(openItem).slideUp();
                            var closedItem = $(this).attr('href');
                            $(this).addClass('open');
                            $(closedItem).slideDown();
                        }
                    });
                });
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    SteamProfile.prototype.getLatestGames = function (steamId) {
        var _this = this;
        this.matchService.getUserMatchData(steamId).then(function (r) {
            _this.matchData = r;
            _this.setMatchData(_this.matchData);
        });
    };
    SteamProfile.prototype.downloadLatestGames = function (steamId) {
        var _this = this;
        $('.download').html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>").attr("disabled", 'true');
        this.http.get('http://localhost:8080/api/match-history-download/' + steamId).subscribe(function () {
            setTimeout(function () {
                _this.getLatestGames(_this.profileInfo['steamid32']);
                $('.download').html("Download Matches");
                if (_this.matchData.length > 0) {
                    $('.complete').fadeIn();
                    setTimeout(function () {
                        $('.complete').fadeOut();
                    }, 5000);
                }
                else {
                    $('.failed').fadeIn();
                    setTimeout(function () {
                        $('.failed').fadeOut();
                    }, 5000);
                }
            }, 2000);
        });
    };
    SteamProfile.prototype.setMatchData = function (items) {
        this.matchData = [];
        this.total_wins = 0;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var date = new Date(item['_source']['start_time'] * 1000);
            item['_source']['start_time'] = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
            var radiant_win = item['_source']['radiant_win'];
            var players = item['_source']['players'];
            var i = 0;
            for (var _a = 0, players_1 = players; _a < players_1.length; _a++) {
                var player = players_1[_a];
                i++;
                if (player['account_id'] == this.profileInfo['steamid32']) {
                    item['_source']['profile_hero'] = player['hero_id'];
                    if (i < 5 && radiant_win == true) {
                        this.total_wins++;
                        item['_source']['win'] = true;
                    }
                    else if (i > 5 && radiant_win == false) {
                        this.total_wins++;
                        item['_source']['win'] = true;
                    }
                    else {
                        item['_source']['win'] = false;
                    }
                }
            }
            this.matchData.push(item['_source']);
        }
        this.total_games = this.matchData.length;
        this.win_percent = (this.total_wins * 100 / this.total_games).toFixed(2);
    };
    SteamProfile.prototype.getUserPicks = function () {
        var _this = this;
        this.pickService.getUserPicks(this.profileInfo['username']).then(function (pick) { _this.picksInfo = pick; _this.total_picks = _this.picksInfo.length; });
    };
    SteamProfile.prototype.deletePick = function (pickId) {
        var _this = this;
        $('.delete').html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>").attr("disabled", 'true');
        console.log(pickId);
        this.http.delete('http://localhost:8080/api/delete-pick/' + pickId).subscribe(function () { });
        setTimeout(function () {
            $('.deleted').fadeIn();
            _this.getUserPicks();
        }, 2000);
        setTimeout(function () {
            $('.deleted').fadeOut();
        }, 5000);
    };
    SteamProfile.prototype.ngOnDestroy = function () {
        //this.sub.unsubscribe();
    };
    SteamProfile = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'match',
            templateUrl: 'profile.html',
            styleUrls: ['profile.css'],
            providers: [steam_profile_service_1.SteamProfileService, match_service_1.MatchService, picks_service_1.PickService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, steam_profile_service_1.SteamProfileService, match_service_1.MatchService, picks_service_1.PickService])
    ], SteamProfile);
    return SteamProfile;
}());
exports.SteamProfile = SteamProfile;
//# sourceMappingURL=steam.profile.component.js.map