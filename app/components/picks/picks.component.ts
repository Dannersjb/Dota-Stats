import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PickService } from '../picks/picks.service';
import { ChangeDetectorRef } from '@angular/core'
import { Pick } from './pick';
import { SteamProfileService } from '../steamProfile/steam.profile.service';

@Component({
  moduleId: module.id,
  selector: 'picks',
  templateUrl: 'picks.html',
  styleUrls: ['picks.css'],
  providers: [ PickService, SteamProfileService ]
})

export class PicksComponent implements OnInit { 

    heroInfo = '';
    public picksInfo : Pick[];
    loggedIn : boolean;
    $: any;
    profileInfo = '';
    model = new pick('New Team', null, null, null, null, null, '', 0, 0, 0, 0, 0, 0, 0, 0);
    slot1 = '';
    slot2 = '';
    slot3 = '';
    slot4 = '';
    slot5 = '';
    carry = 0;
    disable = 0;
    initiation = 0;
    nuke = 0;
    push = 0;
    durable = 0;
    support = 0;
    laneSupport = 0;

    constructor(public pickService: PickService, public http: Http, private steamProfileService : SteamProfileService) {  }

    ngOnInit() {
         this.http.get('http://localhost:8080/api/heroes').toPromise()
             .then(r => this.heroInfo = JSON.parse(r["_body"])) 
              this.loadPickData();
                 

          this.steamProfileService.checkLoggin().then(r=> {
          this.loggedIn = r
          if (this.loggedIn == true) {
            this.loggedIn = true;
            this.steamProfileService.getLoginSession()
            .then(r => {
              this.profileInfo = r;
              this.model.author = this.profileInfo['username'];
            })
          } else {
            this.loggedIn = false;
          }
        })  
    }

     ngAfterViewInit() {
        $( document ).ready(function() {
          $('.showDetails').click(function(e) {
            $(this).parent().parent().find('.details').toggle(); 
          });
        })
     }

    pickNewTeam() {
      $('.new_team').slideToggle();
    }

    onSelectChange(heroId : any, slot : any) {
      $(".heroimg" + slot).attr("src","images/heroes/" + heroId + ".jpg");
      this.updateBars(heroId, slot);
    }

    submitNewTeam() {
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
        this.http.post('http://localhost:8080/api/pick', body).subscribe(
        ()=>{  
          setTimeout(() => {
            this.updatePickData();
        }, 2000);
        
      });
    }

    updatePickData() {
        $('.submit').html("Submit")
        $('.complete').fadeIn();
        setTimeout(function() {
          $('.complete').fadeOut();
        }, 5000 );
        this.pickService.getPicks().then((pick: Pick[]) => this.picksInfo = pick).then(()=>{
            setTimeout(() => {
              $('.showDetails').click(function(e) {
                $(this).parent().parent().find('.details').slideToggle(); 
              });
            }, 0);
        });
        
    }

    updateBars(heroId : any, slot : any) {  
         var hero = '';
         this.http.get('http://localhost:8080/api/hero/' + heroId).toPromise()
             .then(r => hero = JSON.parse(r["_body"])[0]['_source'])
             .then(r => { 
                    switch(parseInt(slot)) {
                      case 1: {
                          if (this.slot1 != '') {
                            console.log('yes last slot')
                            this.removeProperties(this.slot1);
                          }
                          this.slot1 = hero;
                          this.setProperties(hero);
                          console.log(this.carry)
                          break;
                      }
                      case 2: {
                          if (this.slot2 != '') {
                            this.removeProperties(this.slot2);
                          }
                          this.slot2 = hero;
                          this.setProperties(hero);
                          break;
                      }
                      case 3: {
                          if (this.slot3 != '') {
                            this.removeProperties(this.slot3);
                          }
                          this.slot3 = hero;
                          this.setProperties(hero);
                          break;
                      }
                      case 4: {
                          if (this.slot4 != '') {
                            this.removeProperties(this.slot4);
                          }
                          this.slot4 = hero;
                          this.setProperties(hero);
                          break;
                      }
                      case 5: {
                          if (this.slot5 != '') {
                            this.removeProperties(this.slot5);
                          }
                          this.slot5 = hero;
                          this.setProperties(hero);
                          break;
                      }
                    }
              })
    }

    setColour(width: any, property : any) {
        if ($(property + " .fill").hasClass('low')) {
          $(property + " .fill").removeClass('low');
        }
        if ( $(property + " .fill").hasClass('medium')) {
          $(property + " .fill").removeClass('medium');
        }
        if ($(property + " .fill").hasClass('high')) {
          $(property + " .fill").removeClass('high');
        }
        if(width < 40 || (width > 170 && property == '.carry') || (width > 170 && property == '.support')) {
          $(property + " .fill").addClass('low');
        } else if (width > 40 && width < 70) {
          $(property + " .fill").addClass('medium');
        } else {
          $(property + " .fill").addClass('high');
        }
    }

