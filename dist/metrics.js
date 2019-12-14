"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(u, m_name, ts, v) {
        this.username = u;
        this.m_name = m_name;
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    MetricsHandler.prototype.save = function (myMetric, callback) {
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        var username = myMetric.username;
        var m_name = myMetric.m_name;
        var timestamp = myMetric.timestamp;
        var value = myMetric.value;
        stream.write({ key: username + "|" + m_name + "|" + timestamp, value: "" + value });
        stream.end();
    };
    MetricsHandler.prototype.getAll = function (username, callback) {
        var metrics = [];
        this.db.createReadStream()
            .on('data', function (data) {
            var _a = data.key.split('|'), u = _a[0], m_name = _a[1], timestamp = _a[2];
            var value = data.value;
            if (username == u) {
                var oneMetric = new Metric(u, m_name, timestamp, value);
                metrics.push(oneMetric);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, metrics);
        });
    };
    MetricsHandler.prototype.getOne = function (username, key, callback) {
        var metrics = [];
        this.db.createReadStream()
            .on('data', function (data) {
            var _a = data.key.split('|'), u = _a[0], m_name = _a[1], timestamp = _a[2];
            var value = data.value;
            if (username == u && key == m_name) {
                var oneMetric = new Metric(u, m_name, timestamp, value);
                metrics.push(oneMetric);
            }
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            console.log('Stream ended');
            callback(null, metrics);
        });
    };
    MetricsHandler.prototype.delOne = function (key, callback) {
        this.db.del(key, callback(null));
    };
    MetricsHandler.prototype.updateOne = function (key, value, callback) {
        this.db.put(key, value, function (error) {
            if (error) {
                console.log('error trying update');
                callback(error);
            }
            else
                callback(null);
        });
    };
    MetricsHandler.prototype.close = function () {
        this.db.close();
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
