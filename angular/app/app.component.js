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
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div class=\"menu_container\">\n      <ul>\n        <li><a routerLink=\"/\" routerLinkActive=\"active\">Home</a></li>\n        <li><a routerLink=\"/heroes\" routerLinkActive=\"active\">Heroes</a></li>\n        <li><a routerLink=\"/items\" routerLinkActive=\"active\">Items</a></li>\n        <li><a routerLink=\"/matches\" routerLinkActive=\"active\">Matches</a></li>\n        <li><a routerLink=\"/picks\" routerLinkActive=\"active\">Picks</a></li>\n        <li><a routerLink=\"/profile\" routerLinkActive=\"active\">Profile</a></li>\n      </ul>\n    </div>\n    <div class=\"page\">\n      <router-outlet></router-outlet>\n    </div>\n    <footer>\n      <p>Dota Stats</p>\n    </footer>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map