const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    name: String,
    pass: String,

});

Account.methods.hello = function() {
    console.log("Hello, " + this.name);
}

const AccountModel = mongoose.model('Account', Account);



module.exports = AccountModel;
