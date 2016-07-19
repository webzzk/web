/**
 * @createDate   2015-08-13 下午05:28:38
 * @author 谢国亮
 */




var allsensorModule = angular.module('allsensorModule', ['ui.router','xcj.validate','xcj.Service','multimeterModule','obdscanModule','cylpressguageModule','dashboardModule','oxygenModule','sparkplugModule','diodelampModule','sataModule','oscilloscopeModule','ignltionTestDeviceModule','xcjDataService','switchModule']);


    allsensorModule.run(function($state,$templateCache){
        $templateCache.put("file.html","template/file.html");
    });

    allsensorModule.directive("file", function ($templateCache) {
        return {
            restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
            templateUrl: $templateCache.get("file.html"),
            replace: false //是否用模板替换当前元素，若为false，则append在当前元素上
        }
    });

    allsensorModule.run(function($state,$templateCache){
        $templateCache.put("repair.html","template/repair.html");
    });

    allsensorModule.directive("repair", function ($templateCache) {
        return {
            restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
            templateUrl: $templateCache.get("repair.html"),
            replace: false //是否用模板替换当前元素，若为false，则append在当前元素上
        }
    });

