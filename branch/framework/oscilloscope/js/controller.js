/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var oscilloscopeModule = angular.module('oscilloscopeModule', []);
/*加载烟雾的模板*/
oscilloscopeModule.run(function ($templateCache) {
    $templateCache.put("oscilloscopeTemplate", "framework/oscilloscope/template/oscilloscope.html");

});

oscilloscopeModule.directive("oscilloscope", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("oscilloscopeTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


oscilloscopeModule.controller('oscilloscopeCtrl', ['$scope','$timeout','$state','$interval', 'oscilloscopeService','pageService','multimeterService','xcjDataService', function ($scope,$timeout,$state,$interval,oscilloscopeService,pageService,multimeterService,xcjDataService) {

    $scope.oscilloscopeServiceMdata = oscilloscopeService.Mdata;
    $scope.oscilloscopeServiceMdata = oscilloscopeService.Mdata;
    $scope.oscilloscopeServiceMdata = oscilloscopeService.Mdata;
    $interval(function () {
        $scope.oscilloscopeServiceMout = oscilloscopeService.Mout;
        //console.log(oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x+'data')//示波器输出
    }, 40);
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    oscilloscopeService.Mdata.Param_leftx = '358';//红色表线起始x坐标\红色表线曲线起始x坐标
    oscilloscopeService.Mdata.Param_lefty = '325';//红色表线起始y坐标\红色表线曲线起始y坐标
    oscilloscopeService.Mdata.Param_leftcx = '420';//红色表线曲线拐x坐标
    oscilloscopeService.Mdata.Param_leftcy = '90';//红色表线曲线拐y坐标
    oscilloscopeService.Mdata.Param_leftpx = '458';//红色表线曲线结束x坐标
    oscilloscopeService.Mdata.Param_leftpy = '152';//红色表线曲线结束x坐标


    $scope.addAction=function(id){
        xcjDataService.setHandle(id);
    };


    oscilloscopeService.Mdata.Param_rightx = '559';//黑色表线起始x坐标\黑色表线曲线起始x坐标
    oscilloscopeService.Mdata.Param_righty = '104';//黑色表线起始y坐标\黑色表线曲线起始y坐标
    oscilloscopeService.Mdata.Param_rightcx = '610';//黑色表线曲线拐x坐标
    oscilloscopeService.Mdata.Param_rightcy = '80';//黑色表线曲线拐y坐标
    oscilloscopeService.Mdata.Param_rightpx = '818';//黑色表线曲线结束x坐标
    oscilloscopeService.Mdata.Param_rightpy = '152';//黑色表线曲线结束x坐标

    oscilloscopeService.Mdata.oscilloscopestartx = '360';//left表线起始x坐标\红色表线曲线起始x坐标的恢复值
    oscilloscopeService.Mdata.oscilloscopestarty = '325';//left表线起始y坐标\红色表线曲线起始y坐标的恢复值
    oscilloscopeService.Mdata.oscilloscoperadianx = '420';//left表线曲线拐x坐标的恢复值
    oscilloscopeService.Mdata.oscilloscoperadiany = '90';//left表线曲线拐y坐标的恢复值
    oscilloscopeService.Mdata.oscilloscopestopx = '458';//left表线曲线结束x坐标的恢复值
    oscilloscopeService.Mdata.oscilloscopestopy = '152';//left表线曲线结束x坐标的恢复值
    oscilloscopeService.Mdata.ostartRollTwo = "";//定时器
    oscilloscopeService.Mdata.penRepetition = '0';//存储示波仪表笔放在那个热区上

    oscilloscopeService.Mdata.oscilloscope_Html = null;//表笔的那个页面
    oscilloscopeService.Mdata.oscilloscopestartx = '792';//二级管试灯表线起始x坐标\二级管试灯表线曲线起始x坐标的恢复值
    oscilloscopeService.Mdata.oscilloscopestarty = '199';//二级管试灯表线起始y坐标\二级管试灯表线曲线起始y坐标的恢复值
    oscilloscopeService.Mdata.oscilloscoperadianx = '810';//二级管试灯表线曲线拐x坐标的恢复值
    oscilloscopeService.Mdata.svgRecoverStatus = '1';


    $("#mask-oscilloscope").css({'top': '319px', 'left': '372px'});
    $("#oscilloscope-left").css({'top': '146px', 'left': '440px'});
    $("#oscilloscope-right").css({'top': '146px', 'left': '541px'});
    $("#oscilloscope-pen").css({'top': '320px', 'left': '340px'});
    $("#oscilloscopeHot-pen").css({'top': '520px', 'left': '340px'});
    $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
    $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " C" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " " + oscilloscopeService.Mdata.Param_leftcx + " " + oscilloscopeService.Mdata.Param_leftcy + " " + oscilloscopeService.Mdata.Param_leftpx + " " + oscilloscopeService.Mdata.Param_leftpy);
    $("#oscilloscope").attr("src", "images/oscilloscope.png");


    $scope.oscilloscope = function () {
        xcjDataService.setHandle('ver386');
        //pageService.Pdata.addAction('t07s01');
        oscilloscopeService.Mdata.oscilloscopeStatus = true;
        oscilloscopeService.Mdata.SvgRedStatus = true;
        $interval(function () {
            multimeterService.Mdata.freshHontspot();
        }, 500);//刷新页面的热区，为表笔接触做准备
    };

    $("#oscilloscopeHot-pen").draggable({//示波仪表笔拖拽
        containment: "#contain", //只能在规定范围
        scroll: false,//不出现滚动条
        iframeFix: true,//不受iframe的影响
        cursor: "move",//拖动的鼠标样式
        /*        revert: true,*/
        drag: function (event) {
            oscilloscopeService.Mdata.oscilloscope_test = false;
            oscilloscopeService.Mdata.oscilloscope_left = 1;
            window.clearInterval(oscilloscopeService.Mdata.startRollTwo);
            $("#oscilloscope-pen").css("top", "" + (parseInt($("#oscilloscopeHot-pen").css("top").replace("px", "")) - 217) + "px");
            $("#oscilloscope-pen").css("left", "" + (parseInt($("#oscilloscopeHot-pen").css("left").replace("px", ""))) + "px");

            $("#oscilloscopeHot-pen").css("top", "" + parseInt($("#oscilloscope-pen").css("top")) + "px");
            $("#oscilloscopeHot-pen").css("left", "" + parseInt($("#oscilloscope-pen").css("left")) + "px");


            var redLeftInt = parseInt($("#oscilloscope-pen").css("left").replace("px", "")) + 17,
                redTopInt = parseInt($("#oscilloscope-pen").css("top").replace("px", "")) + 5,
                topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")) - 162,
                leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")) + 87,
                cl = (redLeftInt + 40),
                ct = (redTopInt - 200);


            oscilloscopeService.Mdata.oscilloscopestartx = leftInt;
            oscilloscopeService.Mdata.oscilloscopestarty = topInt;
            oscilloscopeService.Mdata.oscilloscoperadianx = cl;
            oscilloscopeService.Mdata.oscilloscoperadiany = ct;
            oscilloscopeService.Mdata.oscilloscopestopx = redLeftInt;
            oscilloscopeService.Mdata.oscilloscopestopy = redTopInt;
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';
            var redLeftIntt = redLeftInt - 15, redTopIntt = parseInt(redTopInt) + 230;
            $("#path_left").attr("d", "M" + redLeftInt + " " + redTopInt + " C" + redLeftInt + " " + redTopInt + " " + cl + " " + ct + " " + leftInt + " " + topInt);
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';

        },
        stop: function () {
            var topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")),
                leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")),
                toppoint = topInt - 80,
                leftpoint = leftInt - 290;
            oscilloscopeService.Mdata.Param_leftx = leftpoint + 376;
            oscilloscopeService.Mdata.Param_lefty = toppoint - 82;
            oscilloscopeService.Mdata.Param_leftcx = leftpoint + 330;
            oscilloscopeService.Mdata.Param_leftcy = toppoint - 160;
            oscilloscopeService.Mdata.Param_leftpx = leftpoint + 278;
            oscilloscopeService.Mdata.Param_leftpy = toppoint + 85;
            if (oscilloscopeService.Mdata.svgRecoverStatus == 1) {
                oscilloscopeService.Mdata.oscilloscopePenRecover();
                $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " C" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " " + oscilloscopeService.Mdata.Param_leftcx + " " + oscilloscopeService.Mdata.Param_leftcy + " " + oscilloscopeService.Mdata.Param_leftpx + " " + oscilloscopeService.Mdata.Param_leftpy);

            } else {
                oscilloscopeService.Mdata.svgRecoverStatus = 1;
            }
        }		//alert("drag:"+multimeter_drag_status+"para_sta:"+Param_stasds+"red_sta:"+Param_redstas+"black_sta:"+Param_blackstas+"body:"+multimeter_body+"red"+multimeter_red+"black"+multimeter_black+"");

    });

    //整个示波仪表drag，通过示波仪表身表笔
    $("#mask-oscilloscope").draggable({
        containment: "#contain",
        scroll: false,
        cursor: "move",
        iframeFix: true,
        drag: function (event) {
            //当表笔不在热区上时，
            if (oscilloscopeService.Mdata.oscilloscope_body == 1 && oscilloscopeService.Mdata.oscilloscope_left == 1) {

                var topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")),
                    leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")),
                    toppoint = topInt - 80,
                    leftpoint = leftInt - 290;

                $("#oscilloscope-left").css("top", "" + (toppoint - 90) + "px");
                $("#oscilloscope-left").css("left", "" + (leftpoint + 358) + "px");
                $("#oscilloscope-right").css("top", "" + (toppoint - 90) + "px");
                $("#oscilloscope-right").css("left", "" + (leftpoint + 472) + "px");

                $("#oscilloscope-pen").css("top", "" + (toppoint + 82) + "px");
                $("#oscilloscope-pen").css("left", "" + (leftpoint + 259) + "px");
                $("#oscilloscopeHot-pen").css("top", "" + (toppoint + 282) + "px");
                $("#oscilloscopeHot-pen").css("left", "" + (leftpoint + 259) + "px");
                //设置left表线

                oscilloscopeService.Mdata.Param_leftx = leftpoint + 375;
                oscilloscopeService.Mdata.Param_lefty = toppoint - 80;
                oscilloscopeService.Mdata.Param_leftcx = leftpoint + 320;
                oscilloscopeService.Mdata.Param_leftcy = toppoint - 150;
                oscilloscopeService.Mdata.Param_leftpx = leftpoint + 277;
                oscilloscopeService.Mdata.Param_leftpy = toppoint + 85;

                //设置right表线
                oscilloscopeService.Mdata.Param_rightx = leftpoint + 490;
                oscilloscopeService.Mdata.Param_righty = toppoint - 135;
                oscilloscopeService.Mdata.Param_rightcx = leftpoint + 550;
                oscilloscopeService.Mdata.Param_rightcy = toppoint - 220;
                oscilloscopeService.Mdata.Param_rightpx = 818;
                oscilloscopeService.Mdata.Param_rightpy = 152;
                $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " C" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " " + oscilloscopeService.Mdata.Param_leftcx + " " + oscilloscopeService.Mdata.Param_leftcy + " " + oscilloscopeService.Mdata.Param_leftpx + " " + oscilloscopeService.Mdata.Param_leftpy);
                $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
            }else{
                var redLeftInt = parseInt($("#oscilloscope-pen").css("left").replace("px", "")) + 17,
                    redTopInt = parseInt($("#oscilloscope-pen").css("top").replace("px", "")) + 5,
                    topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")) - 161,
                    leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")) + 87,
                    cl = (redLeftInt + 40),
                    ct = (redTopInt - 180);

                oscilloscopeService.Mdata.oscilloscopestartx = leftInt;
                oscilloscopeService.Mdata.oscilloscopestarty = topInt;
                oscilloscopeService.Mdata.oscilloscoperadianx = cl;
                oscilloscopeService.Mdata.oscilloscoperadiany = ct;
                oscilloscopeService.Mdata.oscilloscopestopx = redLeftInt;
                oscilloscopeService.Mdata.oscilloscopestopy = redTopInt;
                var redLeftIntt = redLeftInt - 15, redTopIntt = parseInt(redTopInt) + 230;
                $("#path_left").attr("d", "M" + redLeftInt + " " + redTopInt + " C" + redLeftInt + " " + redTopInt + " " + cl + " " + ct + " " + leftInt + " " + topInt);

                var topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")),
                    leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")),
                    toppoint = topInt - 80,
                    leftpoint = leftInt - 290;

                $("#oscilloscope-left").css("top", "" + (toppoint - 90) + "px");
                $("#oscilloscope-left").css("left", "" + (leftpoint + 358) + "px");
                $("#oscilloscope-right").css("top", "" + (toppoint - 90) + "px");
                $("#oscilloscope-right").css("left", "" + (leftpoint + 472) + "px");
                //设置right表线
                oscilloscopeService.Mdata.Param_rightx = leftpoint + 490;
                oscilloscopeService.Mdata.Param_righty = toppoint - 135;
                oscilloscopeService.Mdata.Param_rightcx = leftpoint + 550;
                oscilloscopeService.Mdata.Param_rightcy = toppoint - 220;
                oscilloscopeService.Mdata.Param_rightpx = 818;
                oscilloscopeService.Mdata.Param_rightpy = 152;
                $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
                clearInterval(oscilloscopeService.Mdata.startRollTwo);
            }
        }
    });

    $scope.oscilloscope_pen = function (href) {
        if (href != null) {
            $state.go(href);
            $timeout(function () {
                multimeterService.Mdata.freshHontspot();
            }, 100);
            if (oscilloscopeService.Mdata.oscilloscopeStatus) {
                if (oscilloscopeService.Mdata.oscilloscope_Html == href || oscilloscopeService.Mdata.oscilloscope_Html == null) {
                    oscilloscopeService.Mdata.SvgLeftStatus = true;
                    oscilloscopeService.Mdata.oscilloscope_pen = true;
                } else {
                    oscilloscopeService.Mdata.SvgLeftStatus = false;
                    oscilloscopeService.Mdata.oscilloscope_pen = false;
                }
            }

        }
    };



    //监听波形变化
    var oscilloscopeWacth= $scope.$watch(function(){return oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x},function(newVal,oldVal,scope){
        //$(".oUl").css({marginLeft:"0px"});
        // alert(oldVal);
        if(newVal!=oldVal){
            if(oscilloscopeService.Mdata.startRollTwo){
                oscilloscopeService.Mdata.rollInit=1;

            }
        }
    } );

    //监听示波器上时间值的变化
    var oscilloscopeTime = $scope.$watch(function(){return oscilloscopeService.Mout.Out1TestPS_x_XAxis_x_x},function(newVal){
        if(parseInt(newVal)>=1000){
            oscilloscopeService.Mdata.Out1TestPS_x_XAxis_x_x = parseInt(oscilloscopeService.Mout.Out1TestPS_x_XAxis_x_x)/1000;
            oscilloscopeService.Mdata.time = '1';
        }else{
            oscilloscopeService.Mdata.Out1TestPS_x_XAxis_x_x = parseInt(oscilloscopeService.Mout.Out1TestPS_x_XAxis_x_x);
            oscilloscopeService.Mdata.time = '0';

        }
    })

}]);




