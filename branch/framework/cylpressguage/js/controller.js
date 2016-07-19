/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var cylpressguageModule = angular.module('cylpressguageModule', []);
/*加载诊断仪的模板*/
cylpressguageModule.run(function ($templateCache) {
    $templateCache.put("cylpressguageTemplate", "framework/cylpressguage/template/cylpressguage.html");
});

cylpressguageModule.directive("cylpressguage", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("cylpressguageTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


cylpressguageModule.controller('cylpressguageCtrl', ['$scope','$timeout', 'cylpressguageService','$interval', 'pageService','xcjDataService',function ($scope,$timeout, cylpressguageService,$interval,pageService,xcjDataService) {
    $scope.cylpressguageServiceOdata = cylpressguageService.Odata;
    $scope.cylpressguageServiceOint = cylpressguageService.Oint;
    $scope.cylpressguageServiceOout = cylpressguageService.Oout;
    $scope.cylpressguage = function () {
        xcjDataService.setHandle('ver378');
        if( cylpressguageService.Odata.cylpressguage=="0"){
        cylpressguageService.Odata.cylpressguageStatus = true;
            cylpressguageService.Odata.freshCylpressguageServiceHontspot();
        }
    }
    $(".cylpressguage-oilwatch").draggable({
        containment: "#contain",
        scroll: false,
        revert: true
    });



    $scope.cylpressguagehide0 = function () {
        cylpressguageService.Odata.cylpressguagehide0();
    }
    $scope.cylpressguagehide1 = function () {
        xcjDataService.setHandle('ver379');
        $("#cylpressguage").attr("src","images/cylinder.png");
        cylpressguageService.Odata.cylpressguagehide1();

    }
}])



