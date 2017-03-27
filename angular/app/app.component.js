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
var steam_profile_service_1 = require('./components/steamProfile/steam.profile.service');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(steamProfileService, router) {
        var _this = this;
        this.steamProfileService = steamProfileService;
        this.profileInfo = '';
        this.profileImages = '';
        router.events.subscribe(function (val) {
            _this.ngOnInit();
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.steamProfileService.checkLoggin().then(function (r) {
            _this.loggedIn = r;
            if (_this.loggedIn == true) {
                _this.loggedIn = true;
                _this.steamProfileService.getLoginSession()
                    .then(function (r) {
                    _this.profileInfo = r;
                    _this.profileImages = _this.profileInfo['avatar'];
                });
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div class=\"menu_overlay\">\n    <div class=\"menu_container\">\n        <div class=\"menu_icon\"><a routerLink=\"/home\" routerLinkActive=\"active\"><img src=\"images/dota_icon.png\" /></a></div>\n        <ul class=\"menu\">\n          <li><a routerLink=\"/home\" routerLinkActive=\"active\">Home</a></li>\n          <li><a routerLink=\"/heroes\" routerLinkActive=\"active\">Heroes</a></li>\n          <li><a routerLink=\"/items\" routerLinkActive=\"active\">Items</a></li>\n          <li><a routerLink=\"/matches\" routerLinkActive=\"active\">Matches</a></li>\n          <li><a routerLink=\"/picks\" routerLinkActive=\"active\">Picks</a></li>\n        </ul>\n        <ul class=\"account\">\n          <li *ngIf=\"loggedIn==true\">\n            <div class=\"account_image\"><img src=\"{{profileImages.small}}\" /></div>\n            <a routerLink=\"/profile\" routerLinkActive=\"active\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i> Profile</a>\n            <a (click)=\"steamProfileService.logout()\" routerLinkActive=\"active\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> Logout</a>\n          </li>\n          <li *ngIf=\"loggedIn==false\">\n            <a href=\"http://localhost:8080/api/authenticate\" class=\"login\" routerLinkActive=\"active\"><i class=\"fa fa-steam\" aria-hidden=\"true\"></i> <span>Login with Steam</span></a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"page\">\n      <router-outlet></router-outlet>\n    </div>\n    <footer>\n      <p>Dota Stats</p>\n    </footer>",
            providers: [steam_profile_service_1.SteamProfileService]
        }), 
        __metadata('design:paramtypes', [steam_profile_service_1.SteamProfileService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map