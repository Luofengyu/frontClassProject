/**
 * Created by hasee on 2016/12/20.
 */
app.controller("homeCtrl", ["$scope", '$cookieStore','$http', '$state', function ($scope, $cookieStore, $http, $state) {
    var user = $cookieStore.get("user");
    $scope.addProductCount = 0;
    $http({
        url: 'http://localhost:3000/home/productions',
        method: 'GET'
    }).success(function (res, header, config, status) {
        //响应成功
        if(res.status == "success"){
            $scope.productList = res.data;
            $scope.advice = $scope.productList[$scope.productList.length-1]
        }else{
            console.log(res.status)
        }
    }).error(function (data, header, config, status) {
        console.log("error")
    });
    
    $scope.toSingleItem = function (production) {
        $cookieStore.put("singleProduction", production);
        $state.go("productionInfo");
    };

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
                console.log(res.data);
                $scope.addProductCount += 1

            }else{
                console.log(res.status)
            }
        }).error(function (data, header, config, status) {
            console.log("error")
        });
    }
}]);