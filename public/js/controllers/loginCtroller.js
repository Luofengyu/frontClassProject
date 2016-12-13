/**
 * Created by hasee on 2016/12/13.
 */
app.controller("loginCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $scope.userLogin = function () {
        $http({
            url: 'http://localhost:3000/user/login',
            method: 'POST',
            data: {"username": $scope.username,"password":$scope.password}
        }).success(function (data, header, config, status) {
            //响应成功
            console.log(data);
            //scope设置

        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }
}]);