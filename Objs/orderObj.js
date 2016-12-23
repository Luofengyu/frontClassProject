/**
 * Created by hasee on 2016/12/22.
 */
var mongo = require("mongoose");
var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var orderSchema = new Schema({
    products:{type: Array},
    user:{type: Object},
    total:{type: Number}
});

mongo.model("order",orderSchema);
var Order = mongo.model("order");


module.exports = Order;