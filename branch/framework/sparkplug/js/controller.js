/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var sparkplugModule = angular.module('sparkplugModule', []);
/*加载烟雾的模板*/
sparkplugModule.run(function ($templateCache) {
    $templateCache.put("sparkplugTemplate", "framework/sparkplug/template/sparkplug.html");

});

sparkplugModule.directive("sparkplug", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("sparkplugTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


sparkplugModule.controller('sparkplugCtrl', ['$scope','$timeout', 'sparkplugService','pageService','xcjDataService', function ($scope,$timeout, sparkplugService,pageService,xcjDataService) {

    $scope.sparkplugServiceOdata = sparkplugService.Odata;
    $scope.sparkplugServiceOint = sparkplugService.Oint;
    $scope.sparkplugServiceOout = sparkplugService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    $scope.sparkplugsocketHide=function(){
        sparkplugService.Odata.smokeStatus = false;
        $("#sparkplug").attr("src","images/sparkPlug.png");
        xcjDataService.setHandle('ver375');
    };
    $scope.sparkplug = function () {
        sparkplugService.Odata.smokeStatus = true;
        xcjDataService.setHandle('ver374');
        $timeout(function(){sparkplugService.Odata.freshSocketHontspot();},100);
    };

    $timeout(function(){sparkplugService.Odata.freshSocketHontspot();},100);


    $(".sparkplugsocket").draggable({
        containment: "#contain",
        scroll: false,
        cursor:"move",
        revert: true,
        drag:function(){

        }
    });

}]);



