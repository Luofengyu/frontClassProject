/**
 * Created by hasee on 2016/12/14.
 */
var mongo = require("mongoose");
var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var shopSchema = new Schema({
    company:{type: String},
    Email:{type: String},
    website:{type: String},
    subject:{type: String},
    user_id:{type: String},
    message:{type: String}
});
mongo.model("shop",shopSchema);
var Shop = mongo.model("shop");

module.exports = Shop