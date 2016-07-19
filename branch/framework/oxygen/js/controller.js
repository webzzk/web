/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var oxygenModule = angular.module('oxygenModule', []);
    /*加载烟雾的模板*/
    oxygenModule.run(function ($templateCache) {
        $templateCache.put("oxygenTemplate", "framework/oxygen/template/oxygen.html");
    });

    oxygenModule.directive("oxygen", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("oxygenTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


oxygenModule.controller('oxygenCtrl', ['$scope','$timeout', 'oxygenService','pageService','xcjDataService', function ($scope,$timeout, oxygenService,pageService,xcjDataService) {
    $scope.oxygenServiceOdata = oxygenService.Odata;
    $scope.oxygenServiceOint = oxygenService.Oint;
    $scope.oxygenServiceOout = oxygenService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    $scope.oxygenHide=function(){
        xcjDataService.setHandle('ver391');
        //pageService.Pdata.addAction('t09s02');
        oxygenService.Odata.status = false;
        $("#oxygen").attr("src","images/oxygen.png");
    };
    $scope.oxygen = function () {
        xcjDataService.setHandle('ver390');
        //pageService.Pdata.addAction('t09s01');
        oxygenService.Odata.status = true;
    };
    $timeout(function(){oxygenService.Odata.oxygenSocket();},100);
    $(".oxygenSocket").draggable({
        containment: "#contain",
        scroll: false,
        revert: true,
        drag:function(){

        }
    });





}]);



