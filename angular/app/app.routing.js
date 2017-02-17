"use strict";
var router_1 = require('@angular/router');
var hero_component_1 = require('./components/hero/hero.component');
var match_component_1 = require('./components/match/match.component');
var match_list_component_1 = require('./components/match/match.list.component');
var picks_component_1 = require('./components/picks/picks.component');
var items_component_1 = require('./components/items/items.component');
var steam_profile_component_1 = require('./components/steamProfile/steam.profile.component');
var appRoutes = [
    {
        path: 'matches',
        component: match_list_component_1.MatchListComponent
    },
    {
        path: 'match/:matchId',
        component: match_component_1.MatchComponent
    },
    {
        path: '',
        component: hero_component_1.HeroComponent
    },
    {
        path: 'heroes',
        component: hero_component_1.HeroComponent
    },
    {
        path: 'items',
        component: items_component_1.ItemsComponent
    },
    {
        path: 'verify',
        component: steam_profile_component_1.SteamProfile
    },
    {
        path: 'profile',
        component: steam_profile_component_1.SteamProfile
    },
    {
        path: 'picks',
        component: picks_component_1.PicksComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map