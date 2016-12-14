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

var userAdd = function (data) {
    var user = new User({
        firstname:data.firstname,
        lastname:data.lastname,
        Email:data.Email,
        password:data.password,
        city:data.city,
        address:data.address,
        age:data.age,
        telephone:data.telephone,
        role: "customer"
    });
    user.save(function(err,data) {
        if (err) {
            return "fail";
        } else {
            return "success";
        }
    })
}

var userModifyRole = function (user_id) {
    User.update({id:user_id,role:"saler"},function(err,docs){//更新
        console.log(docs);
        console.log('update success');
    });
}

module.exports = User;