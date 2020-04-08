// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors       = require('cors');
var bodyParser = require('body-parser');
var steam      = require('steam-login');
var cookie = require('cookie');
var session    = require('express-session');
var bignumber = require("big-number");

var match = require('./app/models/match');
var matchDownload = require('./app/models/matchDownload');
var hero = require('./app/models/hero');
var heroDownload = require('./app/models/heroDownload');
var steamProfile = require('./app/models/steamProfile');
var item = require('./app/models/item');
var itemDownload = require('./app/models/itemDownload');
var pick = require('./app/models/pick');
var pickUpdate = require('./app/models/pickUpdate');

// this enables cross-origin resource sharing, so you dont need the chrome extension
app.use(cors());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ 
    resave: false, 
    saveUninitialized: true, 
    secret: 'a secret',
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 2160000000,
        expires: new Date(253402300000000)
    },
}));
app.use(steam.middleware({
    realm: 'http://localhost:8080/api', 
    verify: 'http://localhost:8080/api/verify',
    apiKey: 'BC047CF7E5D0CF76E35D7F63E6E07392'}
));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/session', function(req, res) { 
    res.send(req.sessionStore.sessions);
});
 
router.delete('/delete-session/:session_id', function(req, res) { 
    var sessionId = req.params.session_id
    req.sessionStore.sessions[sessionId] = null;
});
 
router.get('/authenticate', steam.authenticate(), function(req, res){});
 
router.get('/verify', steam.verify(), function(req, res) {
        req.session.save(function(err) {
            var newId = parseInt(req.session.steamUser['steamid'].substr(3)) - 61197960265728;
            req.session.steamUser['steamid32'] = newId;
            res.redirect('http://localhost:3000/profile');
        })
});

router.get('/match/:match_id', function(req, res) {
    var matchId = req.params.match_id
    match.getMatchById(matchId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches', function(req, res) {
    match.getAllMatchData(function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/heroes', function(req, res) {
    hero.getAllHeroData(function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/hero/:hero_id', function(req, res) {
    var heroId = req.params.hero_id;
    hero.getHeroById(heroId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/items', function(req, res) {
    item.getAllItemData(function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/item/id/:item_id', function(req, res) {
    var itemId = req.params.item_id;
    item.getItemByIdData(itemId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches/user/:user_id', function(req, res) {
    var userId = req.params.user_id;
    match.getAllUserMatchData(userId, function(result) {  
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches/game-mode', function(req, res) {
    var gameMode = req.query.game_mode;
    match.getMatchByGamemode(gameMode, function(result) {  
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches/lobby-type', function(req, res) {
    var lobbyType = req.query.lobby_type;
    match.getMatchByLobbyType(lobbyType, function(result) {  
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/match-download/:match_id', function(req, res) {
    var matchId = req.params.match_id
    matchDownload.downloadMatchData(matchId);
});

router.get('/match-history-download/:account_id', function(req, res) {
    var accountId = req.params.account_id
    matchDownload.downloadLatestMatches(accountId);
    res.header("Content-Type",'application/json');
    res.send(accountId).end();
});

router.get('/hero-download', function(req, res) {
    heroDownload.downloadHeroData();
});

router.get('/item-download', function(req, res) {
    itemDownload.downloadItemData();
});

router.get('/steam-profile/:profile_id', function(req, res) {
     var profileId = req.params.profile_id

     steamProfile.getSteamProfileData(profileId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result, null, 4);
     });
});

router.get('/user/:steam_id', function(req, res) {
    var userId = req.params.steam_id
    steamProfile.getUserInfo(userId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result, null, 4);
    });
});

router.get('/download-steam-profile/:profile_id', function(req, res) {
     var profileId = req.params.profile_id

     steamProfile.downloadSteamProfileData(profileId, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result, null, 4);
     });
});

router.get('/picks', function(req, res) {
    pick.getAllPickData(function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/picks/user/:user_name', function(req, res) {
    var userName = req.params.user_name
    console.log(userName);
    pick.getAllUserPickData(userName, function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.post('/pick', function(req, res) {
    console.log(req.body);
    console.log("server res === " )
    //console.log(res.sendDate);
    res.send(res.sendDate, null, 4);
    pickUpdate.createNewPick(req.body);
});

router.delete('/delete-pick/:pick_id', function(req, res) {
    console.log(req.params.pick_id);
    //res.send(req.body, null, 4);
    pickUpdate.deletePick(req.params.pick_id);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);