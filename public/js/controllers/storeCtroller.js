/**
 * Created by hasee on 2016/12/20.
 */
app.controller("storeCtrl", ["$scope", '$cookieStore','$http', function ($scope, $cookieStore, $http) {
    $scope.user = $cookieStore.get("user");
    console.log($scope.user);
    if($scope.user.role == "customer"){
        $scope.userRight = true;
    }else {
        $scope.userRight = false;
        $http({
            url: 'http://localhost:3000/shop/infomation',
            method: 'POST',
            data: {user_id: $scope.user._id}
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                $scope.shop = res.data[0];
                $cookieStore.put("shop",$scope.shop);
            }else{
                console.log(res.status)
            }
        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }
}]);
