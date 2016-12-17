/**
 * Created by hasee on 2016/12/17.
 */
app.controller("productInfoCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $http({
        url: 'http://localhost:3000/productions',
        method: 'GET',
        data: {"shop": "1111"}
    }).success(function (res, header, config, status) {
        //响应成功
        if(res.status == "success"){
            $scope.list = res.data;
            console.log(res.data);
        }else{
           console.log(res.status);
        }
        //scope设置

    }).error(function (data, header, config, status) {
        console.log("error")
    })

    $scope.fileChanged = function(ele){
        $scope.image = imageBase64Url(ele.files[0]);
    };
    
    $scope.addProduct=function (product) {
        $http({
            url: 'http://localhost:3000/production/upload',
            method: 'POST',
            data: {"image": $scope.image, "product": $scope.product}
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                $scope.list.push(res.data);
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
    }
}]);