"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("chai");
var chai_1 = require("chai");
var metrics_1 = require("./metrics");
var leveldb_1 = require("./leveldb");
var a = 0;
var dbPath = 'db_test';
var dbMet;
describe('Metrics', function () {
    before(function () {
        leveldb_1.LevelDB.clear(dbPath);
        dbMet = new metrics_1.MetricsHandler(dbPath);
    });
    describe('#getAll', function () {
        it('should get empty array on non existing group', function () {
            dbMet.getAll("0", function (err, result) {
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.be.empty;
            });
        });
    });
    describe('#save', function () {
        it('should save One ', function () {
            var myMetric = new metrics_1.Metric("heni", "ripsa", "1888-88-88", 8);
            dbMet.save(myMetric, function (err) {
                chai_1.expect(err).to.be.undefined;
            });
        });
        it('should update existing data', function () {
            dbMet.updateOne("heni|ripsa|1888-88-88", 123, function (err) {
                chai_1.expect(err).to.be.null;
            });
        });
    });
    describe('#getOne', function () {
        it('should get One', function () {
            dbMet.getOne("heni", "ripsa", function (err, result) {
                // assert.equal(err,null)
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.not.be.null;
                chai_1.expect(result).to.not.be.empty;
            });
        });
    });
    describe('#delete', function () {
        it('should delete data ', function () {
            dbMet.delOne("heni|ripsa|1888-88-88", function (err) {
                chai_1.expect(err).to.be.null;
            });
        });
        it('should not fail if data does not exist', function () {
            dbMet.delOne("heni|ripsa|1888-88-88", function (err) {
                chai_1.expect(err).to.be.null;
            });
        });
    });
    describe('#getOne', function () {
        it('should not get data deleted', function () {
            dbMet.getOne("heni", "ripsa", function (err, result) {
                // assert.equal(err,null)
                chai_1.expect(err).to.be.null;
                chai_1.expect(result).to.be.empty;
            });
        });
    });
    after(function () {
        dbMet.close();
    });
});
