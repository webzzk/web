var switchModule = angular.module('switchModule', []);
/*加载烟雾的模板*/
switchModule.run(function ($templateCache) {
    $templateCache.put("s13dTemplate", "switchElement/template/s13d.html");
    $templateCache.put("s30swtTemplate", "switchElement/template/s30swt.html");
    $templateCache.put("s33Template", "switchElement/template/s33.html");
    $templateCache.put("s58bTemplate", "switchElement/template/s58b.html");
    $templateCache.put("s78swtTemplate", "switchElement/template/s78swt.html");
    $templateCache.put("s79dTemplate", "switchElement/template/s79d.html");
    $templateCache.put("s82swtTemplate", "switchElement/template/s82swt.html");
    $templateCache.put("sceneTemplate", "switchElement/template/sceneSimulation.html");

});
switchModule.directive("scene", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("sceneTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s13d", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s13dTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s30swt", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s30swtTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s33", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s33Template"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s58b", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s58bTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s78swt", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s78swtTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s79d", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s79dTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});
switchModule.directive("s82swt", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("s82swtTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});

switchModule.controller('switchCtrl', ['$scope', '$timeout', 'switchService', 'pageService','xcjDataService', function ($scope, $timeout, switchService, pageService,xcjDataService) {

    $scope.switchServiceOdata = switchService.Odata;
    $scope.switchServiceOint = switchService.Oint;
    $scope.switchServiceOout = switchService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    $scope.xcjDataService=xcjDataService;
    //控制开关显隐
    $scope.switchHide = function (id) {
        switchService.Odata[id + "Status"] = false;
        $('#' + id).attr("src", "images/" + id + ".png");
        switchService.Odata[id] = false;
if( switchService.Odata.s13d==false&&
        switchService.Odata.s30swt==false&&
        switchService.Odata.s58b==false&&
        switchService.Odata.s79d==false&&
        switchService.Odata.s82swt==false){
    switchService.Odata.sceneSimulationStatus = false;
}
        if(id=="s82swt"){
            if($.isFunction(myWatchs82swt)){
                myWatchs82swt();
            }
}
    };
    $scope.switchInt = function (id) {
        switchService.Odata[id + "Status"] = true;
        if(id!=='s82swt'&&switchService.Odata.s82swt==true){
            if($.isFunction(myWatchs82swt)){
                myWatchs82swt();
            }
            $scope.wiperAni(0, 2);
        }
        if(id=='s30swt'||id=='s82swt'||id=='s13d'||id=='s58b'||id=='s79d'){
            switchService.Odata.s13d=false;
            switchService.Odata.s30swt=false;
            switchService.Odata.s58b=false;
            switchService.Odata.s79d=false;
            switchService.Odata.s82swt=false;
            switchService.Odata[id]=true;
            switchService.Odata.sceneSimulationStatus = true;
        }

        $timeout(function () {
            switch (id) {
                case "s13d":
                    $scope.bindMouseS13d();
                    break;
                case "s33":
                    $scope.bindMouseS33();
                    break;
                case "s79d":
                    $scope.bindMouseS79d();
                    break;
                case "s58b":
                    $scope.bindMouseS58b();
                    break;
            }
        }, 200);
    };

    //页面绑定方法
    $scope.bindMouseS13d = function () {
        var targetPage=$('.fd-bg').attr('href');
        $('.s13d-head1').mousedown(function () {
            pageService.Pint.In1Veh_S13D_SwitchOpen_x_x = '1';
            if("switchService.Oout.Out1Veh_x_"+targetPage+"_Normal_x'=='1'"){
                switchService.Odata.doorStatus=true;
            }
        });
        $('.s13d-head1-o').mouseup(function () {
            pageService.Pint.In1Veh_S13D_SwitchOpen_x_x = '0';
        });
        $('.s13d-head2').mousedown(function () {
            pageService.Pint.In1Veh_S13D_SwitchClose_x_x = '1';
            if("switchService.Oout.Out1Veh_x_"+targetPage+"_Normal_x'=='2'"){
                xcjDataService.setHandle('ver904');
                switchService.Odata.doorStatus=false;
            }
        });
        $('.s13d-head2-o').mouseup(function () {
            pageService.Pint.In1Veh_S13D_SwitchClose_x_x = '0';
        });
    };
    $scope.changeState1 = function (num) {
        if (num == '0') {
            pageService.Pint.In1Veh_S30Swt_Close_x_x = '0';
        } else {
            xcjDataService.setHandle('ver903');
            pageService.Pint.In1Veh_S30Swt_Close_x_x = '1';
        }
        $('.s30swt2').css({
            '-ms-transform': 'rotate(' + num + 'deg)',
            '-moz-transform': 'rotate(' + num + 'deg)',
            '-webkit-transform': 'rotate(' + num + 'deg)',
            '-o-transform': 'rotate(' + num + 'deg)',
            'transform': 'rotate(' + num + 'deg)'
        });
    };
    $scope.bindMouseS33 = function () {
        $('.s33-head').mousedown(function () {
            pageService.Pint.In1Veh_S33_Switch_x_x = '1';
        });
        $('.s33-head-k').mouseup(function () {
            xcjDataService.setHandle('ver906');
            pageService.Pint.In1Veh_S33_Switch_x_x = '0';
        });
    };
    $scope.bindMouseS58b = function () {
        $('.s58b-head-k').mousedown(function () {
            pageService.Pint.In1Veh_S58B_Switch_x_x = '1';
        });
        $('.s58b-head').mouseup(function () {
            pageService.Pint.In1Veh_S58B_Switch_x_x = '0';
            if(switchService.Oout.Out1Veh_x_S58B_Normal_x=='1'){
                xcjDataService.setHandle('ver907');
                pageService.Pdata.trunkStatus = '1';
            }
        });
    };
    $scope.bindMouseS79d = function () {
        var time = "";
        $.each([1, 2, 3, 4], function (i, u) {
            $('.s79d-head' + u).mousedown(function () {
                if (pageService.Pint.In1Veh_S79D_SwitchRise_x_x == "1") {
                    switchService.Odata['up' + u] = true;
                    if (u == '1') {

                            time = (parseInt($('.ani-window').css('top')) - 49) * 50;
                        xcjDataService.setHandle('ver915');
                            $('.ani-window').animate({top: '49px'}, time);

                    }

                } else if (pageService.Pint.In1Veh_S79D_SwitchDescend_x_x == '1') {
                    switchService.Odata['down' + u] = true;
                    if (u == '1') {

                            time = (119 - parseInt($('.ani-window').css('top'))) * 50;
                        xcjDataService.setHandle('ver916');
                            $('.ani-window').animate({top: '119px'}, time);

                    }
                }
            });
            $('.s79d-head' + u).mouseup(function () {
                if (pageService.Pint.In1Veh_S79D_SwitchRise_x_x == "1") {
                    switchService.Odata['up' + u] = false;
                    if (u == '1') {
                        $('.ani-window').stop(true);
                    }
                } else if (pageService.Pint.In1Veh_S79D_SwitchDescend_x_x == '1') {
                    switchService.Odata['down' + u] = false;
                    if (u == '1') {
                        $('.ani-window').stop(true);
                    }
                }
            });
        });
    };
    var myWatchs82swt='';
    $scope.changeState = function (num) {
        pageService.Pint.In1Veh_S85Swt_OFF_x_x = '1';
        pageService.Pint.In1Veh_S82Swt_HighSpeed_x_x = '0';
        pageService.Pint.In1Veh_S83Swt_LowSpeed_x_x = '0';
        pageService.Pint.In1Veh_S84Swt_Intermission_x_x = '0';
        pageService.Pint.In1Veh_S86Swt_1x_x_x = '0';
        $('.s82swt-head').css({
            '-ms-transform': 'rotate(' + num + 'deg)',
            '-moz-transform': 'rotate(' + num + 'deg)',
            '-webkit-transform': 'rotate(' + num + 'deg)',
            '-o-transform': 'rotate(' + num + 'deg)',
            'transform': 'rotate(' + num + 'deg)'
        });
        if (num == '30') {

                pageService.Pint.In1Veh_S86Swt_1x_x_x = '1';
                $scope.wiperAni(200, 0);
                $timeout(function () {
                    $('.s82swt-head').css({
                        '-ms-transform': 'rotate(23deg)',
                        '-moz-transform': 'rotate(23deg)',
                        '-webkit-transform': 'rotate(23deg)',
                        '-o-transform': 'rotate(23deg)',
                        'transform': 'rotate(23deg)'
                    });
                    pageService.Pint.In1Veh_S85Swt_OFF_x_x = '0';
                }, 600);
                $timeout(function(){
                    $scope.wiperAni(0, 2);
                },2000)


        } else if (num == '2') {
            xcjDataService.setHandle('ver908');
                pageService.Pint.In1Veh_S82Swt_HighSpeed_x_x = '1';
                $scope.wiperAni(100, 0);


        } else if (num == '9') {

                pageService.Pint.In1Veh_S83Swt_LowSpeed_x_x = '1';
                $scope.wiperAni(200, 0);

        } else if (num == '16') {

                pageService.Pint.In1Veh_S84Swt_Intermission_x_x = '1';
                $scope.wiperAni(200, 1);

        } else if (num == '23') {

                pageService.Pint.In1Veh_S85Swt_OFF_x_x = '0';
                $scope.wiperAni(0, 2);

        }
        //雨刷监听
         myWatchs82swt= $scope.$watch(function(){
            return switchService.Oout.Out1Veh_x_S82_Normal_x;
        },function(newVal,oldVal,scope){
            if(newVal=='2'){
                $scope.wiperAni(0, 2);
            }
        });
    };

    //雨刷动画

    var myTime="";
    $scope.wiperAni=function(time,tag){
        var time2=1000;
        if(tag=='2'){
            window.clearTimeout(myTime);
            switchService.Odata.wiper=false;
            return;
        }
        if(switchService.Odata.wiper){
            time2=2000;
        }
        if(switchService.Oout.Out1Veh_x_S82_Normal_x=='0')return;
        window.clearTimeout(myTime);
  myTime=window.setTimeout(function(){
    window.setTimeout(function(){
        switchService.Odata.wiper=true;
        switchService.Odata.wiper1=false;
        switchService.Odata.wiper2=true;
    },time);

    window.setTimeout(function(){
        switchService.Odata.wiper2=false;
        switchService.Odata.wiper3=true;
    },2*time);

    window.setTimeout(function(){
        switchService.Odata.wiper3=false;
        switchService.Odata.wiper4=true;
    },3*time);

    window.setTimeout(function(){
        switchService.Odata.wiper4=false;
        switchService.Odata.wiper5=true;
    },4*time);

    window.setTimeout(function(){
        switchService.Odata.wiper5=false;
        switchService.Odata.wiper6=true;
    },5*time);

    window.setTimeout(function(){
        switchService.Odata.wiper6=false;
        switchService.Odata.wiper5=true;
    },6*time);

    window.setTimeout(function(){
        switchService.Odata.wiper5=false;
        switchService.Odata.wiper4=true;
    },7*time);

    window.setTimeout(function(){
        switchService.Odata.wiper4=false;
        switchService.Odata.wiper3=true;
    },8*time);

    window.setTimeout(function(){
        switchService.Odata.wiper3=false;
        switchService.Odata.wiper2=true;
    },9*time);

    window.setTimeout(function(){
        switchService.Odata.wiper2=false;
        switchService.Odata.wiper1=true;
        switchService.Odata.wiper=false;
    },10*time);
    if(tag=='0'){
        myTime=window.setTimeout(arguments.callee,11*time);
    }else if(tag=='1'){
        myTime=window.setTimeout(arguments.callee,20*time);
    }
},time2);


};
    $scope.setHandle=function(id){
        xcjDataService.setHandle(id);
    };

    //开关可拖动
    $.each(['s13d', 's30swt', 's33', 's58b', 's78swt', 's79d', 's82swt','sceneSimulation'], function (i, u) {
        $("." + u).draggable({
            containment: "#contain",
            scroll: false,
            cursor: "move",
            drag: function () {

            }
        });
    });


}]);
