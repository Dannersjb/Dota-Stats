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
require('rxjs/add/operator/map');
var SteamProfileService = (function () {
    function SteamProfileService(http, router) {
        this.http = http;
        this.key = 'BC047CF7E5D0CF76E35D7F63E6E07392';
        this.profileInfo = '';
        console.log('SteamService Initialized...');
        this.router = router;
    }
    SteamProfileService.prototype.checkLoggin = function () {
        var _this = this;
        var sessionID = document.cookie.replace("connect.sid=s%3A", "");
        sessionID = sessionID.substring(0, 32);
        return this.http.get('http://localhost:8080/api/session')
            .toPromise()
            .then(function (r) {
            _this.profileInfo = JSON.parse(r['_body']);
            if (_this.profileInfo.hasOwnProperty(sessionID) && _this.profileInfo[sessionID] != null) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    SteamProfileService.prototype.getLoginSession = function () {
        var _this = this;
        var sessionID = document.cookie.replace("connect.sid=s%3A", "");
        sessionID = sessionID.substring(0, 32);
        return this.http.get('http://localhost:8080/api/session')
            .toPromise()
            .then(function (r) {
            _this.profileInfo = JSON.parse(r['_body']);
            _this.profileInfo = JSON.parse(_this.profileInfo[sessionID]);
            _this.profileInfo = _this.profileInfo['steamUser'];
            _this.loggedIn = true;
            return _this.profileInfo;
        });
    };
    SteamProfileService.prototype.logout = function () {
        var _this = this;
        {
            var sessionID = document.cookie.replace("connect.sid=s%3A", "");
            sessionID = sessionID.substring(0, 32);
            this.http.delete('http://localhost:8080/api/delete-session/' + sessionID).subscribe();
            $('.account li').html("<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i>");
            setTimeout(function () {
                $('.account li').html('<a href="http://localhost:8080/api/authenticate" class="login" routerLinkActive="active"><i class="fa fa-steam" aria-hidden="true"></i> <span>Login with Steam</span></a>');
                _this.router.navigate(['/home']);
            }, 500);
        }
    };
    SteamProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SteamProfileService);
    return SteamProfileService;
}());
exports.SteamProfileService = SteamProfileService;
//# sourceMappingURL=steam.profile.service.js.map