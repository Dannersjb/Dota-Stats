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
var ItemsComponent = (function () {
    function ItemsComponent(http) {
        this.http = http;
        this.itemInfo = '';
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/items').toPromise()
            .then(function (r) { return _this.itemInfo = JSON.parse(r["_body"]); })
            .then(function (r) { return console.log(_this.itemInfo); });
        //.then(r => this.itemInfo = JSON.parse(r["_body"])[0]['_source'])      
    };
    ItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'items',
            template: "\n  <h1>Items</h1>\n   <span class=\"item\" *ngFor=\"let item of itemInfo\">\n      <img src=\"images/items/{{item._source.id}}.jpg\" />\n    </span>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=items.component.js.map