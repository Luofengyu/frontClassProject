/**
 * Created by hasee on 2016/12/14.
 */
app.controller("registerCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    $scope.userRegister = function () {

        $scope.userRegister = function () {
            $scope.userOBJ = {
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

            if($scope.firstname==null){//判断
                alert("first name不能为空！")
                return false;
            } else {
                if($scope.lastname==null){
                    alert("last name不能为空！")
                    return false;
                }else {
                    if($scope.Email==null){
                        alert("Email不能为空！")
                        return false;
                    }else {
                        if($scope.password==null){
                            alert("password不能为空！")
                            return false;
                        }else {
                            if($scope.city=="null" || $scope.city==undefined){
                                alert("请选择城市！")
                                return false;
                            }else {
                                if($scope.address==null){
                                    alert("地址不能为空！")
                                    return false;
                                }else {
                                    if($scope.age==null){
                                        alert("年龄不能为空！")
                                        return false;
                                    }else {
                                        if($scope.telephone==null){
                                            alert("手机号不能为空！")
                                            return false;
                                        } else {
                                            // $scope.checkMeet=false;
                                            //
                                            // alert("\n成功！" + "\nfirstname: "+ $scope.firstname
                                            //     + "\n lastname: "+ $scope.lastname
                                            //     + "\n Email: "+ $scope.Email
                                            //     + "\n password: "+ $scope.password
                                            //     + "\n city: "+ $scope.city
                                            //     + "\n address: "+ $scope.address
                                            //     + "\n age: "+ $scope.age
                                            //     + "\n telephone: "+ $scope.telephone);

                                            //实现模块
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
                                                    $cookieStore.put("login", "yes");
                                                    $cookieStore.put("user", res.data);
                                                    $state.go("customer.home",{},{reload:true});
                                                }else{
                                                    console.log(res.status)
                                                }
                                                //scope设置

                                            }).error(function (data, header, config, status) {
                                                console.log("error")
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


    }
}]);

