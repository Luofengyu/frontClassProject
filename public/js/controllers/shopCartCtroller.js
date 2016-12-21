/**
 * Created by hasee on 2016/12/21.
 */
app.controller("shopCartCtrl", ["$scope", '$cookieStore','$http', function ($scope, $cookieStore, $http) {
    $scope.user = $cookieStore.get("user");
    $scope.totalMoney = 0;
    $scope.orderList = [];
    $http({
        url: 'http://localhost:3000/cart/productions',
        method: 'GET',
        data: {"user_id":$scope.user._id}
    }).success(function (res, header, config, status) {
        //响应成功
        if(res.status == "success"){
            $scope.cartList = res.data;
            console.log($scope.cartList);
        }else{
            console.log(res.status)
        }
    }).error(function (data, header, config, status) {
        console.log("error")
    });
    
    $scope.orderChoose = function ($event,product) {
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        var tempMoney = product.number*product.price;
        if (action == "add"){
            $scope.totalMoney += tempMoney;
            $scope.orderList.push(product);
        }else{
            $scope.totalMoney -= tempMoney;
            var index = $scope.orderList.indexOf(product);
            $scope.orderList.splice(index, 1);
        }
    };
    $scope.createOrder = function () {
        $http({
            url: 'http://localhost:3000/order/create',
            method: 'POST',
            data: {"user":$scope.user, "productions":$scope.orderList}
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                console.log(res.data);
            }else{
                console.log(res.status)
            }
        }).error(function (data, header, config, status) {
            console.log("error")
        });
    }
}]);