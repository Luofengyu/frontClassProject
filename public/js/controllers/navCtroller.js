/**
 * Created by hasee on 2016/12/13.
 */
app.controller("navCtrl", ["$scope", '$cookieStore',function ($scope, $cookieStore) {
    if($cookieStore.get("login")){
        console.log("login");
    }else{
        console.log("not login")
    }
}]);