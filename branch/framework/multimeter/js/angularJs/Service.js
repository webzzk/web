/**
 * @createDate   2015-08-4 下午05:28:38
 * @author       hao liqiang
 * @email        lq.hao@xiaochejiang.com
 * @version      1.0
 */

multimeterModule.service('multimeterService', function ($timeout,$interval,pageService,dashboardService,diodelampService,oscilloscopeService,xcjDataService) {
    var multimeterService ={};
    multimeterService.Mdata = multimeterService.Mdata || {};//万用表中自己的参数
    multimeterService.Mint = multimeterService.Mint || {};//万用表中向仿真模型传输的参数
    multimeterService.Mout = multimeterService.Mout || {};//万用表中从仿真模型获取的参数
    multimeterService.Mdata ={
        engine: 'engine bzcgq dgv100 dh100 dh200 enf03 fdj003 jm100 jqqg jqzs jt100 kq100 pn100 pqtj pt100 pz100 pz200 qz000 st100 sw100 yc100 yy100',
        down: 'down',
        cab: 'dhkg ecu jdq ymtb',
        backseat: 'hgjt',
        multimeterOhm:false,//万用表打到欧姆档 true
        judgeS:function(href){
            if(multimeterService.Mdata.multimeterStatus){
                if(multimeterService.Mdata.w_multimeter_blackHtml==href||multimeterService.Mdata.w_multimeter_blackHtml==null){
                    multimeterService.Mdata.SvgBlackStatus = true;
                }else{
                    multimeterService.Mdata.SvgBlackStatus = false;
                }
                if(multimeterService.Mdata.w_multimeter_redHtml==href||multimeterService.Mdata.w_multimeter_redHtml==null){

                    multimeterService.Mdata.SvgRedStatus = true;
                }else{
                    multimeterService.Mdata.SvgRedStatus = false;
                }
            }

        },
        freshHontspot :function () {

            $("body").find('a').droppable({
                accept: "#hhjmultimeterBlack_hotspot,#hhjmultimeterRed_hotspot,#diodelamp_needle_hot,#oscilloscopeHot-pen",
                tolerance: "pointer",
                greedy: true,
                over: function (event, ui) {
                    var Left = event.target.offsetLeft ;
                    var top = event.target.offsetTop+60;
                    this.myTitle = this.title;
                    var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //创建 div 元素
                    if(this.myTitle!=""){
                        $("#contain").append(tooltip);//把它追加到文档中
                        $("#tooltip").css({"top": top+"px", "left": Left + "px"}).show();	//设置x坐标和y坐标，并且显示
                    }
                    if (ui.draggable[0].id == "hhjmultimeterBlack_hotspot") {
                        $("#path_black").css("stroke", "#f69c19");

                    }
                    if (ui.draggable[0].id == "hhjmultimeterRed_hotspot") {
                        $("#path_Red").css("stroke", "#f69c19");
                    }
                    if (ui.draggable[0].id == "diodelamp_needle_hot") {
                        $('.diodelamp-tishi').show();
                        $("#path_iodelamp").css("stroke", "#f69c19");
                    }
                    if(ui.draggable[0].id == "oscilloscopeHot-pen"){
                        $("#path_left").css("stroke", "#f69c19");
                    }
                },
                out: function (event, ui) {
                    $("#tooltip").remove();
                    if (ui.draggable[0].id == "hhjmultimeterRed_hotspot") {
                        $("#path_Red").css("stroke", "#db3040");
                        $("#tooltip").remove();
                        return false;
                    }
                    if (ui.draggable[0].id == "hhjmultimeterBlack_hotspot") {
                        $("#path_black").css("stroke", "#656261");
                        $("#tooltip").remove();
                        return false;
                    }
                    if (ui.draggable[0].id == "diodelamp_needle_hot") {
                        $("#path_iodelamp").css("stroke", "#656261");
                        $("#tooltip").remove();
                        $('.diodelamp-tishi').hide();
                        //return false;
                    }
                    if(ui.draggable[0].id == "oscilloscopeHot-pen"){
                        $("#path_left").css("stroke", "#656261");
                    }

                },
                drop: function (event, ui) {
                    var tiShiTop = (parseInt($(this).css('top').replace('px',''))+30)+'px',
                        tiShiLeft = (parseInt($(this).css("left").replace("px", "")) + 30)+'px';
                    //redLeftInt =
                    //console.log("----------------------------------------------------------------------------");
                    $("#tooltip").remove();
                    $('.diodelamp-tishi').hide();
                    if (ui.draggable[0].id == "hhjmultimeterRed_hotspot" && multimeterService.Mdata.Blackrepetition != $(this).attr("rqPosition")) {
                        $("#path_Red").css("stroke", "#db3040");
                        $("#hhjmultimeterRed").css("top", "" + ($(this).attr("h_x") - 284) + "px");
                        $("#hhjmultimeterRed").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
                        $("#hhjmultimeterRed_hotspot").css("top", "" + ($(this).attr("h_x") - 67) + "px");
                        $("#hhjmultimeterRed_hotspot").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
                        multimeterService.Mdata.multimeter_red = 0;
                        multimeterService.Mint.In1MultiLogic_x_Red_x_x = $(this).attr("rqPosition");

                        multimeterService.Mdata.Radrepetition = $(this).attr("rqPosition");//记忆已经有一只放在热区上
                        multimeterService.Mdata.multimeterredstartx = parseInt($("#hhjmultimeterRed").css("left")) + 10;
                        multimeterService.Mdata.multimeterredstarty = parseInt($("#hhjmultimeterRed").css("top")) - 5;
                        multimeterService.Mdata.multimeterredradianx = parseInt($("#hhjmultimeterRed").css("left")) - 90;
                        multimeterService.Mdata.multimeterredradiany = parseInt($("#hhjmultimeterRed").css("top")) - 90;
                        multimeterService.Mdata.multimeterredstopx = parseInt($("#mask-multimeter").css("left")) + 114;
                        multimeterService.Mdata.multimeterredstopy = parseInt($("#mask-multimeter").css("top")) + 298;
                        multimeterService.Mdata.svgRecoverStatus = 0;
                        multimeterService.Mdata.w_multimeter_redHtml = $(this).attr("h_href");
                        multimeterService.Mdata.multimeterredPosition = $(this).attr("wybredPosition");
                        if ( ( multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x=='1'||multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1') && multimeterService.Mint.In1MultiLogic_x_Black_x_x != '0') {
                            if(multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x=='1'&&dashboardService.Dint.In1IgnKey_x_ON_x_x=='1'){
                                xcjDataService.setCondition("v01","V");
                            }
                            if(multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1'){
                                xcjDataService.setCondition("v01","Ω");
                            }
                            xcjDataService.setCondition('v03',multimeterService.Mint.In1MultiLogic_x_Black_x_x,pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]);
                            xcjDataService.setCondition('v02',multimeterService.Mint.In1MultiLogic_x_Red_x_x,pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]);
                        }

                        console.log("%c 红表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Red_x_x, "color: #cc0000");
                        $("#path_Red").attr("d", "M" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " C" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " " + multimeterService.Mdata.multimeterredradianx + " " + multimeterService.Mdata.multimeterredradiany + " " + multimeterService.Mdata.multimeterredstopx + " " + multimeterService.Mdata.multimeterredstopy);

                    }else if (ui.draggable[0].id == "hhjmultimeterBlack_hotspot" && multimeterService.Mdata.Radrepetition != $(this).attr("rqPosition")) {
                        $("#path_black").css("stroke", "#656261");
                        $("#hhjmultimeterBlack").css("top", "" + ($(this).attr("h_x") - 284) + "px");
                        $("#hhjmultimeterBlack").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
                        $("#hhjmultimeterBlack_hotspot").css("top", "" + ($(this).attr("h_x") - 67) + "px");
                        $("#hhjmultimeterBlack_hotspot").css("left", "" + (parseInt($(this).attr("h_y")) + 5) + "px");
                        multimeterService.Mdata.multimeter_black = 0;
                        multimeterService.Mdata.Blackrepetition = $(this).attr("rqPosition");//记忆已经有一只放在热区上
                        multimeterService.Mdata.multimeterblackstartx = parseInt($("#hhjmultimeterBlack").css("left")) + 5;
                        multimeterService.Mdata.multimeterblackstarty = parseInt($("#hhjmultimeterBlack").css("top")) + 5;
                        multimeterService.Mdata.multimeterblackradianx = parseInt($("#hhjmultimeterBlack").css("left")) + 90;
                        multimeterService.Mdata.multimeterblackradiany = parseInt($("#hhjmultimeterBlack").css("top")) - 90;
                        multimeterService.Mdata.multimeterblackstopx = parseInt($("#mask-multimeter").css("left")) + 90;
                        multimeterService.Mdata.multimeterblackstopy = parseInt($("#mask-multimeter").css("top")) + 300;
                        multimeterService.Mdata.svgRecoverStatus = 0;
                        multimeterService.Mint.In1MultiLogic_x_Black_x_x = $(this).attr("rqPosition");
                        multimeterService.Mdata.w_multimeter_blackHtml = $(this).attr("h_href");
                        multimeterService.Mdata.multimeterblackPosition = $(this).attr("wybblackPosition");
                        if ( ( multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x=='1'||multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1') && multimeterService.Mint.In1MultiLogic_x_Red_x_x != '0') {
                            if(multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x=='1'&&dashboardService.Dint.In1IgnKey_x_ON_x_x=='1'){
                                xcjDataService.setCondition("v01","V");
                            }
                            if(multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=='1'){
                                xcjDataService.setCondition("v01","Ω");
                            }
                            xcjDataService.setCondition('v03',multimeterService.Mint.In1MultiLogic_x_Black_x_x,pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]);
                            xcjDataService.setCondition('v02',multimeterService.Mint.In1MultiLogic_x_Red_x_x,pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]);
                        }



                        console.info(" 黑表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Black_x_x);
                        $("#path_black").attr("d", "M" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " C" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " " + multimeterService.Mdata.multimeterblackradianx + " " + multimeterService.Mdata.multimeterblackradiany + " " + multimeterService.Mdata.multimeterblackstopx + " " + multimeterService.Mdata.multimeterblackstopy);

                    }else if (ui.draggable[0].id == "diodelamp_needle_hot") {
                        $("#diodelamp-line").css("top", "" + ($(this).attr("h_x") - 250) + "px");
                        $("#diodelamp-line").css("left", "" + (parseInt($(this).attr("h_y")) -0) + "px");
                        $("#diodelamp_needle_hot").css("top", "" + ($(this).attr("h_x") - 17) + "px");
                        $("#diodelamp_needle_hot").css("left", "" + (parseInt($(this).attr("h_y")) + 10) + "px");
                        diodelampService.Odata.diodelamp_drag = 0;
                        diodelampService.Odata.diodelampRepetition = $(this).attr("rqPosition");//记忆已经有一只放在热区上
                        diodelampService.Odata.diodelampstartx = parseInt($("#diodelamp-line").css("left")) + 5;
                        diodelampService.Odata.diodelampstarty = parseInt($("#diodelamp-line").css("top")) + 5;
                        diodelampService.Odata.diodelampradianx = parseInt($("#diodelamp-line").css("left")) + 90;
                        diodelampService.Odata.diodelampradiany = parseInt($("#diodelamp-line").css("top")) - 90;
                        diodelampService.Odata.diodelampstopx = 818;
                        diodelampService.Odata.diodelampstopy = 152;
                        diodelampService.Odata.svgRecoverStatus = 0;
                        //multimeterService.Mint.In1MultiLogic_x_Black_x_x = $(this).attr("rqPosition");
                        diodelampService.Odata.diodelamp_Html = $(this).attr("h_href");
                        diodelampService.Odata.diodelampPosition = $(this).attr("wybblackPosition");
                        diodelampService.Odata.SvgStatus = false;
                        multimeterService.Mint.In1MultiLogic_x_Red_x_x = $(this).attr("rqPosition");
                        if (multimeterService.Mint.In1MultiLogic_x_Red_x_x != 0) {
                            xcjDataService.setCondition('v09',multimeterService.Mint.In1MultiLogic_x_Red_x_x);
                        }
                        //$("#path_iodelamp").attr('d','M820 152 C820 152 820 152 820 152');
                        console.info(" 二极管试灯表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Red_x_x);
                        //$("#path_iodelamp").attr("d", "M" + diodelampService.Odata.diodelampstartx + " " + diodelampService.Odata.diodelampstarty + " C" + diodelampService.Odata.diodelampstartx + " " + diodelampService.Odata.diodelampstarty + " " + diodelampService.Odata.diodelampradianx + " " + diodelampService.Odata.diodelampradiany + " " +  diodelampService.Odata.diodelampstopx + " " + diodelampService.Odata.diodelampstopy);
                        // multimeterService.Mdata.multimeterAction();

                    }else if(ui.draggable[0].id == "oscilloscopeHot-pen"){
                        $("#oscilloscope-pen").css("top", "" + ($(this).attr("h_x") - 236) + "px");
                        $("#oscilloscope-pen").css("left", "" + (parseInt($(this).attr("h_y"))-3) + "px");
                        $("#oscilloscopeHot-pen").css("top", "" + ($(this).attr("h_x") - 19) + "px");
                        $("#oscilloscopeHot-pen").css("left", "" + (parseInt($(this).attr("h_y"))-3) + "px");

                        oscilloscopeService.Mdata.oscilloscopestartx = parseInt($("#oscilloscope-pen").css("left")) + 17;
                        oscilloscopeService.Mdata.oscilloscopestarty = parseInt($("#oscilloscope-pen").css("top")) + 4;
                        oscilloscopeService.Mdata.oscilloscoperadianx = parseInt($("#oscilloscope-pen").css("left")) + 20;
                        oscilloscopeService.Mdata.oscilloscoperadiany = parseInt($("#oscilloscope-pen").css("top")) - 90;
                        oscilloscopeService.Mdata.oscilloscopestopx = parseInt($("#mask-oscilloscope").css("left")) + 86;
                        oscilloscopeService.Mdata.oscilloscopestopy = parseInt($("#mask-oscilloscope").css("top")) - 160;

                        $interval.cancel(oscilloscopeService.Mdata.startRollTwo);

                        oscilloscopeService.Mdata.rollTwo();
                        oscilloscopeService.Mdata.startRollTwo = setInterval(function() {
                            oscilloscopeService.Mdata.rollTwo();
                        },4000);

                        //oscilloscopeService.Mdata.rollInit=1;
                        oscilloscopeService.Mdata.oscilloscope_test=true;
                        oscilloscopeService.Mdata.oscilloscope_left=0;
                        oscilloscopeService.Mdata.svgRecoverStatus=0;
                        oscilloscopeService.Mdata.oscilloscope_Html = $(this).attr("h_href");
                        oscilloscopeService.Mdata.oscilloscopePosition = $(this).attr("wybblackPosition");
                        multimeterService.Mint.In1MultiLogic_x_Red_x_x = $(this).attr("rqPosition");
                        console.info(" 示波器表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Red_x_x);
                        $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.oscilloscopestartx + " " + oscilloscopeService.Mdata.oscilloscopestarty + " C" + oscilloscopeService.Mdata.oscilloscopestartx + " " + oscilloscopeService.Mdata.oscilloscopestarty + " " +oscilloscopeService.Mdata.oscilloscoperadianx + " " + oscilloscopeService.Mdata.oscilloscoperadiany + " " + oscilloscopeService.Mdata.oscilloscopestopx + " " + oscilloscopeService.Mdata.oscilloscopestopy);
                        $("#path_left").css("stroke", "#656261");
                    }else{
                        $timeout(function(){
                            $('.prompt').show()
                                .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                                .css({position:'absolute','left':tiShiLeft,'top':tiShiTop})
                                .html('此处已放表笔');
                            $timeout(function(){
                                $('.prompt').hide();
                            },1000)
                        },100);

                    }
                }
            });

        },//刷新热区
        multimeterblackRecover : function () {
            multimeterService.Mdata.w_multimeter_blackHtml = null;
            var topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),
                toppoint = topInt - 80,
                leftpoint = leftInt - 290;
            $("#path_black").css("stroke", "#656261");
            $("#hhjmultimeterBlack").css("top", "" + (toppoint + 97) + "px");
            $("#hhjmultimeterBlack").css("left", "" + (leftpoint + 272) + "px");
            $("#hhjmultimeterBlack_hotspot").css("top", "" + (toppoint + 315) + "px");
            $("#hhjmultimeterBlack_hotspot").css("left", "" + (leftpoint + 272) + "px");

            multimeterService.Mdata.Param_blackx = leftpoint + 282;
            multimeterService.Mdata.Param_blacky = toppoint + 100;
            multimeterService.Mdata.Param_blackcx = leftpoint + 302;
            multimeterService.Mdata.Param_blackcy = toppoint + 37;
            multimeterService.Mdata.Param_blackpx = leftpoint + 376;
            multimeterService.Mdata.Param_blackpy = toppoint + 375;
            multimeterService.Mdata.multimeter_black = 1;
            multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx;
            multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky;
            multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx;
            multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy;
            multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx;
            multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy;
            multimeterService.Mdata.Param_blackstas = 0;
            multimeterService.Mdata.Param_stasds = 0;
            multimeterService.Mdata.hlq_multimeterBlackLine = true;
            multimeterService.Mint.In1MultiLogic_x_Black_x_x = "0";

            multimeterService.Mdata.Blackrepetition = 0;
            // console.info("恢复的黑表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Black_x_x);
            $("#path_black").attr("d", "M" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " C" + multimeterService.Mdata.Param_blackx + " " + multimeterService.Mdata.Param_blacky + " " + multimeterService.Mdata.Param_blackcx + " " + multimeterService.Mdata.Param_blackcy + " " + multimeterService.Mdata.Param_blackpx + " " + multimeterService.Mdata.Param_blackpy);

        },//黑表笔的恢复初位置
        multimeterredRecover : function () {
            multimeterService.Mdata.w_multimeter_redHtml = null;
            var topInt = parseInt($("#mask-multimeter").css("top").replace("px", "")),
                leftInt = parseInt($("#mask-multimeter").css("left").replace("px", "")),
                toppoint = topInt - 80,
                leftpoint = leftInt - 290;
            $("#hhjmultimeterRed").css("top", "" + (toppoint + 97) + "px");
            $("#hhjmultimeterRed").css("left", "" + (leftpoint + 428) + "px");

            $("#hhjmultimeterRed_hotspot").css("top", "" + (toppoint + 311) + "px");
            $("#hhjmultimeterRed_hotspot").css("left", "" + (leftpoint + 431) + "px");

            multimeterService.Mdata.Param_redx = leftpoint + 440;
            multimeterService.Mdata.Param_redy = toppoint + 100;
            multimeterService.Mdata.Param_redcx = leftpoint + 420;
            multimeterService.Mdata.Param_redcy = toppoint + 37;
            multimeterService.Mdata.Param_redpx = leftpoint + 403;
            multimeterService.Mdata.Param_redpy = toppoint + 375;

            multimeterService.Mdata.multimeter_red = 1;
            $("#path_Red").css("stroke", "#db3040");
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = "0";

            multimeterService.Mdata.Radrepetition = 0;
            multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx;
            multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy;
            multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx;
            multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy;
            multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx;
            multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy;
            multimeterService.Mdata.hlq_multimeterBlackLine = true;
            /* console.log(Param_stasds);*/
            multimeterService.Mdata.Param_redstas = 0;
            multimeterService.Mdata.Param_stasds = 0;
            //console.log("%c 恢复的红表笔的触发值----------" + multimeterService.Mint.In1MultiLogic_x_Red_x_x, "color: #cc0000");
            $("#path_Red").attr("d", "M" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " C" + multimeterService.Mdata.Param_redx + " " + multimeterService.Mdata.Param_redy + " " + multimeterService.Mdata.Param_redcx + " " + multimeterService.Mdata.Param_redcy + " " + multimeterService.Mdata.Param_redpx + " " + multimeterService.Mdata.Param_redpy);
        },//红表笔的恢复初位置
        rtnMultimeterPosition : function (num,href) {
            if (multimeterService.Mdata.multimeterredPosition == num&&multimeterService.Mdata.w_multimeter_redHtml == href) {
                multimeterService.Mdata.multimeterredRecover();
                multimeterService.Mdata.SvgRedStatus = true
            }
            if (multimeterService.Mdata.multimeterblackPosition == num&&multimeterService.Mdata.w_multimeter_blackHtml == href) {
                multimeterService.Mdata.multimeterblackRecover();
                multimeterService.Mdata.SvgBlackStatus = true
            }
            if (diodelampService.Odata.diodelampPosition == num&&diodelampService.Odata.diodelamp_Html == href) {
                $("#path_iodelamp").attr("d", "M792 149  C792 149 810 140 818 152 ");
                $(".diodelamp-pen").css({top:'188px',left:'750px'});
                $(".diodelamp_needle_hot").css({top:'423px',left:'753px'});
                diodelampService.Odata.diodelamp_Html = null;
                diodelampService.Odata.SvgStatus = true;
                diodelampService.Odata.diodelampRepetition = 0;
                multimeterService.Mint.In1MultiLogic_x_Red_x_x = "0";
            }
            if(oscilloscopeService.Mdata.oscilloscopePosition == num && oscilloscopeService.Mdata.oscilloscope_Html == href){
                oscilloscopeService.Mdata.oscilloscopePenRecover();
                $("#path_left").css("stroke", "#656261");
                $("#path_left").attr("d", "M" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " C" + oscilloscopeService.Mdata.Param_leftx + " " + oscilloscopeService.Mdata.Param_lefty + " " + oscilloscopeService.Mdata.Param_leftcx + " " + oscilloscopeService.Mdata.Param_leftcy + " " + oscilloscopeService.Mdata.Param_leftpx + " " + oscilloscopeService.Mdata.Param_leftpy);
                //window.clearInterval(oscilloscopeService.Mdata.startRollTwo);
                $interval.cancel(oscilloscopeService.Mdata.startRollTwo);
                oscilloscopeService.Mdata.oscilloscope_test=false;
                oscilloscopeService.Mdata.oscilloscopePosition = 0;
                oscilloscopeService.Mdata.penRepetition = 0;
                oscilloscopeService.Mdata.svgRecoverStatus=1;
                oscilloscopeService.Mdata.oscilloscope_left=1;
                multimeterService.Mint.In1MultiLogic_x_Red_x_x = "0";

            }
        },//判断红黑表笔是否在控件上，是否要回到热区上

        closemultimeter:function () {
            xcjDataService.setHandle('ver377');
            //pageService.Pdata.addAction('t02s02');
            $interval.cancel(freshHontspotSet);
            //具体注释见js/angularJs/Service.js
            $(".multimeter-bottom").css("transform", "rotate(0deg)");

            //设置工具栏目状态万用表
            $("#multimeter").attr("src","images/multimeter.png");
            multimeterService.Mint.In1MultiLogic_x_Off_x_x = "1";
            multimeterService.Mint.In1MultiLogic_x_ACVlt_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_DCVlt_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_hFE_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_Amp_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_mAmp_x_x = "0";
            multimeterService.Mint.In1MultiLogic_x_mirAmp_x_x = "0";
            multimeterService.Mdata.multimeterScreenStatus = false;
            multimeterService.Mdata.multimeterScreenUnit = "";
            multimeterService.Mdata.multimeterStatus = false;
            multimeterService.Mdata.multimeter_drag = '0';

            multimeterService.Mdata.w_multimeter_redHtml = null;
            multimeterService.Mdata.w_multimeter_blackHtml = null;
            multimeterService.Mdata.SvgStatus = false;
            multimeterService.Mdata.multimeter_red = '0';
            multimeterService.Mdata.multimeter_black = '0';
            multimeterService.Mdata.multimeterScreenStatus= false;//万用表的显示屏显示和隐藏
            multimeterService.Mdata. multimeterScreenUnit= '';//万用表的显示屏中的单位是什么
            multimeterService.Mint. In1MultiLogic_x_Red_x_x= '0';
            multimeterService.Mint. In1MultiLogic_x_Black_x_x= '0';
            multimeterService.Mdata.wanyongbiao = '0';
            multimeterService.Mdata.svgRecoverStatus = '1';
            multimeterService.Mdata.multimeterblackPosition = null;
            multimeterService.Mdata.multimeterredPosition = null;
            multimeterService.Mdata.Radrepetition = '0';
            multimeterService.Mdata.Blackrepetition = '0';
            multimeterService.Mdata.multimeter_red = '1';
            multimeterService.Mdata.multimeter_black = '1';

            multimeterService.Mdata.multimeterredstartx = multimeterService.Mdata.Param_redx = '440';//红色表线起始x坐标
            multimeterService.Mdata.multimeterredstarty = multimeterService.Mdata.Param_redy = '100';//红色表线起始y坐标
            multimeterService.Mdata.multimeterredradianx = multimeterService.Mdata.Param_redcx = '420';//红色表线曲线拐x坐标
            multimeterService.Mdata.multimeterredradiany = multimeterService.Mdata.Param_redcy = '37';//红色表线曲线拐y坐标
            multimeterService.Mdata.multimeterredstopx = multimeterService.Mdata.Param_redpx = '403';//红色表线曲线结束x坐标
            multimeterService.Mdata.multimeterredstopy = multimeterService.Mdata.Param_redpy = '375';//红色表线曲线结束x坐标

            multimeterService.Mdata.multimeterblackstartx = multimeterService.Mdata.Param_blackx = '282';
            multimeterService.Mdata.multimeterblackstarty = multimeterService.Mdata.Param_blacky = '100';
            multimeterService.Mdata.multimeterblackradianx = multimeterService.Mdata.Param_blackcx = '302';
            multimeterService.Mdata.multimeterblackradiany = multimeterService.Mdata.Param_blackcy = '37';
            multimeterService.Mdata.multimeterblackstopx = multimeterService.Mdata.Param_blackpx = '376';
            multimeterService.Mdata.multimeterblackstopy = multimeterService.Mdata.Param_blackpy = '375';
            $("#mask-multimeter").css("top", "80px");
            $("#mask-multimeter").css("left", "290px");
            $("#hhjmultimeterRed").css("top", "97px");
            $("#hhjmultimeterRed").css("left", "428px");
            $("#hhjmultimeterBlack").css("top", "97px");
            $("#hhjmultimeterBlack").css("left", "272px");
            $("#hhjmultimeterRed_hotspot").css("top", "311px");
            $("#hhjmultimeterRed_hotspot").css("left", "431px");
            $("#hhjmultimeterBlack_hotspot").css("top", "315px");
            $("#hhjmultimeterBlack_hotspot").css("left", "272px");
            $("#path_Red").attr("d", "M" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " C" + multimeterService.Mdata.multimeterredstartx + " " + multimeterService.Mdata.multimeterredstarty + " " + multimeterService.Mdata.multimeterredradianx + " " + multimeterService.Mdata.multimeterredradiany + " " + multimeterService.Mdata.multimeterredstopx + " " + multimeterService.Mdata.multimeterredstopy);
            $("#path_black").attr("d", "M" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " C" + multimeterService.Mdata.multimeterblackstartx + " " + multimeterService.Mdata.multimeterblackstarty + " " + multimeterService.Mdata.multimeterblackradianx + " " + multimeterService.Mdata.multimeterblackradiany + " " + multimeterService.Mdata.multimeterblackstopx + " " + multimeterService.Mdata.multimeterblackstopy);

        },
        multimeterStatus: false,//万用表的表身显示和隐藏
        multimeterScreenStatus: false,//万用表的显示屏显示和隐藏
        multimeterScreenUnit: '',//万用表的显示屏中的单位是什么
        SvgStatus: false,//万用表红表线和红表笔显示和隐藏
        SvgRedStatus: true,//万用表红表线和红表笔显示和隐藏
        SvgBlackStatus: true,//万用表黑表线和黑表笔显示和隐藏
        multimeter_drag:0,//万用表是否拖动了
        multimeter_body: '1',//万用表表身是否能拖动，1代表能，0代表不能
        multimeter_red: '1',//万用表红表笔是否能拖动，1代表能，0代表不能
        multimeter_black: '1',//万用表黑表笔是否能拖动，1代表能，0代表不能
        svgRecoverStatus: '1',//万用表的表针时候需要恢复回原处，1代表用，0为不用
        multimeterblackPosition: null,//存储万用表黑色表笔放在那个控件上
        multimeterredPosition: null,//存储万用表黑色表笔放在那个控件上
        Radrepetition: '0',//存储万用表黑色表笔放在那个热区上
        Blackrepetition: '0',//存储万用表黑色表笔放在那个热区上
        w_multimeter_redHtml: null,//万用表红表笔的那个页面
        w_multimeter_blackHtml:null,//万用表红表笔的那个页面
        Param_redx: '440',//红色表线起始x坐标\红色表线曲线起始x坐标
        Param_redy: '100',//红色表线起始y坐标\红色表线曲线起始y坐标
        Param_redcx: '420',//红色表线曲线拐x坐标
        Param_redcy: '37',//红色表线曲线拐y坐标
        Param_redpx: '403',//红色表线曲线结束x坐标
        Param_redpy: '375',//红色表线曲线结束x坐标

        Param_blackx: '282',//黑色表线起始x坐标\黑色表线曲线起始x坐标
        Param_blacky: '100',//黑色表线起始y坐标\黑色表线曲线起始y坐标
        Param_blackcx: '302',//黑色表线曲线拐x坐标
        Param_blackcy: '37',//黑色表线曲线拐y坐标
        Param_blackpx: '376',//黑色表线曲线结束x坐标
        Param_blackpy: '375',//黑色表线曲线结束x坐标
        multimeterredstartx: '440',//红色表线起始x坐标\红色表线曲线起始x坐标的恢复值
        multimeterredstarty: '100',//红色表线起始y坐标\红色表线曲线起始y坐标的恢复值
        multimeterredradianx: '420',//红色表线曲线拐x坐标的恢复值
        multimeterredradiany: '37',//红色表线曲线拐y坐标的恢复值
        multimeterredstopx: '403',//红色表线曲线结束x坐标的恢复值
        multimeterredstopy: '375',//红色表线曲线结束x坐标的恢复值

        multimeterblackstartx: '282',//黑色表线起始x坐标\黑色表线曲线起始x坐标的恢复值
        multimeterblackstarty: '100',//黑色表线起始y坐标\黑色表线曲线起始y坐标的恢复值
        multimeterblackradianx: '302',//黑色表线曲线拐x坐标的恢复值
        multimeterblackradiany: '37',//黑色表线曲线拐y坐标的恢复值
        multimeterblackstopx: '376',//黑色表线曲线结束x坐标的恢复值
        multimeterblackstopy: '375'//黑色表线曲线结束x坐标的恢复值

    };
    multimeterService.Mint = {
        In1MultiLogic_x_Off_x_x:"1",	//万用表OFF档位
        In1MultiLogic_x_ACVlt_x_x:"0",//	万用表交流电压档位
        In1MultiLogic_x_DCVlt_x_x:"0",//	万用表直流电压档位
        In1MultiLogic_x_DCmVlt_x_x:"0",//	万用表直流电压毫伏档位
        In1MultiLogic_x_Pass2Ohm_x_x:"0",//	万用表欧姆档位
        In1MultiLogic_x_hFE_x_x:"0",//	万用表HFE档位
        In1MultiLogic_x_Amp_x_x:"0",//	万用表安培档位
        In1MultiLogic_x_mAmp_x_x:"0",//	万用表毫安档位
        In1MultiLogic_x_mirAmp_x_x:"0",//	万用表微安档位
        In1MultiLogic_x_Hold_x_x:"0",//	万用表保持档位
        In1MultiLogic_x_VltRP_x_x:"1",//	万用表电压电阻测量选择插孔
        In1MultiLogic_x_AmpMea_x_x:"0",//	万用表安培测量选择插孔
        In1MultiLogic_x_mirAmA_x_x:"0",//	万用表毫安微安测量选择插孔
        In1MultiLogic_x_COM_x_x:"1",//	万用表COM档位
        In1MultiLogic_x_Power_x_x:"1",//	万用表供电档位
        In1MultiLogic_x_Red_x_x:"0",//	万用表红表笔
        In1MultiLogic_x_Black_x_x:"0"//	万用表黑表笔


    };
    multimeterService.Mout = {
        Out1MultiLogic_x_ToScreen_x_x: '0'
    };

    return multimeterService;
})
