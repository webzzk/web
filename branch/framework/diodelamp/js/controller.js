/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var diodelampModule = angular.module('diodelampModule', []);
    /*加载烟雾的模板*/
    diodelampModule.run(function ($templateCache) {
        $templateCache.put("diodelampTemplate", "framework/diodelamp/template/diodelamp.html");

    });

    diodelampModule.directive("diodelamp", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("diodelampTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


diodelampModule.controller('diodelampCtrl', ['$scope','$timeout', '$interval','diodelampService','pageService','multimeterService','xcjDataService',function ($scope,$timeout,$interval,diodelampService,pageService,multimeterService,xcjDataService) {
    var diodelampHontspotSet;
    $scope.diodelampServiceOdata = diodelampService.Odata;
    $scope.diodelampServiceOint = diodelampService.Oint;
    $scope.diodelampServiceOout = diodelampService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数

    $scope.diodelamp = function () {
        xcjDataService.setHandle('ver382');
        diodelampService.Odata.diodelampStatus = true;
        diodelampService.Odata.SvgStatus = true;

        diodelampHontspotSet=$interval(function() {multimeterService.Mdata.freshHontspot();},500);//刷新页面的热区，为表笔接触做准备
        $interval(function(){
            diodelampService.Odata.showHide()
        },400);
        $("#diodelamp_needle_hot").draggable({//二极管试灯笔拖动
            containment: "#contain", //只能在规定范围
            scroll: false,//不出现滚动条
            iframeFix: true,//不受iframe的影响
            cursor: "move",//拖动的鼠标样式
            drag: function (event) {
                //diodelampService.Odata.svgRecoverStatus == 1;
                $("#diodelamp-line").css("position","absolute");
                $("#diodelamp-line").css("top", "" + (parseInt($("#diodelamp_needle_hot").css("top").replace("px", "")) - 243) + "px");
                $("#diodelamp-line").css("left", "" + (parseInt($("#diodelamp_needle_hot").css("left").replace("px", ""))+ 0) + "px");
                var redLeftInt = parseInt($("#diodelamp-line").css("left").replace("px", "")) + 41,
                    redTopInt = parseInt($("#diodelamp-line").css("top").replace("px", "")) - 36,
                //topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")) + 230,
                //leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")) + 110,
                    topInt = 152,
                    leftInt = 818,
                    cl = (redLeftInt + 10),
                    ct = (redTopInt - 40);

                /* console.log(window.parent.Param_stasds);*/
                diodelampService.Odata.diodelampstartx = leftInt;//二级管试灯表线起始x坐标\二级管试灯表线曲线起始x坐标的恢复值
                diodelampService.Odata.diodelampstarty = topInt;//二级管试灯表线起始y坐标\二级管试灯表线曲线起始y坐标的恢复值
                diodelampService.Odata.diodelampradianx = cl;//二级管试灯表线曲线拐x坐标的恢复值
                diodelampService.Odata.diodelampradiany = ct;//二级管试灯表线曲线拐y坐标的恢复值
                diodelampService.Odata.diodelampstopx = redLeftInt;//二级管试灯表线曲线结束x坐标的恢复值
                diodelampService.Odata.diodelampstopy = redTopInt;//二级管试灯表线曲线结束y坐标的恢复值
                multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';//二级管试灯表输入值为0
                var redLeftIntt = redLeftInt - 15, redTopIntt = parseInt(redTopInt) + 230;
                $("#path_iodelamp").attr("d", "M" + redLeftInt + " " + redTopInt + " C" + redLeftInt + " " + redTopInt + " " + cl + " " + ct + " " + leftInt + " " + topInt);

            },
            stop: function () {
                if(diodelampService.Odata.svgRecoverStatus == 1){
                    $("#path_iodelamp").attr("d", "M792 149  C792 149 810 140 818 152 ");
                    $(".diodelamp-pen").css({top:'188px',left:'750px'});
                    $(".diodelamp_needle_hot").css({top:'423px',left:'753px'});
                    diodelampService.Odata.diodelamp_Html = null;
                    diodelampService.Odata.SvgStatus = true;
                    diodelampService.Odata.diodelampRepetition = 0;
                    multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';
                }else{
                    diodelampService.Odata.svgRecoverStatus = 1;
                }

            }		//alert("drag:"+multimeter_drag_status+"para_sta:"+Param_stasds+"red_sta:"+Param_redstas+"black_sta:"+Param_blackstas+"body:"+multimeter_body+"red"+multimeter_red+"black"+multimeter_black+"");


        });
    };



}]);



