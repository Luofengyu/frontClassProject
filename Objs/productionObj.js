/**
 * Created by hasee on 2016/12/14.
 */
var mongo = require("mongoose");
var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    name:{type: String},
    number:{type: String},
    price:{type: String},
    imgData:{type: String},
    shop_id:{type: String},
    info:{type: String}
});
mongo.model("production",productSchema);
var Production = mongo.model("production");


module.exports = Production;