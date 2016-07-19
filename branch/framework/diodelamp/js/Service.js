/**
 * @author 谢国亮
 */
diodelampModule.service('diodelampService', function (pageService,$timeout,$interval,xcjDataService) {

    var diodelampService = diodelampService || {};
    diodelampService.Odata = diodelampService.Odata || {};
    diodelampService.Oint = diodelampService.Oint || {};
    diodelampService.Oout = diodelampService.Oout || {};
    diodelampService.Oout = {
        Out1TestPS_x_Brightness_x_x:'0',//试电笔亮度状态,0不亮1较亮2很亮
        Out1TestPS_x_Flashing_x_x:'0'//试点笔闪烁0不闪1闪烁
    };
    diodelampService.Odata = {
        diodelampStatus: false,//二极管试灯的显示状态
        diodelamp_pen:true,//二极管试灯表笔显示状态
        SvgStatus: true,//二极管试灯线的线状态
        diodelamp_Html: null,//二极管试灯表笔的那个页面
        diodelampstartx:'792',//二级管试灯表线起始x坐标\二级管试灯表线曲线起始x坐标的恢复值
        diodelampstarty:'149',//二级管试灯表线起始y坐标\二级管试灯表线曲线起始y坐标的恢复值
        diodelampradianx:'810',//二级管试灯表线曲线拐x坐标的恢复值
        diodelampradiany:'140',//二级管试灯表线曲线拐y坐标的恢复值
        diodelampstopx:'818',//二级管试灯表线曲线结束x坐标的恢复值
        diodelampstopy:'152',//二级管试灯表线曲线结束y坐标的恢复值
        svgRecoverStatus: '1',//二级管试灯表针是否需要恢复回原处，1代表用，0为不用
        diodelampRepetition: '0',//存储二级管试灯表笔放在那个热区上
        diodelampPosition: null,//存储二级管试灯表笔放在那个控件上
        diodelamp_drag: '1',//二级管试灯表笔是否能拖动，1代表能，0代表不能
        judgeS:function(href){
            if(diodelampService.Odata.diodelampStatus){
                if(diodelampService.Odata.diodelamp_Html==href||diodelampService.Odata.diodelamp_Html==null){
                    diodelampService.Odata.diodelamp_pen = true;
                }else{
                    diodelampService.Odata.diodelamp_pen = false;
                }
            }
        },
        diodelampHide:function(){
            xcjDataService.setHandle('ver383');
            diodelampService.Odata.diodelampStatus = false;
            diodelampService.Odata.svgRecoverStatus = 1;
            $('#diodelamp').attr('src','images/diodelamp.png');
            $(".diodelamp-pen").css({top:'188px',left:'750px'});
            $("#path_iodelamp").attr("d", "M792 149  C792 149 810 140 818 152 ");
            $(".diodelamp_needle_hot").css({top:'423px',left:'753px'});
            //$interval.cancel(diodelampHontspotSet);
            $interval.cancel($interval(function(){
                diodelampService.Odata.showHide()
            },400));
        }

    };
    //灯芯闪烁
    diodelampService.Odata.showHide = function(){
        if(diodelampService.Oout.Out1TestPS_x_Brightness_x_x =='1'){
            $('#diodelamp-lamp01').show();
            if(diodelampService.Oout.Out1TestPS_x_Flashing_x_x =='1' ){
                $timeout(function(){
                    $('#diodelamp-lamp01').hide();
                },200);
            }
        }
        if(diodelampService.Oout.Out1TestPS_x_Brightness_x_x =='2'){
            $('#diodelamp-lamp02').show();
            if(diodelampService.Oout.Out1TestPS_x_Flashing_x_x =='1'){
                $timeout(function(){
                    $('#diodelamp-lamp02').hide();
                },200);
            }

        }
    };

    return diodelampService;

});
