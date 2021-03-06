"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leveldb_1 = require("./leveldb");
var crypto = require('crypto');
var key = 'my secret key';
var User = /** @class */ (function () {
    function User(username, email, password, passwordHashed) {
        if (passwordHashed === void 0) { passwordHashed = false; }
        this.password = "";
        this.username = username;
        this.email = email;
        if (!passwordHashed) {
            this.setPassword(password);
        }
        else
            this.password = password;
    }
    User.fromDb = function (username, value) {
        var _a = value.split(":"), password = _a[0], email = _a[1];
        return new User(username, email, password, true);
    };
    User.prototype.setPassword = function (toSet) {
        // Hash and set password
        var hash = crypto.createHmac('sha256', key);
        hash.update(toSet);
        this.password = hash.digest('hex');
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.validatePassword = function (toValidate) {
        // return comparison with hashed password
        var hash = crypto.createHmac('sha256', key);
        hash.update(toValidate);
        toValidate = hash.digest('hex');
        if (this.password == toValidate)
            return true;
        else
            return false;
    };
    return User;
}());
exports.User = User;
var UserHandler = /** @class */ (function () {
    function UserHandler(path) {
        this.db = leveldb_1.LevelDB.open(path);
    }
    UserHandler.prototype.get = function (username, callback) {
        this.db.get("user:" + username, function (err, data) {
            if (err)
                callback(err);
            else if (data === undefined)
                callback(null, data);
            else {
                callback(null, User.fromDb(username, data));
            }
        });
    };
    UserHandler.prototype.save = function (user, callback) {
        this.db.put("user:" + user.username, user.getPassword() + ":" + user.email, function (err) {
            callback(err);
        });
    };
    UserHandler.prototype.delete = function (username, callback) {
        // TODO
        this.db.del("user:" + username, callback(null));
    };
    UserHandler.prototype.update = function (username, new_password, new_email, callback) {
        this.db.put("user:" + username, new_password + ":" + new_email, function (error) {
            if (error) {
                console.log('error trying update user');
                callback(error);
            }
            else
                callback(null);
        });
    };
    return UserHandler;
}());
exports.UserHandler = UserHandler;
