var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    firstName    : String,
    lastName    : String,
    email : String,
    address: String
});


var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;