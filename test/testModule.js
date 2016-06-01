var expect = require("chai").expect;
var http = require("http");
var app = require('../app');
var request = require("request"); //Simple way to make HTTP calls
var server;
var TEST_PORT = 3456;


///API TEST

before(function (done) {
    var app = require('../app');
    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
        done();
    });
});
after(function (done) {
    server.close();
    done();
});


describe("POST: ", function () {
    var options =
        {
            url: "http://localhost:" + TEST_PORT + "/api/customer",
            method: "POST",
            json: true,
            body: { firstName: "John", lastName: "Doe", email: "John@Doe.com", address: "Copenhagen, Denmark" }
        }
    it("Post a customer", function (done) {
        request(options, function (error, res, body) {
            console.log(body);
            var addedCust = body;
            expect(addedCust.Customer.firstName).to.be.equal("John"); //You should also check whether the joke actually was added to the Data-store done();
            done();
        });

    })
});


describe('persistence', function () {
    var options =
        {
            url: 'http://localhost:' + TEST_PORT + '/api/customers',
            method: 'GET',
            json: true
        };
    it('Get list of all jokes', function (done) {
        request(options, function (err, res, body) {
            var custList = body;
            console.log(body);
            var testCustomer = custList[0];
            expect("John").to.be.equal(testCustomer.firstName);
            done();
        });
    });
});

describe('editting', function () {
    var options =
        {
            url: 'http://localhost:' + TEST_PORT + '/api/customer/John',
            method: 'PUT',
            json: true,
            body: { firstName: "John", lastName: "Do", email: "John@Doe.com", address: "Copenhagen, Denmark" }
        };
    it('Editting John', function (done) {
        request(options, function (err, res, body) {
            var newCustomer = body;
            console.log(body);
            expect(newCustomer.customer.lastName).to.be.equal("Do");
            done();
        });
    });
});

describe('deleting', function () {
    var options =
        {
            url: 'http://localhost:' + TEST_PORT + '/api/customer/John',
            method: 'DELETE',
            json: true
        };
    it('Deleting John', function (done) {
        request(options, function (err, res, body) {
            expect(body.customer).to.be.equal(undefined);
            done();
        });
    });
});
