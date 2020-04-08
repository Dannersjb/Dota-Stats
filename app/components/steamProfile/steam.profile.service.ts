import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class SteamProfileService {
    key = 'BC047CF7E5D0CF76E35D7F63E6E07392';
    router : Router;
    profileInfo = '';
    loggedIn : boolean;
    

    constructor(private http: Http, router: Router) {
        console.log('SteamService Initialized...');
        this.router = router;
    }

    checkLoggin() {
        var sessionID = document.cookie.replace("connect.sid=s%3A", "");
        sessionID = sessionID.substring(0, 32);

        return this.http.get('http://localhost:8080/api/session')
        .toPromise()
            .then(r => {
                this.profileInfo = JSON.parse(r['_body']);
                if (this.profileInfo.hasOwnProperty(sessionID) && this.profileInfo[sessionID] != null ) {
                    return true;
                } else {
                    return false;
                }
            })
    }
    
    getLoginSession() { 
        var sessionID = document.cookie.replace("connect.sid=s%3A", "");
        sessionID = sessionID.substring(0, 32);
        
        return this.http.get('http://localhost:8080/api/session')
            .toPromise()
                .then(r => {
                    this.profileInfo = JSON.parse(r['_body']);
                    this.profileInfo = JSON.parse(this.profileInfo[sessionID]);
                    this.profileInfo = this.profileInfo['steamUser'];
                    this.loggedIn = true;
                    return this.profileInfo;
                }) 
        }

    logout() {
        {
            var sessionID = document.cookie.replace("connect.sid=s%3A", "");
            sessionID = sessionID.substring(0, 32);
            this.http.delete('http://localhost:8080/api/delete-session/' + sessionID).subscribe();
            $('.account li').html("<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i>");
            setTimeout(() => {
                $('.account li').html('<a href="http://localhost:8080/api/authenticate" class="login" routerLinkActive="active"><i class="fa fa-steam" aria-hidden="true"></i> <span>Login with Steam</span></a>');
                this.router.navigate(['/home']);
            }, 500 );
        } 
    }
}