/**
 * Created by hasee on 2016/12/13.
 */
app.controller("navCtrl", ["$scope", '$cookieStore',function ($scope, $cookieStore) {
        if($cookieStore.get("login") == "yes"){
            $scope.loginCheck = false;
            console.log("login");
        }else{
            $scope.loginCheck = true;
            console.log("not login")
        }
}]);