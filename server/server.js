// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var steam      = require('steam-login');
var mongodb    = require("mongodb");
var cookie = require('cookie');
var session    = require('./node_modules/steam-login/node_modules/express-session');
mongoose.connect('mongodb://dannersjb:mongodb01@jello.modulusmongo.net:27017/iqi7jiZy'); // connect to our database

var match = require('./app/models/match');
var matchDownload = require('./app/models/matchDownload');
var hero = require('./app/models/hero');
var heroDownload = require('./app/models/heroDownload');
var steamProfile = require('./app/models/steamProfile');
var item = require('./app/models/item');
var itemDownload = require('./app/models/itemDownload');

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
        maxAge: 2160000000
    }
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

router.get('/', function(req, res) {
    console.log("hello ____________________");
            var cookies = cookie.parse(req.headers.cookie || '');
            console.log("cookie Before Redirect: ", cookies);
    console.log(req.session);
    res.send(req.session.steamUser == null ? 'not logged in' : 'hello ' + req.session.steamUser.username).end();
});

router.get('/thelist', function(req, res) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the Server', err);
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('students');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    console.log("hello : " + JSON.stringify(result));     
                    res.send(result, null, 4);
                    // send back result
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});
 
router.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('http://localhost:3000/profile');
});
 
router.get('/verify', steam.verify(), function(req, res) {
        //res.send(req.user);
        res.setHeader('Set-Cookie', cookie.serialize('name', "hello", {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7
        }));
        req.session.save(function(err) {
            console.log("Session Before Redirect: ", req.session);
            // var cookies = cookie.parse(req.headers.cookie || '');
            // console.log("cookie Before Redirect: ", cookies);
            res.redirect('http://localhost:3000/profile');
            res.send('saving session');
        })
});
 
router.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
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

router.get('/items', function(req, res) {
    item.getAllItemData(function(result) {
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches/game-mode/:game_mode', function(req, res) {
    var gameMode = req.params.game_mode;
    match.getMatchByGamemode(gameMode, function(result) {  
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});

router.get('/matches/lobby-type/:lobby_type', function(req, res) {
    var lobbyType = req.params.lobby_type;
    match.getMatchByLobbyType(lobbyType, function(result) {  
        res.header("Content-Type",'application/json');
        res.send(result).end();
    });
});


router.get('/match-download/:match_id', function(req, res) {
    var matchId = req.params.match_id
    matchDownload.downloadMatchData(matchId);
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
        console.log("result = " + result);
        res.header("Content-Type",'application/json');
        res.send(result, null, 4);
     });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);