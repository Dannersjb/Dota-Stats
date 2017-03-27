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
var picks_service_1 = require('../picks/picks.service');
var steam_profile_service_1 = require('../steamProfile/steam.profile.service');
var PicksComponent = (function () {
    function PicksComponent(pickService, http, steamProfileService) {
        this.pickService = pickService;
        this.http = http;
        this.steamProfileService = steamProfileService;
        this.heroInfo = '';
        this.profileInfo = '';
        this.model = new pick('New Team', null, null, null, null, null, '', 0, 0, 0, 0, 0, 0, 0, 0);
        this.slot1 = '';
        this.slot2 = '';
        this.slot3 = '';
        this.slot4 = '';
        this.slot5 = '';
        this.carry = 0;
        this.disable = 0;
        this.initiation = 0;
        this.nuke = 0;
        this.push = 0;
        this.durable = 0;
        this.support = 0;
        this.laneSupport = 0;
    }
    PicksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:8080/api/heroes').toPromise()
            .then(function (r) { return _this.heroInfo = JSON.parse(r["_body"]); });
        this.loadPickData();
        this.steamProfileService.checkLoggin().then(function (r) {
            _this.loggedIn = r;
            if (_this.loggedIn == true) {
                _this.loggedIn = true;
                _this.steamProfileService.getLoginSession()
                    .then(function (r) {
                    _this.profileInfo = r;
                    _this.model.author = _this.profileInfo['username'];
                });
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    PicksComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('.showDetails').click(function (e) {
                $(this).parent().parent().find('.details').toggle();
            });
        });
    };
    PicksComponent.prototype.pickNewTeam = function () {
        $('.new_team').slideToggle();
    };
    PicksComponent.prototype.onSelectChange = function (heroId, slot) {
        $(".heroimg" + slot).attr("src", "images/heroes/" + heroId + ".jpg");
        this.updateBars(heroId, slot);
    };
    PicksComponent.prototype.submitNewTeam = function () {
        var _this = this;
        $('.submit').html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>").attr("disabled", 'true');
        this.model.carry = this.carry * 100 / 5;
        this.model.disable = this.disable * 100 / 7;
        this.model.initiation = this.initiation * 100 / 3;
        this.model.nuke = this.nuke * 100 / 7;
        this.model.push = this.push * 100 / 3;
        this.model.durable = this.durable * 100 / 4;
        this.model.support = this.support * 100 / 6;
        this.model.laneSupport = this.laneSupport * 100 / 4;
        var body = this.model;
        this.http.post('http://localhost:8080/api/pick', body).subscribe(function () {
            setTimeout(function () {
                _this.updatePickData();
            }, 2000);
        });
    };
    PicksComponent.prototype.updatePickData = function () {
        var _this = this;
        $('.submit').html("Submit");
        $('.complete').fadeIn();
        setTimeout(function () {
            $('.complete').fadeOut();
        }, 5000);
        this.pickService.getPicks().then(function (pick) { return _this.picksInfo = pick; }).then(function () {
            setTimeout(function () {
                $('.showDetails').click(function (e) {
                    $(this).parent().parent().find('.details').slideToggle();
                });
            }, 0);
        });
    };
    PicksComponent.prototype.updateBars = function (heroId, slot) {
        var _this = this;
        var hero = '';
        this.http.get('http://localhost:8080/api/hero/' + heroId).toPromise()
            .then(function (r) { return hero = JSON.parse(r["_body"])[0]['_source']; })
            .then(function (r) {
            switch (parseInt(slot)) {
                case 1: {
                    if (_this.slot1 != '') {
                        console.log('yes last slot');
                        _this.removeProperties(_this.slot1);
                    }
                    _this.slot1 = hero;
                    _this.setProperties(hero);
                    console.log(_this.carry);
                    break;
                }
                case 2: {
                    if (_this.slot2 != '') {
                        _this.removeProperties(_this.slot2);
                    }
                    _this.slot2 = hero;
                    _this.setProperties(hero);
                    break;
                }
                case 3: {
                    if (_this.slot3 != '') {
                        _this.removeProperties(_this.slot3);
                    }
                    _this.slot3 = hero;
                    _this.setProperties(hero);
                    break;
                }
                case 4: {
                    if (_this.slot4 != '') {
                        _this.removeProperties(_this.slot4);
                    }
                    _this.slot4 = hero;
                    _this.setProperties(hero);
                    break;
                }
                case 5: {
                    if (_this.slot5 != '') {
                        _this.removeProperties(_this.slot5);
                    }
                    _this.slot5 = hero;
                    _this.setProperties(hero);
                    break;
                }
            }
        });
    };
    PicksComponent.prototype.setColour = function (width, property) {
        if ($(property + " .fill").hasClass('low')) {
            $(property + " .fill").removeClass('low');
        }
        if ($(property + " .fill").hasClass('medium')) {
            $(property + " .fill").removeClass('medium');
        }
        if ($(property + " .fill").hasClass('high')) {
            $(property + " .fill").removeClass('high');
        }
        if (width < 40 || (width > 170 && property == '.carry') || (width > 170 && property == '.support')) {
            $(property + " .fill").addClass('low');
        }
        else if (width > 40 && width < 70) {
            $(property + " .fill").addClass('medium');
        }
        else {
            $(property + " .fill").addClass('high');
        }
    };
    PicksComponent.prototype.setProperties = function (hero) {
        if (hero.hasOwnProperty('carry')) {
            this.carry += hero['carry'];
            var carryWidth = this.carry * 100 / 5;
            this.setColour(carryWidth, '.carry');
            $('.carry .fill').animate({
                width: carryWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('disable')) {
            this.disable += hero['disable'];
            var disableWidth = this.disable * 100 / 7;
            this.setColour(disableWidth, '.disable');
            $('.disable .fill').animate({
                width: disableWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('initiation')) {
            this.initiation += hero['initiation'];
            var initiationWidth = this.initiation * 100 / 3;
            this.setColour(initiationWidth, '.initiation');
            $('.initiation .fill').animate({
                width: initiationWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('nuke')) {
            this.nuke += hero['nuke'];
            var nukeWidth = this.nuke * 100 / 7;
            this.setColour(nukeWidth, '.nuke');
            $('.nuke .fill').animate({
                width: nukeWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('push')) {
            this.push += hero['push'];
            var pushWidth = this.push * 100 / 3;
            this.setColour(pushWidth, '.push');
            $('.push .fill').animate({
                width: pushWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('durable')) {
            this.durable += hero['durable'];
            var durableWidth = this.durable * 100 / 4;
            this.setColour(durableWidth, '.durable');
            $('.durable .fill').animate({
                width: durableWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('support')) {
            this.support += hero['support'];
            var supportWidth = this.support * 100 / 6;
            this.setColour(supportWidth, '.support');
            $('.support .fill').animate({
                width: supportWidth + "%"
            }, 1000);
        }
        if (hero.hasOwnProperty('laneSupport')) {
            this.laneSupport += hero['laneSupport'];
            var laneSupportWidth = this.laneSupport * 100 / 4;
            this.setColour(laneSupportWidth, '.laneSupport');
            $('.laneSupport .fill').animate({
                width: laneSupportWidth + "%"
            }, 1000);
        }
    };
    PicksComponent.prototype.removeProperties = function (hero) {
        if (hero.hasOwnProperty('carry')) {
            this.carry -= hero['carry'];
            var carryWidth = this.carry * 100 / 5;
            this.setColour(carryWidth, '.carry');
            $('.carry .fill').animate({
                width: carryWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('disable')) {
            this.disable -= hero['disable'];
            var disableWidth = this.disable * 100 / 7;
            this.setColour(disableWidth, '.disable');
            $('.disable .fill').animate({
                width: disableWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('initiation')) {
            this.initiation -= hero['initiation'];
            var initiationWidth = this.initiation * 100 / 3;
            this.setColour(initiationWidth, '.initiation');
            $('.initiation .fill').animate({
                width: initiationWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('nuke')) {
            this.nuke -= hero['nuke'];
            var nukeWidth = this.nuke * 100 / 7;
            this.setColour(nukeWidth, '.nuke');
            $('.nuke .fill').animate({
                width: nukeWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('push')) {
            this.push -= hero['push'];
            var pushWidth = this.push * 100 / 3;
            this.setColour(pushWidth, '.push');
            $('.push .fill').animate({
                width: pushWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('durable')) {
            this.durable -= hero['durable'];
            var durableWidth = this.durable * 100 / 4;
            this.setColour(durableWidth, '.durable');
            $('.durable .fill').animate({
                width: durableWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('support')) {
            this.support -= hero['support'];
            var supportWidth = this.support * 100 / 6;
            this.setColour(supportWidth, '.support');
            $('.support .fill').animate({
                width: supportWidth + "%"
            }, 200);
        }
        if (hero.hasOwnProperty('laneSupport')) {
            this.laneSupport -= hero['laneSupport'];
            var laneSupportWidth = this.laneSupport * 100 / 4;
            this.setColour(laneSupportWidth, '.laneSupport');
            $('.laneSupport .fill').animate({
                width: laneSupportWidth + "%"
            }, 200);
        }
    };
    PicksComponent.prototype.loadPickData = function () {
        var _this = this;
        this.pickService.getPicks().then(function (pick) { return _this.picksInfo = pick; }).then(function () {
            setTimeout(function () {
                $('.showDetails').click(function (e) {
                    $(this).parent().parent().find('.details').slideToggle();
                });
            }, 0);
        });
    };
    Object.defineProperty(PicksComponent.prototype, "currentPick", {
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    PicksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'picks',
            templateUrl: 'picks.html',
            styleUrls: ['picks.css'],
            providers: [picks_service_1.PickService, steam_profile_service_1.SteamProfileService]
        }), 
        __metadata('design:paramtypes', [picks_service_1.PickService, http_1.Http, steam_profile_service_1.SteamProfileService])
    ], PicksComponent);
    return PicksComponent;
}());
exports.PicksComponent = PicksComponent;
var pick = (function () {
    function pick(teamName, slot1, slot2, slot3, slot4, slot5, author, carry, disable, initiation, nuke, push, durable, support, laneSupport) {
        this.teamName = teamName;
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
        this.slot4 = slot4;
        this.slot5 = slot5;
        this.author = author;
        this.carry = carry;
        this.disable = disable;
        this.initiation = initiation;
        this.nuke = nuke;
        this.push = push;
        this.durable = durable;
        this.support = support;
        this.laneSupport = laneSupport;
    }
    return pick;
}());
exports.pick = pick;
//# sourceMappingURL=picks.component.js.map