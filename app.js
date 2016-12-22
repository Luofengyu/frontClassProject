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
var cartObj = require("./Objs/cartOBJ");
var orderObj = require("./Objs/orderObj");

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
    console.log(docs)
    if(docs.length == 1){
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
  UserObj.find(req.body, function(err,finddocs){//查询用户
    if(finddocs.length != 0){
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail" }));//给客户端返回一个json格式的数据
      res.end();
    }else{
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
    }
  })
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

  //获取所有商品
webapp.get("/home/productions",function (req,res){
  productionObj.find({}, function(err,docs) {//查询商品
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
//获取单个商品
webapp.get("/single/production", function (req,res){
  productionObj.find(req.body, function(err,docs) {//查询商品
    if (docs) {
      console.log(docs);
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
  console.log("GET: /single/production");
});

//获取购物车信息
webapp.get("/cart/productions",function (req,res){
  cartObj.find(req.body, function(err,docs) {//查询商品
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
webapp.post("/production/upload", function (req,res) {
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

//创建订单
webapp.post("/order/create", function (req,res) {
  var order = orderObj({
    products: req.body.productions,
    user:req.body.user
  });

  order.save(function (err, docs) {
    if(docs){
      for(var i=0;i<req.body.productions.length;i++){
        cartObj.remove(req.body.productions[i],function (err, docs) {
          if(docs){
            console.log("remove prodction from cart");
          }else{
            res.contentType('json');//返回的数据类型
            res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
            res.end();
          }
        });
      }
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"success",data:docs }));//给客户端返回一个json格式的数据
      res.end();
    }else{
      res.contentType('json');//返回的数据类型
      res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
      res.end();
    }
  });
  console.log('post message from:/order/create');
});

//商店注册处理
webapp.post("/shop/register", function (req,res) {
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
  });
  console.log('post message from: /shop/register');
});

//添加购物车
webapp.post("/buy/production", function (req,res) {
  //查询是否存在
  console.log(req.body);
  cartObj.find(req.body, function (err,findOBJ) {
      if(findOBJ.length!=0){
        cartObj.update({id: findOBJ[0]._id ,number:findOBJ[0].number+1},function (err, updateOBJ) {
          if(updateOBJ){
            res.contentType('json');//返回的数据类型
            res.send(JSON.stringify({ status:"success",data:updateOBJ }));//给客户端返回一个json格式的数据
            res.end();
          }else{
            res.contentType('json');//返回的数据类型
            res.send(JSON.stringify({ status:"fail"}));//给客户端返回一个json格式的数据
            res.end();
          }
        })
      }else{
        var cart = cartObj({
          product_id:req.body.product_id,
          imageData:req.body.imageData,
          name: req.body.name,
          price: req.body.price,
          info:req.body.info,
          number:1,
          user_id:req.body.user_id
        });
        cart.save(function (err, docs) {
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
      }

  });

  console.log('post message from: /buy/production');
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
  });
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
