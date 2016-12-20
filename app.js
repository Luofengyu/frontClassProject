var express = require('express');
var path = require('path');
var fs = require("fs");
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var index = require('./routes/index');
var users = require('./routes/users');
//数据库shema
var UserObj = require("./Objs/userObj");
var productionObj = require("./Objs/productionObj");
var shopObj = require("./Objs/shopObj");

var webapp = express();

// view engine setup
webapp.set('views', path.join(__dirname, 'views'));
webapp.engine('html',ejs.__express);
webapp.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
webapp.use(logger('dev'));
webapp.use(bodyParser.json());
webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(cookieParser());
webapp.use(express.static(path.join(__dirname, 'public')));

webapp.use('/', index);
//登陆处理
webapp.post("/user/login",function (req,res) {
  UserObj.find(req.body, function(err,docs){//查询用户
    if(docs){
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({
        status:"success",
        data: docs
      }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail" }));//给客户端返回一个json格式的数据
      res.end();
    }
    console.log('post message from:/user/login');
  })
});

//注册处理
webapp.post("/user/register",function (req,res) {
  var user = UserObj(req.body);
  user.save(function (err, docs) {
    if(docs){
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"success",data:docs }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail" }));//给客户端返回一个json格式的数据
      res.end();
    }
  });
  console.log('post message from:/user/login');
});

//获取所有商品
webapp.get("/productions",function (req,res) {
  productionObj.find(res.body, function (err, docs) {//查询用户
    if (docs) {
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({
        status: "success",
        data: docs
      }));//给客户端返回一个json格式的数据
      res.end();
    } else {
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({status: "fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  });
});

  //获取商店信息
webapp.get("/shop/infomation",function (req,res){
  shopObj.find(res.body, function(err,docs) {//查询用户
    if (docs) {
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({
        status: "success",
        data: docs
      }));//给客户端返回一个json格式的数据
      res.end();
    } else {
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({status: "fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  });
});

//产品上传处理
webapp.post("/production/upload",function (req,res) {
  var imgData = req.body.image;
  // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  // var dataBuffer = new Buffer(imgData, 'base64');
  var product = productionObj({
    name: req.body.product.name,
    number:req.body.product.leave,
    price:req.body.product.price,
    imgData: imgData,
    shop_id: req.body.product.shop_id,
    info: req.body.product.info
  });
  product.save(function (err, docs) {
    if(docs){
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"success",data:docs }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  })
  console.log('post message from:/production/upload');
});

//商店注册处理
webapp.post("/shop/register",function (req,res) {
  var shop = shopObj(req.body);
  shop.save(function (err, docs) {
    if(docs){
      UserObj.update({id:shop.user_id ,role:"saler"},function(err,docs){//更新
        console.log(docs);
        console.log('update success');
      });
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"success",data:docs }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  })
  console.log('post message from: /shop/register');
});

//删除商品
webapp.post("/production/delete",function (req,res) {
  productionObj.remove(req.body, function (err, docs) {
    if(docs){
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"success",data:docs }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  })
  console.log('post message from: /shop/register');
});


/* 连接本地mongodb */
var mongodb = mongo.connect("mongodb://127.0.0.1:27017/testDB",function(err){
  if(!err){
    console.log("connected to Mongodb");
  }else{
    throw err;
  }
});
//监听3000端口服务
var server = webapp.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


module.exports = webapp;
