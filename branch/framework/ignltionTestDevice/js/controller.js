
var ignltionTestDeviceModule = angular.module('ignltionTestDeviceModule', []);
    /*加载点火测试仪的模板*/
ignltionTestDeviceModule.run(function ($templateCache) {
        $templateCache.put("ignltionTestDeviceTemplate", "framework/ignltionTestDevice/template/ignltionTestDevice.html");
    });

ignltionTestDeviceModule.directive("ignltiontestdevice", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("ignltionTestDeviceTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


ignltionTestDeviceModule.controller('ignltionTestDeviceCtrl', ['$scope','$timeout', 'ignltionTestDeviceService','pageService','xcjDataService', function ($scope,$timeout, ignltionTestDeviceService,pageService,xcjDataService) {

    $scope.ignltionTestDeviceServiceOdata = ignltionTestDeviceService.Odata;
    $scope.ignltionTestDeviceServiceOint = ignltionTestDeviceService.Oint;
    $scope.ignltionTestDeviceServiceOout = ignltionTestDeviceService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    $scope.ignltionTestDeviceHide=function(){
        xcjDataService.setHandle('ver389');
        ignltionTestDeviceService.Odata.ignltionTestDeviceStatus = false;
        $("#ignltionTestDevice").attr("src","images/ignltionTestDevice.png");
    };
    $scope.ignltionTestDevice = function () {
        xcjDataService.setHandle('ver388');
        ignltionTestDeviceService.Odata.ignltionTestDeviceStatus = true;
        $timeout(function(){ignltionTestDeviceService.Odata.ignltionTestDeviceHontspot()},100);
    };

    $(".ignltionTestDevice").draggable({
        containment: "#contain",
        scroll: false,
        cursor:"move",
        revert: true,
        drag:function(){

        }
    });


}]);



