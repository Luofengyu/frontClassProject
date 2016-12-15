/**
 * Created by hasee on 2016/12/14.
 */
app.controller("registerCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $scope.userRegister = function () {
        $http({
            url: 'http://localhost:3000/user/register',
            method: 'POST',
            data: {
                firstname:$scope.firstname,
                lastname:$scope.lastname,
                Email:$scope.Email,
                password:$scope.password,
                city:$scope.city,
                address:$scope.address,
                age:$scope.age,
                telephone:$scope.telephone,
                role: "customer"
            }
        }).success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                console.log(res.data)
                $cookieStore.put("login", "yes");
                $cookieStore.put("user", res.data);
                $state.go("customer.home");
            }else{
                console.log(res.status)
            }
            //scope设置

        }).error(function (data, header, config, status) {
            console.log("error")
        })
    }
}]);