/**
 * @author 谢国亮
 */
oscilloscopeModule.service('oscilloscopeService', function (pageService,xcjDataService,$interval) {
    var oscilloscopeService = oscilloscopeService || {};
    oscilloscopeService.Mdata = oscilloscopeService.Mdata || {};
    oscilloscopeService.Mdata = oscilloscopeService.Mdata || {};
    oscilloscopeService.Mout = oscilloscopeService.Mout || {};
    oscilloscopeService.Mdata = {
        rollInit:'0',
        boxingtu:{
            '1001':1001
        },
        Out1TestPS_x_XAxis_x_x:0,//示波器上的时间数
        time:0,//时间单位
        oscilloscope_width:0,
        oscilloscopeStatus: false,//二极管试灯的显示状态
        SvgStatus: true,//二极管试灯的线状态
        SvgRightStatus:true,//示波仪右边表笔
        SvgLeftStatus:true,//示波仪左边表笔
        oscilloscope_test:false,//示波仪是否正在测量
        oscilloscope_pen:true,
        oscilloscope_body:1, //示波仪表身是否能拖动，1代表能，0代表不能
        oscilloscope_left:1,//示波仪左侧黑色表笔
        oscilloscope_right:1,//示波仪右侧黑色表笔
        oscilloscopePosition:null,//示波仪表笔在那个控件上

        Param_leftx: '357',//红色表线起始x坐标\红色表线曲线起始x坐标
        Param_lefty: '325',//红色表线起始y坐标\红色表线曲线起始y坐标
        Param_leftcx: '420',//红色表线曲线拐x坐标
        Param_leftcy: '90',//红色表线曲线拐y坐标
        Param_leftpx: '459',//红色表线曲线结束x坐标
        Param_leftpy: '154',//红色表线曲线结束x坐标



        Param_rightx: '559',//黑色表线起始x坐标\黑色表线曲线起始x坐标
        Param_righty: '104',//黑色表线起始y坐标\黑色表线曲线起始y坐标
        Param_rightcx: '610',//黑色表线曲线拐x坐标
        Param_rightcy: '80',//黑色表线曲线拐y坐标
        Param_rightpx: '818',//黑色表线曲线结束x坐标
        Param_rightpy: '152',//黑色表线曲线结束x坐标

        oscilloscopestartx: '357',//left表线起始x坐标\红色表线曲线起始x坐标的恢复值
        oscilloscopestarty: '325',//left表线起始y坐标\红色表线曲线起始y坐标的恢复值
        oscilloscoperadianx: '420',//left表线曲线拐x坐标的恢复值
        oscilloscoperadiany: '90',//left表线曲线拐y坐标的恢复值
        oscilloscopestopx: '459',//left表线曲线结束x坐标的恢复值
        oscilloscopestopy: '154',//left表线曲线结束x坐标的恢复值
        ostartRollTwo:"",//定时器
        penRepetition: '0',//存储示波仪表笔放在那个热区上

        oscilloscope_Html: null,//表笔的那个页面
        oscilloscopestartx:'792',//二级管试灯表线起始x坐标\二级管试灯表线曲线起始x坐标的恢复值
        oscilloscopestarty:'199',//二级管试灯表线起始y坐标\二级管试灯表线曲线起始y坐标的恢复值
        oscilloscoperadianx:'810',//二级管试灯表线曲线拐x坐标的恢复值
        svgRecoverStatus: '1',//表针是否需要恢复回原处，1代表用，0为不用
        judgeS:function(href){
            if(oscilloscopeService.Mdata.oscilloscope_Html==href||oscilloscopeService.Mdata.oscilloscope_Html == null){
                oscilloscopeService.Mdata.SvgLeftStatus = true;
                oscilloscopeService.Mdata.oscilloscope_pen = true;
            }else{
                if(oscilloscopeService.Mdata.oscilloscope_test){
                    oscilloscopeService.Mdata.SvgLeftStatus = false;
                    oscilloscopeService.Mdata.oscilloscope_pen = false;
                }

            }
            /*            if(oscilloscopeService.Mdata.oscilloscopeStatus){
             if(href == 'engine'){
             diodelampService.Mdata.SvgStatus = true;
             }else{
             diodelampService.Mdata.SvgStatus = false;
             }
             }*/
        },
        //表笔笔的恢复初位置
        oscilloscopePenRecover : function () {
            var topInt = parseInt($("#mask-oscilloscope").css("top").replace("px", "")),
                leftInt = parseInt($("#mask-oscilloscope").css("left").replace("px", "")),
                toppoint = topInt - 80,
                leftpoint = leftInt - 290;

            $("#path_black").css("stroke", "#656261");
            $("#oscilloscope-pen").css("top", "" + (toppoint + 81) + "px");
            $("#oscilloscope-pen").css("left", "" + (leftpoint + 261) + "px");
            $("#oscilloscopeHot-pen").css("top", "" + (toppoint + 284) + "px");
            $("#oscilloscopeHot-pen").css("left", "" + (leftpoint + 261) + "px");
            oscilloscopeService.Mdata.oscilloscope_Html = null;
        },
//        freshHontspot: function () {
//            $("body").find('a').droppable({
//                accept: "#oscilloscopeHot-pen",
//                tolerance: "pointer",
//                greedy: true,
//                over: function (event, ui) {
//                    $("#path_left").css("stroke", "#f69c19");
//                },
//                out: function (event, ui) {
//                    $("#path_left").css("stroke", "#656261");
//                },
//                drop: function (event, ui) {
//                   // console.log(ui.draggable[0].id == "oscilloscopeHot-pen")
//                    $("#path_left").css("stroke", "#000");
//                    if (ui.draggable[0].id == "oscilloscopeHot-pen") {
//
//                        $("#oscilloscope-pen").css("top", "" + ($(this).attr("h_x") - 236) + "px");
//                        $("#oscilloscope-pen").css("left", "" + (parseInt($(this).attr("h_y"))-3) + "px");
//                        $("#oscilloscopeHot-pen").css("top", "" + ($(this).attr("h_x") - 19) + "px");
//                        $("#oscilloscopeHot-pen").css("left", "" + (parseInt($(this).attr("h_y"))-3) + "px");
//
//                        oscilloscopeService.Mdata.oscilloscopestartx = parseInt($("#oscilloscope-pen").css("left")) + 17;
//                        oscilloscopeService.Mdata.oscilloscopestarty = parseInt($("#oscilloscope-pen").css("top")) + 4;
//                        oscilloscopeService.Mdata.oscilloscoperadianx = parseInt($("#oscilloscope-pen").css("left")) + 20;
//                        oscilloscopeService.Mdata.oscilloscoperadiany = parseInt($("#oscilloscope-pen").css("top")) - 90;
//                        oscilloscopeService.Mdata.oscilloscopestopx = parseInt($("#mask-oscilloscope").css("left")) + 86;
//                        oscilloscopeService.Mdata.oscilloscopestopy = parseInt($("#mask-oscilloscope").css("top")) - 160;
//                        oscilloscopeService.Mdata.startRollTwo=setInterval(oscilloscopeService.Mdata.rollTwo,800);
//                        oscilloscopeService.Mdata.oscilloscope_test=true;
//                        oscilloscopeService.Mdata.oscilloscope_left=0;
//                        oscilloscopeService.Mdata.svgRecoverStatus=0;
//                        oscilloscopeService.Mdata.oscilloscope_Html = $(this).attr("h_href");
//                        oscilloscopeService.Mdata.oscilloscopePosition = $(this).attr("wybblackPosition");
//                        $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.oscilloscopestartx + " " + oscilloscopeService.Mdata.oscilloscopestarty + " C" + oscilloscopeService.Mdata.oscilloscopestartx + " " + oscilloscopeService.Mdata.oscilloscopestarty + " " +oscilloscopeService.Mdata.oscilloscoperadianx + " " + oscilloscopeService.Mdata.oscilloscoperadiany + " " + oscilloscopeService.Mdata.oscilloscopestopx + " " + oscilloscopeService.Mdata.oscilloscopestopy);
//
//                    }
//                    //else{
//                    //    oscilloscopeService.Mdata.svgRecoverStatus=1;
//                    //    console.log(oscilloscopeService.Mdata.oscilloscope_left);
//                    //    oscilloscopeService.Mdata.oscilloscope_Html = null;
//                    //}
///*                    oscilloscopeService.Mdata.oscilloscope_left=0;
//
//                    oscilloscopeService.Mdata.oscilloscope_Html = $(this).attr("h_href");*/
///*                    if (ui.draggable[0].id == "oscilloscopeHot-pen") {
//                        $("#path_left").css("stroke", "#db3040");
//                        $("#oscilloscope-left").css("top", "" + ($(this).attr("h_x") - 234) + "px");
//                        $("#oscilloscope-left").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
//                        $("#oscilloscope-left_hotspot").css("top", "" + ($(this).attr("h_x") - 17) + "px");
//                        $("#oscilloscope-left_hotspot").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
//                        oscilloscopeService.Mdata.oscilloscope_left=0;
//                    }*/
//                }
//
//            });
//        },
        //添加数据
        addData:function(num){
            $('.wave').css('background','url("")');
            $('.vman').html();
            $('.vmin').html();
            $('.chi').html();
            $('.time').html();
        },
        //波形动画
        rollTwo:function(){
            var oscilloscope_width;
            if(parseInt($(".oUl li img").css('width'))>50){
                oscilloscope_width = $(".oUl li img").css('width');
            }else
            {
                oscilloscope_width = "300px";

            }

            //$(".oUl li").css('width',_width);
            //$(".oUl").css('width',2*parseInt(_width)+'px');

            if(oscilloscopeService.Mdata.rollInit==0){
                $(".oUl").animate({marginLeft:'-'+oscilloscope_width},4000,"linear",function(){
                    $(".oUl").css({marginLeft:"-10px"});
                    $(".oUl li")[0].remove();
                    if(oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x>0&&oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x<1001){
                        $(".waveform ul").css('top','-'+oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x*6+'px');
                        $('<li class="wave"><img src="framework/oscilloscope/images/1001.png"/></li>').appendTo($('.oUl'));
                    }else{
                        $('<li class="wave"><img src="framework/oscilloscope/images/'+oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x+'.png"/></li>').appendTo($('.oUl'));

                    }
                });
            }else{
                $interval.cancel(oscilloscopeService.Mdata.startRollTwo);
                $(".oUl li").remove();
                oscilloscopeService.Mdata.rollInit=0;
                if(oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x>0&&oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x<1001){
                    $(".waveform ul").css('top','-'+oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x*6+'px');
                    $('<li class="wave"><img src="framework/oscilloscope/images/1001.png"/></li><li class="wave"><img src="framework/oscilloscope/images/1001.png"/></li>')
                }else{
                    $('<li class="wave"><img src="framework/oscilloscope/images/'+oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x+'.png"/></li><li class="wave"><img src="framework/oscilloscope/images/'+oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x+'.png"/></li>').appendTo($('.oUl'));

                }
                //oscilloscope_width = $(".oUl li img").css('width');
                oscilloscopeService.Mdata.rollTwo();
                oscilloscopeService.Mdata.startRollTwo= $interval(oscilloscopeService.Mdata.rollTwo(),4000);

            }

        },

        oscilloscopeHide:function(){
            xcjDataService.setHandle('ver387');
            oscilloscopeService.Mdata.oscilloscopeStatus=false;//示波仪的显示状态
            oscilloscopeService.Mdata.SvgStatus=true;//示波仪的线状态
            oscilloscopeService.Mdata.SvgRightStatus=true;//示波仪右边表笔
            oscilloscopeService.Mdata.SvgLeftStatus=true;//示波仪左边表笔
            oscilloscopeService.Mdata.oscilloscope_test=false;//示波仪是否正在测量
            oscilloscopeService.Mdata.oscilloscope_pen=true;
            oscilloscopeService.Mdata.oscilloscope_body=1; //示波仪表身是否能拖动，1代表能，0代表不能
            oscilloscopeService.Mdata.oscilloscope_left=1;//示波仪左侧黑色表笔
            oscilloscopeService.Mdata.oscilloscope_right=1;//示波仪右侧黑色表笔


            oscilloscopeService.Mdata.Param_leftx='358';//红色表线起始x坐标\红色表线曲线起始x坐标
            oscilloscopeService.Mdata.Param_lefty='325';//红色表线起始y坐标\红色表线曲线起始y坐标
            oscilloscopeService.Mdata.Param_leftcx='420';//红色表线曲线拐x坐标
            oscilloscopeService.Mdata.Param_leftcy='90';//红色表线曲线拐y坐标
            oscilloscopeService.Mdata.Param_leftpx='458';//红色表线曲线结束x坐标
            oscilloscopeService.Mdata.Param_leftpy='152';//红色表线曲线结束x坐标



            oscilloscopeService.Mdata.Param_rightx='559';//黑色表线起始x坐标\黑色表线曲线起始x坐标
            oscilloscopeService.Mdata.Param_righty='104';//黑色表线起始y坐标\黑色表线曲线起始y坐标
            oscilloscopeService.Mdata.Param_rightcx='610';//黑色表线曲线拐x坐标
            oscilloscopeService.Mdata.Param_rightcy='80';//黑色表线曲线拐y坐标
            oscilloscopeService.Mdata.Param_rightpx='818';//黑色表线曲线结束x坐标
            oscilloscopeService.Mdata.Param_rightpy='152';//黑色表线曲线结束x坐标

            oscilloscopeService.Mdata.oscilloscopestartx='360';//left表线起始x坐标\红色表线曲线起始x坐标的恢复值
            oscilloscopeService.Mdata.oscilloscopestarty='325';//left表线起始y坐标\红色表线曲线起始y坐标的恢复值
            oscilloscopeService.Mdata.oscilloscoperadianx='420';//left表线曲线拐x坐标的恢复值
            oscilloscopeService.Mdata.oscilloscoperadiany='90';//left表线曲线拐y坐标的恢复值
            oscilloscopeService.Mdata.oscilloscopestopx='458';//left表线曲线结束x坐标的恢复值
            oscilloscopeService.Mdata.oscilloscopestopy='152';//left表线曲线结束x坐标的恢复值
            oscilloscopeService.Mdata.startRollTwo="";//波形定时器
            oscilloscopeService.Mdata.penRepetition='0';//存储示波仪表笔放在那个热区上

            oscilloscopeService.Mdata.oscilloscope_Html= null;//表笔的那个页面
            oscilloscopeService.Mdata.oscilloscopestartx='792';//示波仪表线起始x坐标\示波仪表线曲线起始x坐标的恢复值
            oscilloscopeService.Mdata.oscilloscopestarty='199';//示波仪表线起始y坐标\示波仪表线曲线起始y坐标的恢复值
            oscilloscopeService.Mdata.oscilloscoperadianx='810';//示波仪表线曲线拐x坐标的恢复值
            oscilloscopeService.Mdata.svgRecoverStatus='1';


            $("#mask-oscilloscope").css({'top':'319px','left':'372px'});
            $("#oscilloscope-left").css({'top':'146px','left':'440px'});
            $("#oscilloscope-right").css({'top':'146px','left':'541px'});
            $("#oscilloscope-pen").css({'top':'320px','left':'340px'});
            $("#oscilloscopeHot-pen").css({'top':'520px','left':'340px'});
            $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
            $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " C" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " " + oscilloscopeService.Mdata.Param_leftcx + " " + oscilloscopeService.Mdata.Param_leftcy + " " + oscilloscopeService.Mdata.Param_leftpx + " " + oscilloscopeService.Mdata.Param_leftpy);
            $("#oscilloscope").attr("src","images/oscilloscope.png");
            $("#path_left").css("stroke", "#656261");
        }

    };
    oscilloscopeService.Mout = {
        Out1TestPS_x_Scope_x_x:'0',//示波器输出
        Out1TestPS_x_Max_x_x:'0',//示波器最大值
        Out1TestPS_x_Min_x_x:'0',//示波器最小值
        Out1TestPS_x_XAxis_x_x:'0',//示波器X轴
        Out1TestPS_x_YAxis_x_x:'0'//示波器Y轴
    };
    oscilloscopeService.Mdata.smokehide0=function(){
        oscilloscopeService.Mdata.smokeStatus = false;
    };

    return oscilloscopeService;

});
