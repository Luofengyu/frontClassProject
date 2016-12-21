/**
 * Created by hasee on 2016/12/21.
 */
var mongo = require("mongoose");
var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var cartSchema = new Schema({
    product_id:{type: String},
    imageData:{type: String},
    name:{type: String},
    info:{type: String},
    price:{type: String},
    number:{type: Number},
    user_id:{type: String}
});

mongo.model("cart",cartSchema);
var cart = mongo.model("cart");


module.exports = cart;