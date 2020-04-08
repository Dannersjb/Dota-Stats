import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { MatchComponent } from './components/match/match.component';
import { MatchListComponent } from './components/match/match.list.component';
import { PicksComponent } from './components/picks/picks.component';
import { ItemsComponent } from './components/items/items.component';
import { SteamProfile } from './components/steamProfile/steam.profile.component';
import { routing } from './app.routing';

@NgModule({
  imports:  [ 
    routing,
    BrowserModule, 
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
     AppComponent, 
     HeroComponent,
     MatchComponent,
     MatchListComponent,
     SteamProfile,
     PicksComponent,
     ItemsComponent
  ],
  bootstrap:  [ 
    AppComponent 
  ]
})
export class AppModule { }
