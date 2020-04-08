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
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var SteamProfileService = (function () {
    function SteamProfileService(http) {
        this.http = http;
        this.key = 'BC047CF7E5D0CF76E35D7F63E6E07392';
        this.matchInfo = '';
        console.log('MatchService Initialized...');
        this.getPosts("2938613600");
    }
    // does not return anything?
    SteamProfileService.prototype.getPosts = function (profileId) {
        var _this = this;
        this.http.get('http://localhost:8080/api/steam-profile/' + profileId).toPromise()
            .then(function (r) { return r.json(); })
            .then(function (r) { return _this.matchInfo = r; });
    };
    SteamProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SteamProfileService);
    return SteamProfileService;
}());
exports.SteamProfileService = SteamProfileService;
//# sourceMappingURL=SteamProfile.service.js.map