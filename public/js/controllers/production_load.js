/**
 * Created by hasee on 2016/12/17.
 */
app.controller("productInfoCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    //获取已有的商品列表
    var shop = $cookieStore.get("shop");
    $http({
        url: 'http://localhost:3000/productions',
        method: 'POST',
        data: {"shop_id": shop._id}
    })
        .success(function (res, header, config, status) {
        //响应成功
        if(res.status == "success"){
            // 商品列表
            $scope.list = res.data;
        }else{
           console.log(res.status);
        }
    })
        .error(function (data, header, config, status) {
        console.log("error")
    });

    //修改上传文件
    $scope.fileChanged = function(ele){
        var imgUrl = imageBase64Url(ele.files[0]);
        convertImgToBase64(imgUrl, function(base64Img){
            $scope.ImgBase64 = base64Img.toString();
        });

    }

    // 添加产品
    $scope.addProduct=function (product) {
        $scope.product.shop_id = shop._id;
        $http({
            url: 'http://localhost:3000/production/upload',
            method: 'POST',
            data: {"image": $scope.ImgBase64, "product": $scope.product}
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                console.log(res.data);
                $scope.list.push(res.data);
            }else{
                $scope.img = res.data;
            }
            //scope设置

        }).error(function (data, header, config, status) {
            console.log("error")
        })
    };
    $scope.deleteProduct = function (product_id) {
        $http({
            url: 'http://localhost:3000/production/delete',
            method: 'POST',
            data: {"_id":product_id }
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                console.log(res.data);
                $state.go("store.loadProInfo",{},{reload:true});
            }else{
                $scope.img = res.data;
            }
            //scope设置

        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }

    //建立一個可存取到該file的url
    var imageBase64Url = function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };
    // img文件转换成base64
    function convertImgToBase64(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }
    //修改商品
}]);