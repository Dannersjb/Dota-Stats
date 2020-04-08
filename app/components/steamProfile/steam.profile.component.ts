import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { SteamProfileService } from './steam.profile.service';
import { MatchService } from '../match/match.service';
import { PickService } from '../picks/picks.service';
import { Pick } from '../picks/pick';

@Component({
  moduleId: module.id,
  selector: 'match',
  templateUrl: 'profile.html',
  styleUrls: ['profile.css'],
  providers: [ SteamProfileService, MatchService, PickService ]
})

export class SteamProfile implements OnInit, OnDestroy { 

    profileId: string;
    private sub: any;
    profileInfo = '';
    profileImages = '';
    loggedIn : boolean;
    matchData : any[];
    total_games = 0;
    total_wins = 0;
    win_percent = "";
    total_picks = 0;
    public picksInfo : Pick[];

    constructor( private route: ActivatedRoute, public http: Http, private steamProfileService : SteamProfileService, private matchService : MatchService, private pickService : PickService) { }

    ngOnInit() {
        console.log("cookies : " + document.cookie);
        this.steamProfileService.checkLoggin().then(r=> {
          this.loggedIn = r
          if (this.loggedIn == true) {
            this.loggedIn = true;
            this.steamProfileService.getLoginSession()
            .then(r => {
              this.profileInfo = r
              this.profileImages = this.profileInfo['avatar']
              this.getLatestGames(this.profileInfo['steamid32']);
              this.getUserPicks()
              $('.profile_menu li a').click(function(e) {
                e.preventDefault();
                if (!$(this).hasClass('.open')) {
                  var openItem = $('.profile_menu li a.open').attr('href');
                  $('.profile_menu li a.open').removeClass('open')
                  $(openItem).slideUp();
                  var closedItem = $(this).attr('href');
                  $(this).addClass('open')
                  $(closedItem).slideDown();
                }
              })
            })
          } else {
            this.loggedIn = false;
          }
        })  
    }

    getLatestGames(steamId : any) {
      this.matchService.getUserMatchData(steamId).then(r => {
          this.matchData = r;  
          this.setMatchData(this.matchData)
      });
    }

    downloadLatestGames(steamId : any) {
      $('.download').html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>").attr("disabled", 'true');
      this.http.get('http://localhost:8080/api/match-history-download/' + steamId).subscribe(
            () => {
                setTimeout(() => {
                  this.getLatestGames(this.profileInfo['steamid32'])   
                  $('.download').html("Download Matches")
                  if (this.matchData.length > 0) {
                    $('.complete').fadeIn();
                      setTimeout(function() {
                        $('.complete').fadeOut();
                      }, 5000 );
                  } else {
                    $('.failed').fadeIn();
                      setTimeout(function() {
                        $('.failed').fadeOut();
                      }, 5000 );
                  }
                  }, 2000); 
            });  
    }

     setMatchData(items : any) {
        this.matchData = [];
        this.total_wins = 0;
        for (let item of items) {
            var date = new Date(item['_source']['start_time']*1000);
            item['_source']['start_time'] = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

            var radiant_win = item['_source']['radiant_win'];
            var players = item['_source']['players'];
            var i = 0;
            for (let player of players) {
              i++;
              if (player['account_id'] == this.profileInfo['steamid32']) {
                  item['_source']['profile_hero'] = player['hero_id'];
                  if (i < 5 && radiant_win == true) {
                      this.total_wins++;
                      item['_source']['win'] = true;
                  } else if (i > 5 && radiant_win == false){
                      this.total_wins++;
                      item['_source']['win'] = true;
                  } else {
                      item['_source']['win'] = false;
                  }
              }
            } 
            this.matchData.push(item['_source'])
        }
        this.total_games = this.matchData.length;
        this.win_percent = (this.total_wins * 100 / this.total_games).toFixed(2);
    }

    getUserPicks() {
      this.pickService.getUserPicks(this.profileInfo['username']).then((pick: Pick[]) => {this.picksInfo = pick; this.total_picks = this.picksInfo.length})   
    }

    deletePick(pickId : any) {   
        $('.delete').html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i>").attr("disabled", 'true');
        console.log(pickId);
        this.http.delete('http://localhost:8080/api/delete-pick/' + pickId).subscribe(()=>{});
          setTimeout(() => {
              $('.deleted').fadeIn();
              this.getUserPicks();
          }, 2000);
          setTimeout(function() {
            $('.deleted').fadeOut();
          }, 5000 );
    }


    ngOnDestroy() {
      //this.sub.unsubscribe();
    }

}
