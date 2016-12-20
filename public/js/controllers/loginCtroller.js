/**
 * Created by hasee on 2016/12/13.
 */
app.controller("loginCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $scope.userLogin = function () {
        $http({
            url: 'http://localhost:3000/user/login',
            method: 'POST',
            data: {"Email": $scope.Email, "password":$scope.password}
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                $cookieStore.put("login", "yes");
                $cookieStore.put("user", res.data[0]);
                $state.go("customer.home",{},{reload:true});
            }else{
                console.log(data.status)
            }
            //scope设置

        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }
}]);