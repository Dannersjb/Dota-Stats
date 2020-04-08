import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroComponent } from './components/hero/hero.component';
import { MatchComponent } from './components/match/match.component';
import { MatchListComponent } from './components/match/match.list.component';
import { PicksComponent } from './components/picks/picks.component';
import { ItemsComponent } from './components/items/items.component';
import { SteamProfile } from './components/steamProfile/steam.profile.component';

const appRoutes: Routes = [
    {
        path: 'matches',
        component: MatchListComponent
    },
    {
        path: 'match/:matchId',
        component: MatchComponent
    },
    {
        path: 'home',
        component: HeroComponent
    }, 
    {
        path: 'heroes',
        component: HeroComponent
    }, 
    {
        path: 'items',
        component: ItemsComponent
    }, 
    {
        path: 'verify',
        component: SteamProfile
    },
    {
        path: 'profile',
        component: SteamProfile
    },
    {
        path: 'picks',
        component: PicksComponent
    }
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);