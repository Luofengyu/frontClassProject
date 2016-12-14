/**
 * Created by hasee on 2016/12/14.
 */
var mongo = require("mongoose");
var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    name:{type: String},
    number:{type: String},
    imgUrl:{type: String},
    shop:{type: String},
    info:{type: String}
});
mongo.model("production",productSchema);
var Production = mongo.model("production");


module.exports = Production