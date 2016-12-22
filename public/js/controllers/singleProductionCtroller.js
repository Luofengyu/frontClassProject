/**
 * Created by hasee on 2016/12/22.
 */
app.controller("singleCtrl", ["$scope", '$cookieStore','$http','$state', function ($scope, $cookieStore, $http, $state) {
    var user = $cookieStore.get("user");
    var product_id = $cookieStore.get("singleProduction");
    console.log(product_id);
    $http({
        url: 'http://localhost:3000/single/production',
        method: 'GET',
        data: {"_id": product_id}
    }).success(function (res, header, config, status) {
        //响应成功
        if(res.status == "success"){
            $scope.production = res.data[0];
        }else{
            console.log(res.status)
        }
    }).error(function (data, header, config, status) {
        console.log("error")
    });

    $scope.addToCart = function (production) {
        $http({
            url: 'http://localhost:3000/buy/production',
            method: 'POST',
            data: {
                "product_id": production._id,
                "imageData": production.imgData,
                "name": production.name,
                "price": production.price,
                "info": production.info,
                "user_id": user._id
            }
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                $state.go("customer.shopCart",{},{reload:true});
                console.log(res.data);

            }else{
                console.log(res.status)
            }
        }).error(function (data, header, config, status) {
            console.log("error")
        });

    }
}]);