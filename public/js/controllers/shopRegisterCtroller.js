/**
 * Created by hasee on 2016/12/20.
 */
app.controller("shopRegisterCtrl", ["$scope", '$cookieStore','$http', '$state', function ($scope, $cookieStore,$http,$state) {
    var user = $cookieStore.get("user");
    $scope.shopRegister = function () {
        console.log($scope.shop);

        if($scope.shop==null||$scope.shop.company==null){//判断
            alert("CompanyName 不能为空！")
            return false;
        } else {
            if($scope.shop.Email==null){
                alert("Email 不能为空！")
                return false;
            }else {
                if($scope.shop.website==null){
                    alert("YourWebsite 不能为空！")
                    return false;
                }else {
                    if($scope.shop.subject==null){
                        alert("Subject 不能为空！")
                        return false;
                    }else {
                        if($scope.shop.message==null){
                            alert("Message 不能为空！")
                            return false;
                        }else {
                            //测试模块
                            // alert("\n成功！"
                            //     + "\n CompanyName: "+ $scope.shop.company
                            //     + "\n Email: "+ $scope.shop.Email
                            //     + "\n YourWebsite: "+ $scope.shop.website
                            //     + "\n Subject: "+ $scope.shop.subject
                            //     + "\n Message: "+ $scope.shop.message);

                            //功能实现
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
                    }
                }
            }
        }
    }

}]);



