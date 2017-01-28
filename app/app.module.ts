import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroComponent } from './components/hero.component';

@NgModule({
  imports:  [ 
    BrowserModule, 
    HttpModule,
  ],
  declarations: [
     AppComponent, 
     HeroComponent
  ],
  bootstrap:  [ 
    AppComponent 
  ]
})
export class AppModule { }
