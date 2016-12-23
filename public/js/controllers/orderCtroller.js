/**
 * Created by hasee on 2016/12/23.
 */
app.controller("orderCtrl", ["$scope", "$state", "$cookieStore","$http", function($scope, $state, $cookieStore,$http){
    //获取已有的商品列表
    var order_id = $cookieStore.get("order_id");
    console.log(order_id);
    $http({
        url: 'http://localhost:3000/get/order',
        method: 'POST',
        data: {"_id": order_id}
    })
        .success(function (res, header, config, status) {
            //响应成功
            if(res.status == "success"){
                // 商品列表
                $scope.products = res.data[0].products;
                $scope.user = res.data[0].user;
                $scope.totalPrice= res.data[0].total;
            }else{
                alert("订单创建有误！");
                console.log(res.status);
            }
        })
        .error(function (data, header, config, status) {
            console.log("error")
        });

}]);