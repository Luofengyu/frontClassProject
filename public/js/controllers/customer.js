console.log("i'm in");
app.controller("customerCtrl",['$scope','$cookieStore', function ($scope,$cookieStore) {
    $cookieStore.put("login",true);
    $scope.aaaa="111111";
}] )