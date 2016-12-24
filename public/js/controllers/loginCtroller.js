/**
 * Created by hasee on 2016/12/13.
 */
app.controller("loginCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $scope.userLogin = function () {
        $scope.userLoginOBJ = {
            Email:$scope.Email,
            password:$scope.password,
            role: "customer"
        }

        if($scope.Email==null){
            alert("Email不能为空！")
            return false;
        }else {
            if($scope.password==null){
                alert("密码不能为空！")
                return false;
            } else {
                //测试模块
                // $scope.checkMeet=false;
                // alert("\n成功！" + "\n 用户名: "+ $scope.Email
                //     + "\n 密码: "+ $scope.password);


                //实现模块
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
                        console.log(res.status);
                    }
                    //scope设置

                }).error(function (data, header, config, status) {
                    console.log("error")
                })

            }
        }
    }
}]);



