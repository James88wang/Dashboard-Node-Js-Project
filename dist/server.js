"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var path = require("path");
var bodyparser = require("body-parser");
var session = require("express-session");
var levelSession = require("level-session-store");
var user_1 = require("./user");
var flash = require('connect-flash');
var port = process.env.PORT || '8082';
var dbUser = new user_1.UserHandler('./db/users');
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
var app = express();
app.set('views', __dirname + "/../views");
app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
var LevelStore = levelSession(session);
app.use(session({
    secret: 'my very secret phrase',
    store: new LevelStore('./db/sessions'),
    resave: true,
    saveUninitialized: true
}));
/////////////////////////////////////////
//////////    Authentication   //////////
//////////      Management     //////////
/////////////////////////////////////////
var authRouter = express.Router();
app.use(authRouter);
authRouter.get('/login', function (req, res) {
    res.render('login');
});
authRouter.get('/signup', function (req, res) {
    res.render('signup', { message: req.flash('message') });
});
authRouter.get('/logout', function (req, res) {
    delete req.session.loggedIn;
    delete req.session.user;
    res.redirect('/login');
});
authRouter.post('/login', function (req, res, next) {
    dbUser.get(req.body.username, function (err, result) {
        if (err)
            next(err);
        if (result === undefined || !result.validatePassword(req.body.password)) {
            res.redirect('/login');
        }
        else {
            req.session.loggedIn = true;
            req.session.user = result;
            res.redirect('/');
        }
    });
});
var authCheck = function (req, res, next) {
    if (req.session.loggedIn) {
        next();
    }
    else
        res.redirect('/login');
};
app.get('/', authCheck, function (req, res) {
    res.render('index', {
        name: JSON.stringify(req.session.user.username),
        password: JSON.stringify(req.session.user.password),
        email: JSON.stringify(req.session.user.email)
    });
});
/////////////////////////////////////////
//////////////    User    ///////////////
////////////// Management ///////////////
/////////////////////////////////////////
var userRouter = express.Router();
app.use('/user', userRouter);
// sign up
userRouter.post('/', function (req, res, next) {
    dbUser.get(req.body.username, function (err, result) {
        if (!err || result !== undefined) {
            req.flash('message', 'Sorry, user already exist');
            res.status(409).redirect('/signup');
        }
        else {
            var newUser = new user_1.User(req.body.username, req.body.email, req.body.password);
            dbUser.save(newUser, function (err) {
                if (err)
                    next(err);
                else
                    res.status(201).redirect('/login');
            });
        }
    });
});
userRouter.get('/:username', function (req, res, next) {
    dbUser.get(req.params.username, function (err, result) {
        if (err || result === undefined) {
            res.status(404).send("user not found");
        }
        else
            res.status(200).json(result);
    });
});
userRouter.delete('/:username', function (req, res) {
    dbMet.getAll(req.session.user.username, function (error, result) {
        result.forEach(function (element) {
            var key = element.username + '|' + element.m_name + '|' + element.timestamp;
            dbMet.delOne(key, function (err) {
                if (err) {
                    console.log('Error delOne');
                }
            });
        });
    });
    dbUser.delete(req.params.username, function (err, result) {
        res.end();
    });
});
//update user 
userRouter.put('/:username', function (req, res) {
    var username = req.params.username;
    var new_password = req.body.new_password;
    var new_email = req.params.new_email;
    console.log("new_pass: " + new_password + ", new_email: " + new_email);
    dbUser.get(username, function (err, result) {
        if (err)
            res.status(500);
        else {
            dbUser.update(result.username, new_password, new_email, function (err) {
                if (err) {
                    console.log('Error update');
                    res.status(500);
                }
                else
                    res.status(200);
            });
        }
    });
});
/////////////////////////////////////////
//////////////   Metric   ///////////////
////////////// Management ///////////////
/////////////////////////////////////////
var metricRouter = express.Router();
app.use('/metrics', metricRouter);
metricRouter.post('/', function (req, res) {
    var dateNow = JSON.stringify(new Date);
    var myMetric = new metrics_1.Metric(req.session.user.username, req.body.m_name, dateNow, req.body.value);
    dbMet.save(myMetric, function (err) {
        if (err)
            throw err;
        res.status(200).redirect('/');
    });
});
metricRouter.get('/', function (req, res) {
    dbMet.getAll(req.session.user.username, function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
    });
});
metricRouter.get('/:m_name', function (req, res) {
    dbMet.getOne(req.session.user.username, req.params.m_name, function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
    });
});
metricRouter.delete('/:m_name', function (req, res) {
    var username = req.session.user.username;
    var m_name = req.params.m_name;
    dbMet.getOne(username, m_name, function (err, result) {
        result.forEach(function (element) {
            var timestamp = element.timestamp;
            var key = username + '|' + m_name + '|' + timestamp;
            dbMet.delOne(key, function (err) {
                if (err) {
                    console.log('Error delOne');
                    res.status(500);
                }
                else
                    res.status(200);
            });
        });
    });
});
metricRouter.put('/:m_name', function (req, res) {
    var username = req.session.user.username;
    var m_name = req.params.m_name;
    var value = req.body.value;
    dbMet.getOne(username, m_name, function (err, result) {
        result.forEach(function (element) {
            var timestamp = element.timestamp;
            var key = username + '|' + m_name + '|' + timestamp;
            dbMet.updateOne(key, value, function (err) {
                if (err) {
                    console.log('Error updateOne');
                    res.status(500);
                }
                else
                    res.status(200);
            });
        });
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("Server is running on http://localhost:" + port);
});