    setProperties(hero : any) {
        if(hero.hasOwnProperty('carry')) {
            this.carry += hero['carry'];
            var carryWidth = this.carry * 100 / 5;
            this.setColour(carryWidth, '.carry');
            $('.carry .fill').animate({
              width : carryWidth + "%"
            }, 1000);
        } 
        if(hero.hasOwnProperty('disable')) {
            this.disable += hero['disable'];   
            var disableWidth = this.disable * 100 / 7;
            this.setColour(disableWidth, '.disable');
            $('.disable .fill').animate({
              width: disableWidth + "%"
            }, 1000);
        }
        if(hero.hasOwnProperty('initiation')) {
            this.initiation += hero['initiation'];
            var initiationWidth = this.initiation * 100 / 3;
            this.setColour(initiationWidth, '.initiation');
            $('.initiation .fill').animate({
              width: initiationWidth + "%"
            }, 1000);
        }
        if(hero.hasOwnProperty('nuke')) {
            this.nuke += hero['nuke'];
            var nukeWidth = this.nuke * 100 / 7;
            this.setColour(nukeWidth, '.nuke');
            $('.nuke .fill').animate({
              width: nukeWidth + "%"
            }, 1000);
        }
        if(hero.hasOwnProperty('push')) {
            this.push += hero['push'];
            var pushWidth = this.push * 100 / 3;
            this.setColour(pushWidth, '.push');
            $('.push .fill').animate({
              width: pushWidth + "%"
            }, 1000);
        }
        if(hero.hasOwnProperty('durable')) {
            this.durable += hero['durable'];
            var durableWidth = this.durable * 100 / 4;
            this.setColour(durableWidth, '.durable');
            $('.durable .fill').animate({
              width: durableWidth + "%"
             }, 1000);
        }
        if(hero.hasOwnProperty('support')) {
            this.support += hero['support'];
            var supportWidth = this.support * 100 / 6;
            this.setColour(supportWidth, '.support');
            $('.support .fill').animate({
              width: supportWidth + "%"
             }, 1000);
        }
        if(hero.hasOwnProperty('laneSupport')) {
            this.laneSupport += hero['laneSupport'];
            var laneSupportWidth = this.laneSupport * 100 / 4;
            this.setColour(laneSupportWidth, '.laneSupport');
            $('.laneSupport .fill').animate({
              width: laneSupportWidth + "%"
             }, 1000);
        }
    }

    removeProperties(hero : any) {
        if(hero.hasOwnProperty('carry')) {
            this.carry -= hero['carry'];
            var carryWidth = this.carry * 100 / 5;
            this.setColour(carryWidth, '.carry');
              $('.carry .fill').animate({
                width : carryWidth + "%"
              }, 200);
        } 
        if(hero.hasOwnProperty('disable')) {
            this.disable -= hero['disable'];  
            var disableWidth = this.disable * 100 / 7;
            this.setColour(disableWidth, '.disable');
            $('.disable .fill').animate({
              width: disableWidth + "%"
            }, 200);
            
        }
        if(hero.hasOwnProperty('initiation')) {
            this.initiation -= hero['initiation'];
            var initiationWidth = this.initiation * 100 / 3;
            this.setColour(initiationWidth, '.initiation');
            $('.initiation .fill').animate({
              width: initiationWidth + "%"
            }, 200);
        }
        if(hero.hasOwnProperty('nuke')) {
            this.nuke -= hero['nuke'];
            var nukeWidth = this.nuke * 100 / 7;
            this.setColour(nukeWidth, '.nuke');
            $('.nuke .fill').animate({
              width: nukeWidth + "%"
            }, 200);
        }
        if(hero.hasOwnProperty('push')) {
            this.push -= hero['push'];
            var pushWidth = this.push * 100 / 3;
            this.setColour(pushWidth, '.push');
            $('.push .fill').animate({
              width: pushWidth + "%"
            }, 200);
        }
        if(hero.hasOwnProperty('durable')) {
            this.durable -= hero['durable'];
            var durableWidth = this.durable * 100 / 4;
            this.setColour(durableWidth, '.durable');
            $('.durable .fill').animate({
              width: durableWidth + "%"
            }, 200);
        }
        if(hero.hasOwnProperty('support')) {
            this.support -= hero['support'];
            var supportWidth = this.support * 100 / 6;
            this.setColour(supportWidth, '.support');
            $('.support .fill').animate({
              width: supportWidth + "%"
            }, 200);
        }
        if(hero.hasOwnProperty('laneSupport')) {
            this.laneSupport -= hero['laneSupport'];
            var laneSupportWidth = this.laneSupport * 100 / 4;
            this.setColour(laneSupportWidth, '.laneSupport');
            $('.laneSupport .fill').animate({
              width: laneSupportWidth + "%"
            }, 200);
        }
    }

    loadPickData() {
        this.pickService.getPicks().then((pick: Pick[]) => this.picksInfo = pick).then(()=>{
           setTimeout(() => {
              $('.showDetails').click(function(e) {
                $(this).parent().parent().find('.details').slideToggle(); 
              });
            }, 0);
        });
    }

    get currentPick() {
      return JSON.stringify(this.model);
    }
    
}

export class pick {
    constructor(
      public teamName: string, 
      public slot1: number,
      public slot2: number, 
      public slot3: number, 
      public slot4: number, 
      public slot5: number,
      public author: string,
      public carry: number, 
      public disable: number, 
      public initiation: number, 
      public nuke: number, 
      public push: number, 
      public durable: number, 
      public support: number, 
      public laneSupport: number
      ) {}
}