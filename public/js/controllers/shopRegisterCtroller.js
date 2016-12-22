/**
 * Created by hasee on 2016/12/20.
 */
app.controller("shopRegisterCtrl", ["$scope", '$cookieStore','$http', '$state', function ($scope, $cookieStore,$http,$state) {
    var user = $cookieStore.get("user");
    $scope.shopRegister = function () {
        $scope.shop.user_id = user._id;
        $http({
            url: 'http://localhost:3000/shop/register',
            method: 'POST',
            data: $scope.shop
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                console.log(res.data);
                user.role = "saler";
                $cookieStore.put("user", user);
                $state.go("store.login");
            }else{
                console.log(res.status)
            }
        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }

}]);