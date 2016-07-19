/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var sataModule = angular.module('sataModule', []);
    /*加载烟雾的模板*/
    sataModule.run(function ($templateCache) {
        $templateCache.put("sataTemplate", "framework/sata/template/sata.html");
    });

    sataModule.directive("sata", function ($templateCache) {
    return {
        restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
        templateUrl: $templateCache.get("sataTemplate"),
        replace: false //是否
        // 用模板替换当前元素，若为false，则append在当前元素上
    }
});


sataModule.controller('sataCtrl', ['$scope','$timeout', 'sataService','pageService','xcjDataService', function ($scope,$timeout, sataService,pageService,xcjDataService) {

    $scope.sataServiceOdata = sataService.Odata;
    $scope.sataServiceOint = sataService.Oint;
    $scope.sataServiceOout = sataService.Oout;
    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数
    $scope.sataHide=function(){
        xcjDataService.setHandle('ver385');
        sataService.Odata.menuStatus = false;
        $("#sata").attr("src","images/starTool.png");
    };
    $scope.sata = function () {
        xcjDataService.setHandle('ver384');
        sataService.Odata.menuStatus = true;
    };
    var sataToolList={"E":["E6","E7","E8","E9","E10","E11","E12","E14","E16","E18","E20","E22","E24"],"H":["5mm","6mm","7mm","8mm","9mm","10mm","11mm","12mm","13mm","14mm","15mm","16mm","17mm","18mm","19mm","20mm","21mm","22mm","23mm","24mm","25mm","26mm"],"D":["11mm","12mm","13mm","14mm","15mm","16mm","17mm","18mm","19mm","20mm","21mm","22mm","23mm","24mm","25mm","26mm"],"A":["3mm","4mm","5mm","6mm","7mm"],"T":["T15","T20","T25","T30","T40","T45","T50","T55"]
    };
    //切换世达工具
    $scope.changeSata=function(){

        var size=$(".images .num").html();
        sataService.Odata.sataSize=size;
        $scope.changeSataTool();
        $scope.sataHide();
    };
    //切换工具列表
    $timeout(function () {
        $scope.changeList('E','Etype');
    },100);
    $scope.changeList=function(id,type){
        var html="";
        var ary=sataToolList[id];
        for(var i=0;i<ary.length;i++){
            if(i==0){
                html+="<li class='choise'>"+ary[i]+"</li>";
            }else{
                html+="<li>"+ary[i]+"</li>";
            }
        }
        $("#sataToolList").html(html);
        $(".num").html($('.choise').html());
        sataService.Odata.sataType=type;
        $(".images img").attr("src","images/sataTool/"+type+".png");
        $("#"+id).addClass("select").siblings().removeClass("select");
        $scope.initSataTool();
        $('.sizes').scrollTop(0);
        $('.sizes').perfectScrollbar("update");
    };
    $scope.initSataTool= function () {
        $.each($(".sizes ul li"),function(i,u){
           $(u).click(function(){
               var size=$(this).html();
               $(this).addClass("choise").siblings().removeClass("choise");
               $(".num").html(size);
           });
        });
    };

    $(".sata").draggable({
        containment: "#contain",
        scroll: false,
        drag:function(){

        }
    });
    $("#sataTool").draggable({
        containment: "#contain",
        scroll: false,
        revert: true,
        drag:function(){

        }
    });
    //切换世达工具
    $scope.changeSataTool=function(){
        sataService.Odata.sata=true;
        $(".sataTool img").attr("src","images/sataTool/"+sataService.Odata.sataType+".png");
        $(".sataSize").html(sataService.Odata.sataSize);
        $('.sata-hot').css("background", "url('images/sataTool/"+sataService.Odata.sataType+"_hot.png')no-repeat");
    };
    //关闭世达工具
    $scope.sataToolsHide=function(){
        sataService.Odata.sata=false;
    }

}]);



