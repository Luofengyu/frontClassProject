/**
 * Created by hasee on 2016/12/14.
 */
var mongo = require("mongoose");

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    firstname:{type: String},
    lastname:{type: String},
    Email:{type: String},
    password:{type: String},
    city:{type: String},
    address:{type: String},
    age:{type: String},
    telephone:{type: String},
    role:{type: String}
});

// 制定
mongo.model("user",UserSchema);
var User = mongo.model("user");

module.exports = User;