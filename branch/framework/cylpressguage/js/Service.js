/**
 * @author 谢国亮
 */
cylpressguageModule.service('cylpressguageService', function ($timeout,pageService) {
    var cylpressguageService = cylpressguageService || {};
    cylpressguageService.Odata = cylpressguageService.Odata || {};
    cylpressguageService.Oint = cylpressguageService.Oint || {};
    cylpressguageService.Oout = cylpressguageService.Oout || {};
    cylpressguageService.Odata = {
        cylpressguageStatus: false,//缸压表的显示状态
        cylpressguage: '0',//缸压表在几缸
        gybzz:'0',///缸压表指针
        cylpressguage1: false,//在1缸的缸压表是否指数改变
        cylpressguage2: false,//在1缸的缸压表是否指数改变
        cylpressguage3: false,//在1缸的缸压表是否指数改变
        cylpressguage4: false,//在1缸的缸压表是否指数改变
        cylpressPage: '0',//缸压表的显示的页面
        cylpressStatus: true,//缸压表的显示状态
        cylpressStatus_tishi:false,//缸压表经过缸时的提示
        freshCylpressguageServiceHontspot : function () {
            $("#cylpressguage_hot1").droppable({
                accept: ".cylpressguage-oilwatch",
                tolerance: "pointer",
                greedy: true,
                drop: function (event, ui) {
                    cylpressguageService.Odata.cylpressguage="1";

                    cylpressguageService.Odata.cylpressguageAnimate(1);
                }
            });
           $("#cylpressguage_hot2").droppable({
                accept: ".cylpressguage-oilwatch",
                tolerance: "pointer",
                greedy: true,
                drop: function (event, ui) {
                    //$scope.cylpressguageServiceOdata.cylpressguage="2";
                    cylpressguageService.Odata.cylpressguage="2";
                    cylpressguageService.Odata.cylpressguageAnimate(2);

                }
            });
            $("#cylpressguage_hot3").droppable({
                accept: ".cylpressguage-oilwatch",
                tolerance: "pointer",
                greedy: true,
                drop: function (event, ui) {
                    //$scope.cylpressguageServiceOdata.cylpressguage="3";
                    cylpressguageService.Odata.cylpressguage="3";
                    //$scope.cylpressguageServiceOdata.cylpressPage="dh200";
                    cylpressguageService.Odata.cylpressguageAnimate(3);

                }
            });
            $("#cylpressguage_hot4").droppable({
            accept: ".cylpressguage-oilwatch",
            tolerance: "pointer",
            greedy: true,
            drop: function (event, ui) {
               // $scope.cylpressguageServiceOdata.cylpressguage="4";
                cylpressguageService.Odata.cylpressguage="4";

                cylpressguageService.Odata.cylpressguageAnimate(4);


                           }
        });
        },
        freshOilpressguageHontspot :function () {
            $(".hotspot-oilPressure-capp").droppable({
                accept: ".oilPressure-oilwatchSmall",
                tolerance: "pointer",
                greedy: true,
                drop: function (event, ui) {
                    oilpressguageService.Oint.In1Sen_x_SupplyOilLine_x_x='1';
                    cylpressguageService.Odata.OilpressguageAnimate();
                }
            });},
        cylpressguageAnimate :function (num) {
            cylpressguageService.Oint.In1Sen_x_CylPressGauge_x_x="1";
            $(".cylpressguage-oilwatch").attr("ng-show","cylpressguageServiceOdata.cylpressStatus");
            if(num==1){
                $(".cylpressguage-oilwatch").css("top", "-135px");
                $(".cylpressguage-oilwatch").css("left", "-360px");
                $(".dhxq1_out_zz").show();
                $(".dhxq1_out_zz").css("z-index", "1");
                $(".cylpressguage-oilwatch").animate({
                    top: "243px",
                    left: "145px"
                    //width: "304px",
                    // height: "396px"
                }, 400);
                $(".dhxq1_out_zz").css("z-index", "1");cylpressguageService.Odata.cylpressguage="1";
                $timeout(function(){
                    $("#cylpressguage-oilwatch-pointer1").css("transform", "rotate(" + (cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x * 2.613) + "deg)");
                    cylpressguageService.Odata.cylpressguage1=true;
                 },100);
                // $("#cylpressguage-oilwatch-pointer1").css("transform", "rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x*2.85)+"deg)");

                cylpressguageService.Odata.cylpressguagehide0();
            }else if(num==2){
                $(".cylpressguage-oilwatch").css("top", "-135px");
                $(".cylpressguage-oilwatch").css("left", "-360px");
                $(".dhxq2_out_zzz").show();
                $(".dhxq2_out_zzz").css("z-index", "9");
                $(".cylpressguage-oilwatch").animate({
                    left: "452px",
                    top: "243px"
                    // width: "304px",
                    // height: "396px"
                }, 400);
          cylpressguageService.Odata.cylpressguage="2";
                $timeout(function(){
                    $("#cylpressguage-oilwatch-pointer2").css("transform", "rotate(" + (cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x * 2.613) + "deg)");
                    cylpressguageService.Odata.cylpressguage2=true;
                },100);
            /* $interval(function () {
             $("#cylpressguage-oilwatch-pointer2").css("transform", "rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x*2.85)+"deg)");
             }, 10);*/
            cylpressguageService.Odata.cylpressguagehide0();
        }else if(num==3){
            $(".cylpressguage-oilwatch").css("top", "-135px");
            $(".cylpressguage-oilwatch").css("left", "-360px");

            $(".dhxq3_out_zzz").show();
            $(".dhxq3_out_zzz").css("z-index", "9");
            $(".cylpressguage-oilwatch").animate({
                top: "147px",
                left: "93px"
                // width: "304px",
               // height: "396px"
            }, 400);
            cylpressguageService.Odata.cylpressguage="3";
            $timeout(function(){
                $("#cylpressguage-oilwatch-pointer3").css("transform", "rotate(" + (cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x * 2.613) + "deg)");
                cylpressguageService.Odata.cylpressguage3=true;
            },100);
            /*$interval(function () {
             $("#cylpressguage-oilwatch-pointer3").css("transform", "rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x*2.85)+"deg)");
             }, 400);*/
            cylpressguageService.Odata.cylpressguagehide0();
        }else if(num==4){
            $(".cylpressguage-oilwatch").css("top", "-135px");
            $(".cylpressguage-oilwatch").css("left", "-360px");
            $(".dhxq4_out_zzz").show();
            $(".dhxq4_out_zzz").css("z-index", "9");
            $(".cylpressguage-oilwatch").animate({
                left: "443px",
                top: "177px"
                //width: "304px",
               // height: "396px"
            }, 400);
            cylpressguageService.Odata.cylpressguage="4";
            $timeout(function(){
                 $("#cylpressguage-oilwatch-pointer4").css("transform", "rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x*2.613)+"deg)");
                cylpressguageService.Odata.cylpressguage4=true;
            },100);
                /* $interval(function () {
                console.log(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x);
                $("#cylpressguage-oilwatch-pointer4").css("transform", "rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x*2.85)+"deg)");
                }, 400);*/
                cylpressguageService.Odata.cylpressguagehide0();
            }
        },
            cylpressguagehide0 : function () {
            $(".cylpressguage-oilwatch").css("top", "35px");
            $(".cylpressguage-oilwatch").css("left", "346px");
            $(".cylpressguage-oilwatch").css("width", "501px");
            $(".cylpressguage-oilwatch").css("height", "304px");
            //  $("#ryylb").removeClass("selected");
            $("#ryylb").children("img").attr("src","images/ryylbSelect.png");
            cylpressguageService.Odata.cylpressguageStatus = false;
            cylpressguageService.Odata.cylpressguage1=false;
            cylpressguageService.Odata.cylpressguage2=false;
            cylpressguageService.Odata.cylpressguage3=false;
            cylpressguageService.Odata.cylpressguage4=false;
       // $scope. cylpressguageServiceOdata.cylpressguageStatus = false;
        },

    cylpressguagehide1 : function () {
        cylpressguageService.Oint.In1Sen_x_CylPressGauge_x_x='0';
        $("#ryylb").removeClass("selected");
        $("#ryylb").children("img").attr("src","images/yyylb.png");
        if(cylpressguageService.Odata.cylpressguage=='1'){
            $("#cylpressguage-oilwatch-pointer1").css("transform", "rotate(0deg)");
        }else if(cylpressguageService.Odata.cylpressguage=='2'){$("#cylpressguage-oilwatch-pointer2").css("transform", "rotate(0deg)");
        }else if(cylpressguageService.Odata.cylpressguage=='3'){$("#cylpressguage-oilwatch-pointer3").css("transform", "rotate(0deg)");
        }else if(cylpressguageService.Odata.cylpressguage=='4'){$("#cylpressguage-oilwatch-pointer4").css("transform", "rotate(0deg)");
        }
        cylpressguageService.Odata.cylpressguageStatus = false;
        cylpressguageService.Odata.cylpressguage = '0';
        cylpressguageService.Odata.cylpressguage1=false;
        cylpressguageService.Odata.cylpressguage2=false;
        cylpressguageService.Odata.cylpressguage3=false;
        cylpressguageService.Odata.cylpressguage4=false;
       // $scope. cylpressguageServiceOdata.cylpressguage = '0';
        /*  $(".cylpressguage-oilwatch").animate({top: "-335px", left: "-215px"}, 600).animate({
         left: "502px",
         top: "48px",
         width: "304px",
         height: "396px"
         }, 400);*/
    },
        cylpress:function(href){
            if(cylpressguageService.Odata.cylpressPage==href){
                cylpressguageService.Odata.cylpressStatus=true;
            }else{
             cylpressguageService.Odata.cylpressStatus=false;

            }
        }
    };
    cylpressguageService.Oint = {
        In1Eng_x_CylPressGauge_x_x:'0'//缸压安装状态，0为没有安装，1为有

    };
    cylpressguageService.Oout = {
        Out1Sen_Cyl_PressGauge_x_x:'0'//缸压指针数
    };
    return cylpressguageService;
});
