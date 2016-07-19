

allsensorModule.controller('allsensorCtrl',function ($scope, $state,$timeout,$rootScope,$compile,pageService,xcjService,dashboardService,multimeterService,diodelampService,oscilloscopeService,sparkplugService,oxygenService,cylpressguageService,obdscanService,ignltionTestDeviceService,sataService,xcjDataService) {

    $scope.pageServicePdata = pageService.Pdata;//页面中自己定义的状态
    $scope.pageServicePint = pageService.Pint;//传输的参数
    $scope.pageServicePout = pageService.Pout;//获取的参数*/
    $scope.diodelampServiceOdata = diodelampService.Odata;
    $scope.oscilloscopeServiceMdata = oscilloscopeService.Mdata;
    $scope.ignltionTestDeviceServiceOout = ignltionTestDeviceService.Oout;
    $scope.xcjDataService=xcjDataService;
    $scope.cylpressguageServiceOint = cylpressguageService.Oint;
    $scope.cylpressguageServiceOdata = cylpressguageService.Odata;
    $scope.xcjDataService.init();

    $scope.addAction=function(id){
        $scope.xcjDataService.setHandle(id,pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs])
    };
    $scope.errorShow=true;
    /*  表单提交数据*/
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    $scope.popup=false;
    /* 获取弹出层的内容*/
    $scope.popupContent=function(id,target,type){
        $scope.popup=true;
        var html="";
        $.each($("[layer='"+id+"']"),function(i,u){
            html+=$(u).html();
        });
        $("#popcontent").html($compile(html)($scope));
        var top=parseInt($(".ps-scrollbar-y").css("top"))<100 ? $(target).position().top-120 :parseInt($(".ps-scrollbar-y").css("top"))-120;
        $("#popup").css("top",top);
        $("#popcontent label").css("background",'url("images/index/check1.png") no-repeat left top');
        if($(target).attr("result")){
            var selectOpt=$(target).attr("result").split(",");
            for(var i=0;i<selectOpt.length;i++){
                $("[answer='"+selectOpt[i]+"']").attr("type","1");
                $("[answer='"+selectOpt[i]+"']").css("background",'url("images/index/check2.png") no-repeat left top')
            }
        }
        //和弹出层添加拖动
        $("#popup").draggable({
            containment: "#contain",
            revert: false
        });
    };

    //设置单选按钮
    // var m = new Map();
    $scope.setRadioStyle=function(id,questionID,target){
        $("[datatype='"+id+"']").removeAttr("style");
        target.style.background='url("images/index/selected02.png") no-repeat left top';
        if(target.getAttribute("checked")=="2"){
            $("[sign='"+id+"']").show();
            $("[sign='"+id+"'] input[out]").show();
            if($("[sign='"+id+"'] input[out]").attr("result")!=""){
               // alert("有DTC"+id+"---"+$("[sign='"+id+"'] input[out]").attr("result"))
                xcjDataService.setQuestion(id,$("[sign='"+id+"'] input[out]").attr("result"));
                return ;
            }
        }
        else{
            $("[sign='"+id+"']").hide();
            $("[name='"+id+"']").val("");
        }
        //alert("无DTC"+id+"---"+questionID)
        xcjDataService.setQuestion(id,questionID);
    };

    //设置复选按钮
    $scope.setCheckboxStyle=function(target,type,str){
        if($(target).attr("type")=="1"){
            $("[answer='"+$(target).attr("answer")+"']").attr("type","2");
            $(target).removeAttr("style");
            $("[name='"+target.getAttribute("answer")+"']").hide();
        }
        else{
            $("[answer='"+$(target).attr("answer")+"']").attr("type","1");
            $("[name='"+target.getAttribute("answer")+"']").show();
            $("[name='"+target.getAttribute("answer")+"']").val("");
            $("[name='"+target.getAttribute("answer")+"']").attr("result","");
            target.style.background='url("images/index/check2.png") no-repeat left top';

        }
        if(type && str){
            if($(target).attr("type")=="1"){
                $("[answer='"+$(target).attr("answer")+"']").attr("usercheck","");
            }
            else{
                $("[answer='"+$(target).attr("answer")+"']").attr("usercheck",target.getAttribute("optionid"));
            }
            var content=[];
            $.each($("[usercheck]"),function(i,u){
                if($(target).attr("usercheck")){
                    content.remove($(u).attr("optionid"));
                    content.push($(u).attr("optionid"));
                }
            });
            xcjDataService.setQuestion(target.getAttribute("datatype"),content.join(","));
        }
    };
    function memoryAnswer(){//
         //console.log(JSON.stringify($scope.xcjDataService.paper.scoreMap))
        $scope.xcjDataService.paper.scoreMap.eachMap(function(key,value){
            if(value.optionArray.length){
                var obj={"q03_01_a2":[],"q04_04_a2":[],"q09_01_01":[],"q09_01_02":[]},result=[];
                for(var i=0;i<value.optionArray.length;i++){
                    $("label[answer='"+value.optionArray[i].id).css("background",'url("images/index/selected02.png") no-repeat left top');
                    $("label[answer='"+value.optionArray[i].id+"']").attr("result","1");
                    //console.log($("#"+value.optionArray[i].id).html()+"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                    $("#"+value.optionArray[i].id).css("background",'url("images/index/selected02.png") no-repeat left top');
                    $("#"+value.optionArray[i].id).attr("result","1");
                    $("[out='"+value.optionArray[i].id.substring(0,9)+"']").show();

                    if($("[out='"+value.optionArray[i].id.substring(0,9)+"']").attr("data")){
                        var data = JSON.parse($("[out='"+value.optionArray[i].id.substring(0,9)+"']").attr("data"));
                            for (var j = 0; j < data.length; j++) {
                               // console.log(data[j].id +"###############"+ value.optionArray[i].id)
                                if (data[j].id == value.optionArray[i].id) {
                                    obj[value.optionArray[i].id.substring(0, 9)].push(value.optionArray[i].description);
                                }
                                result.remove(value.optionArray[i].id);
                                result.push(value.optionArray[i].id);
                                $("[out='"+value.optionArray[i].id.substring(0, 9)+"']").val(obj[value.optionArray[i].id.substring(0, 9)].join(","));
                               // console.log(value.optionArray[i].id.substring(0, 9)+"---"+result+"!!!!!")
                            }
                        $("[out='"+value.optionArray[i].id.substring(0, 9) +"']").attr("result",result);
                    }

                }

            }
        })

    }
    //关闭弹出层
    $scope.colsePopup=function(){
        $scope.popup=false;
    };
    //点击确认弹出层
    $scope.ensurePopup=function(){
        $scope.popup=false;
        var arr=[],answer=[];
        var qid = $("#popcontent label").attr("qid");
        var name = $("#popcontent label").attr("selectid");
        var optionid =$("#popcontent label").attr("optionid");
        var question=$("#popcontent label").attr("question");
        answer.push(optionid);
        $.each($("#popcontent [type='1']"),function(i,u){
            arr.push($(u).text());
            answer.push($(u).attr("answer"));
        });

        $("input[name='"+name+"']").val(arr.join(","));
        $("input[name='"+name+"']").attr("result",answer.join(","));

       // alert(qid+"-----"+$("input[name='"+name+"']").attr("result"))
        var content = $("input[name='"+name+"']").attr("result");
        xcjDataService.setQuestion(qid,content);
        if($("label#"+name).attr("style")!=undefined){
            xcjDataService.setQuestion(qid,content);
        }

    };

    //关闭浏览器窗口，兼容多个浏览器下的关闭方法
    function CloseWindow(){
        //关闭父类窗口(兼容多个浏览器的关闭)
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            top.window.parent.opener = top;
            top.window.parent.open('', '_self', '');
            top.window.parent.close();
        } else {
            window.parent.opener = null;
            window.parent.open("", "_self");
            window.parent.close();
        }
    }

    //退出的方法
    $scope.exitStudy=function(){
        if(pageService.Pdata.faultId=='f12ua'||pageService.Pdata.faultId=='f13ua'||pageService.Pdata.faultId=='f14ua'||pageService.Pdata.faultId=='f15ua'){
            if(pageService.Pdata[pageService.Pdata.faultId]){
                xcjDataService.setHandle('ver030');
            }else{
                xcjDataService.setHandle('ver030','0','1');
            }
        }
       var sign=true;
        for(var props in pageService.Pint){
            if(props.indexOf("Install")!=-1){
                 if(pageService.Pint[props]==0){
                     sign=false;
                     console.log(props+"---------------"+pageService.Pint[props]);
                     xcjDataService.setHandle('ver030');
                 }
            }
        }
        if(sign){
            xcjDataService.setHandle('ver030','0','1');
        }
        xcjDataService.commit("exit");
        $rootScope.exit();//退出模型的方法
       // CloseWindow();
    };
    window.onbeforeunload = function() {
        xcjDataService.commit("exit");
        $rootScope.exit();//退出模型的方法
    };

    $scope.colseError=function(){
        $scope.errorShow=false;
        CloseWindow();
    };

    //点击跳转 放大效果
    $scope.changePage = function (page, Scx, Scy) {

        pageService.Pdata.uiPage=page;
        $scope.repair=false;
        $scope.isFile=false;
        if(!$scope.repair){
            $("li[name='repair']").removeClass("selected");
        }
        if(!$scope.isFile){
            $("li[name='file']").removeClass("selected");
        }
        if(arguments.length==3){
            $("#view").show();
            $("#view").css("transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css("-ms-transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css("-webkit-transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css({"-webkit-animation":"'scale6' 1s","-ms-animation":"'scale6' 1s","animation":"'scale6' 1s"});
            $timeout(function (){
                $state.go(page);
            },1000);
        }
        else{
            $state.go(page);
        }

        $timeout(function(){
            $scope.initDragDrop();
            ignltionTestDeviceService.Odata.ignltionTestDeviceHontspot();
            sparkplugService.Odata.freshSocketHontspot();
            oxygenService.Odata.oxygenSocket();
            $scope.ljcDragMove();
        },1500);

            $timeout(function () {
                if(!obdscanService.Zdata.obdscanStatus) {
                    pageService.Pdata.s58b = false;
                    pageService.Pdata.s13d = false;
                    pageService.Pdata.s30swt = false;
                    pageService.Pdata.s78swt = false;
                    pageService.Pdata.s33 = false;
                }

                pageService.Pdata.s79d = false;
                pageService.Pdata.s82swt = false7;
                if ($('.fd-bg').attr('switches')) {
                    if ($('.fd-bg').attr('switches').indexOf('-') > 0) {
                        var ary = $('.fd-bg').attr('switches').split('-');
                        for (var i = 0; i < ary.length; i++) {
                            pageService.Pdata[ary[i]] = true;
                        }
                    } else {
                        pageService.Pdata[$('.fd-bg').attr('switches')] = true;
                    }
                }

            }, 2000)

        diodelampService.Odata.judgeS(page);
        oscilloscopeService.Mdata.judgeS(page);
        multimeterService.Mdata.judgeS(page);
        //设置示波仪right线
        $timeout(function (){
            $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
        },1000);

    };
    //跳页返回
    $scope.backPage = function(page, Scx, Scy){
        pageService.Pdata.uiPage=page;
        $timeout(function () {
            $state.go(page);
        }, 1000);
        $timeout(function () {
            $("#view").css("-ms-transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css("-webkit-transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css("transform-origin",Scx + "px " + (Scy+64) + "px");
            $("#view").css("-webkit-animation","'scale7' 1s");
            $("#view").css("-ms-animation","'scale7' 1s");
            $("#view").css("animation","'scale7' 1s");
        }, 1000);
        diodelampService.Odata.judgeS(page);
        oscilloscopeService.Mdata.judgeS(page);
        multimeterService.Mdata.judgeS(page);

        //设置示波仪right线
        $timeout(function (){
            $("#path_right").attr("d", "M" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " C" + oscilloscopeService.Mdata.Param_rightx + " " + oscilloscopeService.Mdata.Param_righty + " " + oscilloscopeService.Mdata.Param_rightcx + " " + oscilloscopeService.Mdata.Param_rightcy + " " + oscilloscopeService.Mdata.Param_rightpx + " " + oscilloscopeService.Mdata.Param_rightpy);
        },1500);

        $timeout(function(){
            $scope.initDragDrop();
            sparkplugService.Odata.freshSocketHontspot();
            oxygenService.Odata.oxygenSocket();
            ignltionTestDeviceService.Odata.ignltionTestDeviceHontspot();
        },1500);

    };
    //发动机电脑翻转跳页放大效果
    $scope.changeBigPage=function(page,x,y){
        if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
            $timeout(function(){
                $scope.changePage(page,x,y);
            },500);
        }
    };

    //显示弹框
    $scope.showMsg=function(id,msg){
        var _top=$("#"+id).css("top");
        var _left=$("#"+id).css("left");

        if(parseFloat(_top)<200){
            _top=250+"px";
        }
        $('.replaceLineMsg').css({"top":_top,"left":_left}).html(msg).show();
        setTimeout(function(){
            $('.replaceLineMsg').hide();
        },2000);
        console.log(id);
    };
    //部件拖动
    var ljcNum,imgId;
    $scope.onDragMove=function(id){
        $("#"+id).draggable({
            zIndex: 200,
            revert: true,
            start: function (event, ui) {//ui.helper: 正在拖动的元素的JQuery包装对象, ui.helper.context可以获取到原生的DOM元素.
                if(id=='bj-t8abcd'){
                    ljcNum = pageService.Pdata.ljc_bj;
                    imgId = pageService.Pdata.bj_dhxq;
                }else if(id=='bj-hhs'){
                    ljcNum = pageService.Pdata.ljc_bj;
                    imgId = pageService.Pdata.bj_hhs;
                }
            },
            drag: function (event, ui){
                pageService.Pdata.onDrag=false;
            },
            stop: function (event, ui) {
                pageService.Pdata.onDrag=true;
            }
        });
        //零件车可被拖放
        $("#ljcBox").droppable({
            tolerance: "touch",
            zIndex: 200,
            accept: "#t8a,#t8b,#t8c,#t8d,#t8a_hhs,#t8b_hhs,#t8c_hhs,#t8d_hhs,#f12ua,#f13ua,#f14ua,#f15ua,#f31ua,#f20ua",

            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var html = "";
                var id=ui.helper.context.id,newId=newId||id;
                var num=$("#"+id).next().attr("num");
                if(id=="t8a"||id=="t8b"||id=="t8c"||id=="t8d"){
                    if(id=='t8a'){
                        ljcNum = pageService.Pdata.t8a_num;
                        imgId = pageService.Pdata.t8a_imgId;
                    }else if(id=='t8b'){
                        ljcNum = pageService.Pdata.t8b_num;
                        imgId = pageService.Pdata.t8b_imgId;
                    }else if(id=='t8c'){
                        ljcNum = pageService.Pdata.t8c_num;
                        imgId = pageService.Pdata.t8c_imgId;
                    }else if(id=='t8d'){
                        ljcNum = pageService.Pdata.t8d_num;
                        imgId = pageService.Pdata.t8d_imgId;
                    }
                    html+="<img id='ljc_"+imgId+"' src='images/sbt_engine/dhxq/"+imgId+"_ljc_out.png' height='60'  width='60'/>";
                    if(imgId=='dhxq'&&pageService.Pdata.bjdhxq_Install!=0){
                        pageService.Pdata.bjdhxq_Install=0;
                    }
                }else if(id=="t8a_hhs"||id=="t8b_hhs"||id=="t8c_hhs"||id=="t8d_hhs"){
                    if(id=='t8a_hhs'){
                        ljcNum = pageService.Pdata.t8aHhs_num;
                        imgId = pageService.Pdata.t8aHhs_imgId;
                    }else if(id=='t8b_hhs'){
                        ljcNum = pageService.Pdata.t8bHhs_num;
                        imgId = pageService.Pdata.t8bHhs_imgId;
                    }else if(id=='t8c_hhs'){
                        ljcNum = pageService.Pdata.t8cHhs_num;
                        imgId = pageService.Pdata.t8cHhs_imgId;
                    }else if(id=='t8d_hhs'){
                        ljcNum = pageService.Pdata.t8dHhs_num;
                        imgId = pageService.Pdata.t8dHhs_imgId;
                    }
                    html+="<img id='ljc_"+imgId+"' src='images/sbt_engine/dhxq/hhs.png' height='60'  width='60'/>";
                    if(imgId=='hhs'&&pageService.Pdata.bjhhs_Install!=0){
                        pageService.Pdata.bjhhs_Install=0;
                    }
                }else if(id=="f12ua"||id=="f13ua"||id=="f14ua"||id=="f15ua"){
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum="15A保险丝（备件）";
                        if(/bj/.test(ui.helper.attr('tag'))){
                            newId=ui.helper.attr('tag')
                        }else{
                            newId="bj"+ui.helper.attr('tag');
                        }

                        pageService.Pdata[id+"_bjOn"]=false;
                    }else{
                        if(ui.helper.attr('tag')){
                            newId=ui.helper.attr('tag');
                        }
                        ljcNum="15A保险丝";
                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_f12ua.png' height='62'  width='62'/>";
                    pageService.Pdata[id+"_out"]=false;
                }else{
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum=pageService.Pdata.ljName[id]+"(备件)";
                        newId="bj"+id;
                        pageService.Pdata[id+"_bjOn"]=false;

                    }else{
                        ljcNum=pageService.Pdata.ljName[id];
                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_"+id+".png' height='62'  width='62'/>";
                    pageService.Pdata[id+"_out"]=false;
                }
                pageService.Pdata[id]=false;
                pageService.ljcJump();

                $($("#ljcBox li:empty")[0]).html($compile(html)($scope));
                $('#ljc_'+imgId).attr('title',ljcNum);
                $('#ljc_'+newId).attr('title',ljcNum);
                $scope.ljcDragMove("ljc_"+imgId);
                $scope.ljcDragMove("ljc_"+newId);
            }
        });
        //零件车跳页问题
        pageService.ljcJump = function(){
            var dom = $("#ljcBox li:empty")[0];
            $(dom).parent().siblings().css("z-index", 31);
            $(dom).parent().css("z-index", 32);
            y = $(dom).parent().attr('index');
            if(y>1){
                $(".ljc-prev").css("background-image","url(images/index/prev.png)");
            }else if(y==1){
                $(".ljc-prev").css("background","url(images/index/prev_false.png)");
            }
            if(y<12){
                $(".ljc-next").css("background","url(images/index/next.png)");
            }else if(y==12){
                $(".ljc-next").css("background","url(images/index/next_false.png)");
            }
        };
        //更换保险丝
        $(".bjr-"+id).droppable({
            zIndex: 100,
            accept: "#bj-"+id+",#ljc_"+id+",#ljc_bj"+id,
            tolerance: "touch",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var msg="";
                $('#'+ui.helper.context.id).remove();
                if(pageService.Pdata[id]){
                    $scope.replaceFuse(id,id,false);
                    pageService.Pdata[id]=false;
                }
                if(pageService.Pdata[id+"_bjOn"]){
                    $scope.replaceFuse(id,'bj'+id,true);
                }
                if(/bj/.test(ui.helper.context.id)){
                    pageService.Pdata[id+"_bjOn"]=true;
                }else{
                    pageService.Pdata[id+"_bjOn"]=false;
                    pageService.Pdata[id]=true;
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg='已更换';
                }else{
                    msg='已安装';
                }
                pageService.Pdata[id+'_out']=true;
                var _id=id.toUpperCase();
                $scope.pageServicePdata.fuse_out=false;
                $scope.pageServicePint["In1Sen_"+_id+"_Body_x_Install"]="1";
                $scope.showMsg(id,pageService.Pdata.ljName[id]+msg);
                if(id == "f31ua"){
                    multimeterService.Mdata.rtnMultimeterPosition('1','f31ua');
                }
                if(id == "f20ua"){
                    multimeterService.Mdata.rtnMultimeterPosition('9','f20_12_3ua');
                }
                if(ui.helper.context.id == "bj-"+id){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    pageService.Pdata[id+'_cx']='1';
                }else if(ui.helper.context.id=='ljc_bj'+id){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].bjoId);
                    pageService.Pdata[id+'_cx']='1';
                }
                console.log(id+" 1111111")
            }
        });
        $(".bjz-"+id).droppable({
            zIndex: 100,
            tolerance: "pointer",
            accept: "#bj_f12ua,#bj_f13ua,#bj_f14ua,#bj_f15ua,#ljc_f12ua,#ljc_f13ua,#ljc_f14ua,#ljc_f15ua,#ljc_bjf12ua,#ljc_bjf13ua,#ljc_bjf14ua,#ljc_bjf15ua",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var fid=this.id,msg="";
                var rId=fid.split("-").slice(1,2).toString();
                var dragId=ui.helper.context.id;
                var trueId=dragId.split("_").slice(1,2).toString();
                var tag=$("#"+rId).attr("tag");
                $("#"+ui.helper.context.id).remove();
                if(pageService.Pdata[rId]&&!pageService.Pdata[rId + "_bjOn"]&&pageService.Pdata[rId + "_out"]){
                        $scope.replaceFuse(rId,tag,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    if(/bj/.test(tag)){
                        $scope.replaceFuse(rId,tag,true);
                    }else{
                        $scope.replaceFuse(rId,"bj"+tag,true);
                    }
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId.length=="9"){
                    $scope.pageServicePdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true;
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg='15A保险丝已更换';
                }else{
                    msg='15A保险丝已安装';
                }
                var _fid=rId.toUpperCase();
                $scope.pageServicePdata.fuse_out=false;
                $scope.pageServicePdata[rId+"_out"]=true;
                $scope.pageServicePdata[rId]=true;
                $scope.pageServicePint["In1Sen_"+_fid+"_Body_x_Install"]="1";
                $scope.showMsg(fid,msg);
                $("#"+rId).attr("tag",trueId);
                multimeterService.Mdata.rtnMultimeterPosition('1','f20_12_3ua');
                multimeterService.Mdata.rtnMultimeterPosition('3','f20_12_3ua');
                multimeterService.Mdata.rtnMultimeterPosition('5','f20_12_3ua');
                multimeterService.Mdata.rtnMultimeterPosition('7','f20_12_3ua');

                if(ui.helper.context.id=="bj_f12ua"||ui.helper.context.id=="bj_f13ua"||ui.helper.context.id=="bj_f14ua"||ui.helper.context.id=="bj_f15ua"){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    pageService.Pdata[id+'_cx']='1';
                }
                if(ui.helper.context.id=="ljc_bjf12ua"||ui.helper.context.id=="ljc_bjf13ua"||ui.helper.context.id=="ljc_bjf14ua"||ui.helper.context.id=="ljc_bjf15ua"){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].bjoId);
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    pageService.Pdata[id+'_cx']='1';
                }
                //其他零件替换故障零件，进行故障码重置
                if(trueId!=pageService.Pdata.faultId){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    var faultPlace=pageService.Pdata.fault[xcjDataService.faultType].gzcs;
                    pageService.Pint[faultPlace]='1';
                }
                if(pageService.Pdata.faultId==trueId && trueId!=rId){
                    pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs] = '1';
                    xcjDataService.faultType=$scope.faultObj[rId];
                    $scope.watchFault(xcjDataService.faultType);
                    $scope.sameFuseDefault(xcjDataService.faultType);
                }
            }
        });

    };
    //初始化页面可拖拽和可拖放事件
    $timeout(function(){$scope.initDragDrop();},100);
    $scope.initDragDrop=function(){
        var ary1=['f12ua','f13ua','f14ua','f15ua','f20ua','f31ua','t8a','t8b','t8c','t8d','t8a_hhs','t8b_hhs','t8c_hhs','t8d_hhs'],ary2=['t8a','t8b','t8c','t8d','q38','q12','q22','b52a','b52b','b74','b47b','k20','b75c','q6e','q6f','b23e','b23f','x160','Pos','Neg'];
        $.each(ary1,function(i,value){
            $scope.onDragMove(value);
        });
        $.each(ary2,function(i,value){
            $scope.initComponentDrop(value);
        });
    };

    //初始化各零件可拖放
    $scope.initComponentDrop=function(id){
        //拆卸零件
        $("#msg-"+id).droppable({
            zIndex: 100,
            tolerance: "touch",
            accept: "#sataTool",
            over: function (event, ui) {
                sataService.Odata.sata_hot=true;
            },
            out: function (event, ui) {
                sataService.Odata.sata_hot=false;
            },
            drop: function (event, ui) {
                sataService.Odata.sata_hot=false;
                if(id=="t8a"||id=="t8b"||id=="t8c"||id=="t8d"){
                    var ary=$("#msg-"+id).attr("sata").split("-");
                    if(sataService.Odata.sataType==ary[0]&&sataService.Odata.sataSize==ary[1]){
                        $scope.dhxq_bc('.'+id);
                    }else{
                        $scope.showMsg("msg-"+id,"请选择合适的工具");
                    }
                }else if(id=="Pos"||id=="Neg"){
                    if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x >= 200){
                        $('.prompt').show()
                            .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                            .css({position:'absolute','left':'438px','top':'361px'});
                        $('.prompt').html("发动机运行状态下请勿拔下蓄电池插头");
                        $timeout(function(){
                            $('.prompt').hide();
                        },2000)
                    }else{
                        var ary1=$("#msg-"+id).attr("sata").split("-");
                        if(sataService.Odata.sataType==ary1[0]&&sataService.Odata.sataSize==ary1[1]){
                            if(id=="Pos"){
                                $scope.ctOpen('In1Sen_BATT_'+id+'_x_Install','2','bt');
                            }
                            if(id=="Neg"){
                                $scope.ctOpen('In1Sen_BATT_'+id+'_x_Install','4','bt');
                            }
                        }else{
                            $scope.showMsg("msg-"+id,"请选择合适的工具");
                        }
                        //油箱油量指针旋转
                        $(".pointer_oil").css("transform","rotate(0deg)");
                    }
                }else{
                    $scope.withDrawalTool(id);

                }

            }
        });
        //安装零件
        $("."+id+"_install").droppable({
            zIndex: 100,
            accept: "#ljc_"+id+",#bj-"+id+",#ljc_bj"+id+"",
            tolerance: "touch",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                $scope.changeComponent(id,ui.helper.context.id,pageService.Pdata.ljName[id]);
                if(ui.helper.context.id == "bj-"+id){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    if(id=="k20"){
                        pageService.Pdata[id+'_cx'] = '1';
                    }
                }else if(ui.helper.context.id=='ljc_bj'+id){
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].bjoId);
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].cId);
                    if(id=="k20"){
                        pageService.Pdata[id+'_cx'] = '1';
                    }
                }
            }
        });
        //更换线束
        $(".line").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: "#bj-line,#ljc_line,#ljc_bjline",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var html;
                $('#'+ui.helper.context.id).remove();
                if(ui.helper.context.id == 'bj-line'){
                    pageService.Pdata.line_bjOn = true;
                    xcjDataService.setHandle('ver238');//更换发动机线束
                }else if(ui.helper.context.id == 'ljc_bjline'){
                    pageService.Pdata.line_bjOn = true;
                    xcjDataService.setHandle('ver366');//安装发动机线束备件
                    xcjDataService.setHandle('ver238')
                }else if(ui.helper.context.id == 'ljc_line'){
                    pageService.Pdata.line_bjOn = false;
                    xcjDataService.setHandle('ver367');//拆卸发动机线束备件
                    xcjDataService.setHandle('ver238','1');
                }
                pageService.ljcJump();
                if(/bj/.test(ui.helper.context.id)){

                     html="<img id='ljc_line' src='images/bjk/bj_line.png' height='62'  width='62' title='发动机线束' />";

                    $($("#ljcBox li:empty")[0]).html($compile(html)($scope));
                    $scope.ljcDragMove("ljc_line");
                }else{
                    html="<img id='ljc_bjline' src='images/bjk/bj_line.png' height='62'  width='62' title='发动机线束(备件)' />";
                    $($("#ljcBox li:empty")[0]).html($compile(html)($scope));
                    $scope.ljcDragMove("ljc_bjline");
                }

                $scope.replaceLine(this.id);
            }

        });
    };
    //更换保险丝，如果保险丝未放入零件车
    $scope.replaceFuse=function(id,name,index){
        var html = "",title=pageService.Pdata.ljName[id];
        if(index){
            title=pageService.Pdata.ljName[id]+"(备件)";
        }
        if(id=="f12ua"||id=="f13ua"||id=="f14ua"||id=="f15ua"){
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_f12ua.png' height='62'  width='62' title='"+title+"' />";
        }else{
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='"+title+"' />";
        }
        pageService.Pdata.fuse_out=false;
        pageService.ljcJump();
        $($("#ljcBox li:empty")[0]).html($compile(html)($scope));
        $scope.ljcDragMove("ljc_"+name);

    };
    //更换线束
    $scope.replaceLine=function(Id) {
        var times1= setInterval(function(){$("[status='"+Id+"']").show();},500);
        var times2= setInterval(function(){$("[status='"+Id+"']").hide();},700);
        $timeout(function() {
            window.clearInterval(times1);
            window.clearInterval(times2);
            $scope.showMsg(Id,"线束已更换");
        },2300)
    };
    //零件拆卸,用于世达工具拆卸
    $scope.withDrawalTool=function(id){
        var ary=$("#msg-"+id).attr("sata").split("-");
        var html="",newId=id;
        if(sataService.Odata.sataType==ary[0]&&sataService.Odata.sataSize==ary[1]){
            var name=pageService.Pdata.ljName[id];
            if(pageService.Pdata[id+"_bjOn"]){
                html+="<img id='ljc_bj"+id+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='"+name+"(备件)'/>";
                xcjDataService.setHandle(pageService.Pdata.actionData[id].bjcId);
                xcjDataService.setHandle(pageService.Pdata.actionData[id].cId,'0','1');
                pageService.Pdata[id+"_bjOn"]=false;
                newId="bj"+id;
            }else{
                html+="<img id='ljc_"+id+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='"+name+"'/>";
            }
            pageService.ljcJump();
            $($("#ljcBox li:empty")[0]).html(html);
            pageService.Pdata[id+"_tearDown"]=false;
            $scope.ljcDragMove("ljc_"+newId);
            $scope.showMsg("msg-"+id,name+"已拆卸");
        }else if(id=="q22"||id=="q12"||id=="k20"){
            $scope.showMsg("msg-"+id,"请直接点击拆除");
        } else{
            $scope.showMsg("msg-"+id,"请选择合适的工具");
        }
        if(id != 'b47b'){
            multimeterService.Mdata.rtnMultimeterPosition('1',id);
        }


    };
    //用于氧传感器拆卸
    pageService.inLjc=function(id,name){
        $scope.ljcDragMove("ljc_"+id);
        $scope.showMsg("mg-"+id,name+"已拆卸");
        multimeterService.Mdata.rtnMultimeterPosition('1',id);
    };
    //拆卸q12和k20，用于点击拆卸插座体
    $scope.tearDownBody=function(id,num,href){
        multimeterService.Mdata.rtnMultimeterPosition(num,href);
        var name=pageService.Pdata.ljName[id];
        var newId=id,html="";
        if(pageService.Pdata[id+"_bjOn"]) {
            html += "<img id='ljc_bj" + id + "' src='images/bjk/bj_" + id + ".png' height='62'  width='62' title='" + name + "(备件)'/>";
            pageService.Pdata[id + "_bjOn"] = false;
            newId = "bj" + id;
        }else{
            html+="<img id='ljc_"+id+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='" + name + "'/>";
        }
        pageService.ljcJump();
        $($("#ljcBox li:empty")[0]).html(html);
        pageService.Pdata[id+"_tearDown"]=false;
        $scope.ljcDragMove("ljc_"+newId);
        $scope.showMsg("msg-"+id,name+"已拆卸");
        if(pageService.Pdata[id+'_cx'] == '1'){
            xcjDataService.setHandle(pageService.Pdata.actionData[id].bjcId);
            xcjDataService.setHandle(pageService.Pdata.actionData[id].cId,'0','1');
            pageService.Pdata[id+'_cx'] = '0';
        }
    };
    //零件车中零件的拖动
    $scope.ljcDragMove=function(id) {
        $("#"+id).draggable({
            zIndex: 200,
            revert: true,
            start: function (event, ui) {//ui.helper: 正在拖动的元素的JQuery包装对象, ui.helper.context可以获取到原生的DOM元素.
                if(id=='ljc_t8a'){
                    ljcNum = 'T8A点火线圈';
                    imgId = 't8a';
                }else if(id=='ljc_t8b'){
                    ljcNum = 'T8B点火线圈';
                    imgId = 't8b';
                }else if(id=='ljc_t8c'){
                    ljcNum = 'T8C点火线圈';
                    imgId = 't8c';
                }else if(id=='ljc_t8d'){
                    ljcNum = 'T8D点火线圈';
                    imgId = 't8d';
                }else if(id=='ljc_dhxq'){
                    ljcNum = '备件';
                    imgId = 'dhxq';
                }else if(id=='ljc_t8a_hhs'){
                    ljcNum = 1;
                    imgId = 't8a_hhs';
                }else if(id=='ljc_t8b_hhs'){
                    ljcNum = 2;
                    imgId = 't8b_hhs';
                }else if(id=='ljc_t8c_hhs'){
                    ljcNum = 3;
                    imgId = 't8c_hhs';
                }else if(id=='ljc_t8d_hhs'){
                    ljcNum = 4;
                    imgId = 't8d_hhs';
                }else if(id=='ljc_hhs'){
                    ljcNum = '备件';
                    imgId = 'hhs';
                }
            },
            drag: function (event, ui) {

            },
            stop: function (event, ui) {

            }
        });

        $(".t8a-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a,#ljc_t8b,#ljc_t8c,#ljc_t8d,#bj-t8abcd,#ljc_dhxq",
            drop: function (event, ui) {
                var t8aId
                pageService.Pdata.t8a_num = ljcNum;
                pageService.Pdata.t8a_imgId = imgId;

                $('#msg-t8a').attr('title',ljcNum);
                $scope.dhxq_cs('.t8a');
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8a=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    $scope.prompt(".t8a-body-install-hot");
                    xcjDataService.setHandle('ver245');//备件更换
                    pageService.Pdata.bjdhxq_Install='1';//点火线圈备件的安装位置
                }
                if(ui.helper.context.id=='ljc_dhxq'){
                    xcjDataService.setHandle('ver368');//备件安装
                    pageService.Pdata.bjdhxq_Install='1';//点火线圈备件的安装位置
                }
            }
        });
        $(".t8aHhs-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a_hhs,#ljc_t8b_hhs,#ljc_t8c_hhs,#ljc_t8d_hhs,#bj-hhs,#ljc_hhs",
            drop: function (event, ui) {
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    pageService.Pdata.t8aHhs_num = ljcNum;
                    pageService.Pdata.t8aHhs_imgId = imgId;
                    $scope.hhs_cs('t8a');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8a_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        $scope.prompt(".t8a-hhs-install-hot");
                    }
                    if(ui.helper.context.id=='bj-hhs'||ui.helper.context.id=='ljc_hhs'){
                        xcjDataService.setHandle('ver370');//备件安装
                        pageService.Pdata.bjhhs_Install='1';//火花塞备件的安装位置
                    }
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'348px',top:'211px'});
                    $('.prompt').html("发动机运行状态下请勿安装火花塞");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });
        $(".t8a-gangYaBiao-hot").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: ".cylpressguage-oilwatch",
            over:function(){
                $('.cylpressguage-tishi').show();
            },
            out:function(){
                $('.cylpressguage-tishi').hide();
            },
            drop:function(event,ui){
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    cylpressguageService.Odata.cylpressguageStatus = false;
                    pageService.Pdata.gybwz = '1';
                    cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '1';
                    $('.cylpressguage-tishi').hide();
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'348px',top:'211px'});
                    $('.prompt').html("发动机运行状态下请勿安装缸压表");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });
        $(".t8b-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a,#ljc_t8b,#ljc_t8c,#ljc_t8d,#bj-t8abcd,#ljc_dhxq",
            drop: function (event, ui) {
                $scope.dhxq_cs('.t8b');
                pageService.Pdata.t8b_num = ljcNum;
                pageService.Pdata.t8b_imgId = imgId;
                $('#msg-t8b').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8b=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    $scope.prompt(".t8b-body-install-hot");
                    xcjDataService.setHandle('ver246');
                    pageService.Pdata.bjdhxq_Install='2';//点火线圈备件的安装位置
                }
                if(ui.helper.context.id=='ljc_dhxq'){
                    xcjDataService.setHandle('ver368');//备件安装
                    pageService.Pdata.bjdhxq_Install='2';//点火线圈备件的安装位置
                }
            }
        });
        $(".t8bHhs-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a_hhs,#ljc_t8b_hhs,#ljc_t8c_hhs,#ljc_t8d_hhs,#bj-hhs,#ljc_hhs",
            drop: function (event, ui) {
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    pageService.Pdata.t8bHhs_num = ljcNum;
                    pageService.Pdata.t8bHhs_imgId = imgId;
                    $scope.hhs_cs('t8b');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8b_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        $scope.prompt(".t8b-hhs-install-hot");
                    }
                    if(ui.helper.context.id=='bj-hhs'||ui.helper.context.id=='ljc_hhs'){
                        xcjDataService.setHandle('ver370');//备件安装
                        pageService.Pdata.bjhhs_Install='2';//火花塞备件的安装位置
                    }
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'741px',top:'201px'});
                    $('.prompt').html("发动机运行状态下请勿安装火花塞");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });
        $(".t8b-gangYaBiao-hot").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: ".cylpressguage-oilwatch",
            over:function(){
                $('.cylpressguage-tishi').show();
            },
            out:function(){
                $('.cylpressguage-tishi').hide();
            },
            drop:function(event,ui){
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    cylpressguageService.Odata.cylpressguageStatus = false;
                    pageService.Pdata.gybwz='2';
                    cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '1';
                    $('.cylpressguage-tishi').hide();
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'741px',top:'201px'});
                    $('.prompt').html("发动机运行状态下请勿安装缸压表");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });
        $(".t8c-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a,#ljc_t8b,#ljc_t8c,#ljc_t8d,#bj-t8abcd,#ljc_dhxq",
            drop: function (event, ui) {
                $scope.dhxq_cs('.t8c');
                pageService.Pdata.t8c_num = ljcNum;
                pageService.Pdata.t8c_imgId = imgId;
                $('#msg-t8c').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8c=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    $scope.prompt(".t8c-body-install-hot");
                    xcjDataService.setHandle('ver247');
                    pageService.Pdata.bjdhxq_Install='3';//点火线圈备件的安装位置
                }
                if(ui.helper.context.id=='ljc_dhxq'){
                    xcjDataService.setHandle('ver368');//备件安装
                    pageService.Pdata.bjdhxq_Install='3';//点火线圈备件的安装位置
                }
            }
        });
        $(".t8cHhs-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a_hhs,#ljc_t8b_hhs,#ljc_t8c_hhs,#ljc_t8d_hhs,#bj-hhs,#ljc_hhs",
            drop: function (event, ui) {
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    pageService.Pdata.t8cHhs_num = ljcNum;
                    pageService.Pdata.t8cHhs_imgId = imgId;
                    $scope.hhs_cs('t8c');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8c_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        $scope.prompt(".t8c-hhs-install-hot");
                    }
                    if(ui.helper.context.id=='bj-hhs'||ui.helper.context.id=='ljc_hhs'){
                        xcjDataService.setHandle('ver370');//备件安装
                        pageService.Pdata.bjhhs_Install='3';//火花塞备件的安装位置
                    }
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'277px',top:'207px'});
                    $('.prompt').html("发动机运行状态下请勿安装火花塞");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });
        $(".t8c-gangYaBiao-hot").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: ".cylpressguage-oilwatch",
            over:function(){
                $('.cylpressguage-tishi').show();
            },
            out:function(){
                $('.cylpressguage-tishi').hide();
            },
            drop:function(event,ui){
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    cylpressguageService.Odata.cylpressguageStatus = false;
                    pageService.Pdata.gybwz='3';
                    cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '1';
                    $('.cylpressguage-tishi').hide();
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'277px',top:'207px'});
                    $('.prompt').html("发动机运行状态下请勿安装缸压表");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }
            }
        });
        $(".t8d-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a,#ljc_t8b,#ljc_t8c,#ljc_t8d,#bj-t8abcd,#ljc_dhxq",
            drop: function (event, ui) {
                $scope.dhxq_cs('.t8d');
                pageService.Pdata.t8d_num = ljcNum;
                pageService.Pdata.t8d_imgId = imgId;
                $('#msg-t8d').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8d=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    $scope.prompt(".t8d-body-install-hot");
                    xcjDataService.setHandle('ver248');
                    pageService.Pdata.bjdhxq_Install='4';//点火线圈备件的安装位置
                }
                if(ui.helper.context.id=='ljc_dhxq'){
                    xcjDataService.setHandle('ver368');//备件安装
                    pageService.Pdata.bjdhxq_Install='4';//点火线圈备件的安装位置
                }
            }
        });
        $(".t8dHhs-installHot").droppable({
            zIndex: 100,
            accept: "#ljc_t8a_hhs,#ljc_t8b_hhs,#ljc_t8c_hhs,#ljc_t8d_hhs,#bj-hhs,#ljc_hhs",
            drop: function (event, ui) {
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    pageService.Pdata.t8dHhs_num = ljcNum;
                    pageService.Pdata.t8dHhs_imgId = imgId;
                    $scope.hhs_cs('t8d');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8d_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        $scope.prompt(".t8d-hhs-install-hot");
                    }
                    if(ui.helper.context.id=='bj-hhs'||ui.helper.context.id=='ljc_hhs'){
                        xcjDataService.setHandle('ver370');//备件安装
                        pageService.Pdata.bjhhs_Install='4';//火花塞备件的安装位置
                    }
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'679px',top:'201px'});
                    $('.prompt').html("发动机运行状态下请勿安装火花塞");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }

            }
        });

        $(".t8d-gangYaBiao-hot").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: ".cylpressguage-oilwatch",
            over:function(){
                $('.cylpressguage-tishi').show();
            },
            out:function(){
                $('.cylpressguage-tishi').hide();
            },
            drop:function(event,ui){
                if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                    cylpressguageService.Odata.cylpressguageStatus = false;
                    pageService.Pdata.gybwz='4';
                    cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '1';
                    $('.cylpressguage-tishi').hide();
                }else{
                    $('.prompt').show()
                        .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                        .css({position:'absolute',left:'679px',top:'201px'});
                    $('.prompt').html("发动机运行状态下请勿安装缸压表");
                    $timeout(function(){
                        $('.prompt').hide();
                    },2000)
                }
            }
        });

    };


    //零件更换
    $scope.changeComponent=function(name,id,msg){
        console.log(name);
        if(/bj/.test(id)){
            pageService.Pdata[name+"_bjOn"]=true;
        }
        console.log(pageService.Pdata[name+"_bjOn"])
        pageService.Pdata[name+"_tearDown"]=true;
        $("#"+id).remove();
        if(/bj-/.test(id)){
            msg+="已更换";
        }else{
            msg+="已安装";
        }
        $scope.showMsg(id,msg);
    };
    //设置菜单状态
    $scope.setMenuStatus=function(str,item){
        $("."+str+" li").removeClass("selected");
        $("[name='"+item+"']").addClass('selected');
    };
    //初始化备件库部件
    var initDrag=function(str){
        $.each($("."+str+" li"),function(i,u){
            if($(u).find("img").attr("id")){
                $scope.onDragMove($(u).find("img").attr("id"));
            }
        });
        $('#bj_f13ua').draggable({
            zIndex: 200,
            revert: true
        });
        $('#bj_f14ua').draggable({
            zIndex: 200,
            revert: true
        });
        $('#bj_f15ua').draggable({
            zIndex: 200,
            revert: true
        });
    };
    //加载备件库的拖动事件
    $timeout(function(){initDrag('bjk-fdjpj'); },1000);

    //维修工单
    $scope.repair=false;
    $scope.maintainer=function(item){
        $scope.isFile=false;
        pageService.Pdata.bjkCar=false;
        pageService.Pdata.ljcCar=false;
        pageService.Pdata.toolBox=false;
        pageService.Pdata.switchBox=false;
        $scope.setMenuStatus('menu-nav',item);
        $scope.repair=!$scope.repair;
        $timeout(function(){memoryAnswer();
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

        },1500);
    };
    //零件车
    $scope.menuLjc=function (item){
        $scope.setMenuStatus('menu-nav',item);
        pageService.Pdata.ljcCar=!pageService.Pdata.ljcCar;
        pageService.Pdata.bjkCar=false;
        pageService.Pdata.toolBox=false;
        pageService.Pdata.switchBox=false;
        $scope.repair=false;
        $scope.isFile=false;
    };
    //备件库
    $scope.menuBjk=function(item){
        pageService.Pdata.ljcCar=false;
        pageService.Pdata.toolBox=false;
        pageService.Pdata.switchBox=false;
        $scope.repair=false;
        $scope.isFile=false;
        pageService.Pdata.bjkCar=!pageService.Pdata.bjkCar;
        $scope.setMenuStatus('menu-nav',item);
    };
    //开关
    $scope.menuSwitch=function(item){
        pageService.Pdata.ljcCar=false;
        pageService.Pdata.bjkCar=false;
        pageService.Pdata.toolBox=false;
        $scope.repair=false;
        $scope.isFile=false;
        pageService.Pdata.switchBox=!pageService.Pdata.switchBox;
        $scope.setMenuStatus('menu-nav',item);
    };

    //备件库里二级菜单
    $scope.fdjParts=function(item){
        i=1;
        bjkType=item;
        $(".bjk-prev").css("background-image","url(images/index/prev_false.png)");
        $(".bjk-next").css("background-image","url(images/index/next.png)");
        $("."+bjkType).children("ul").css("z-index",1);
        $("."+bjkType).children("ul").first().css("z-index",2);
        $("."+item).show().siblings().hide();
        $scope.setMenuStatus('bjk-tabs',item);
    };
    //维修资料
    $scope.isFile=false;
    $scope.repairFile=function(item){
        $scope.setMenuStatus('menu-nav',item);
        pageService.Pdata.bjkCar=false;
        pageService.Pdata.ljcCar=false;
        pageService.Pdata.toolBox=false;
        pageService.Pdata.switchBox=false;
        $scope.repair=false;
        $scope.isFile=false&&$(".se")
        $scope.isFile=!$scope.isFile;
    };
    //树形列表的显示和隐藏
    $scope.ztree1=true;
    $scope.ztree2=true;
    $scope.ztree3=true;
    $scope.ztree4=true;
    $scope.dataBox=false;
    //数列的显示和隐藏
    $scope.ztreeShowOrHide=function(obj){
        if(obj==1){
            if($scope.ztree1==1){
                $scope.ztree1=0;
            }else{
                $scope.ztree1=1;
            }
        }else if(obj==2){
            if($scope.ztree2==1){
                $scope.ztree2=0;
            }else{
                $scope.ztree2=1;
            }
        }
        else if(obj==3){
            if($scope.ztree3==1){
                $scope.ztree3=0;
            }else{
                $scope.ztree3=1;
            }
        }
        else if(obj==4){
            if($scope.ztree4==1){
                $scope.ztree4=0;
            }else{
                $scope.ztree4=1;
            }
        }
    }
    //导航框的显示和隐藏
    $scope.boxSowOrHide=function(){
        //显示就让其隐藏
        if($scope.dataBox){
            $scope.dataBox=false;
            $(".navi-box").stop().animate({"left":"-270px"},300);
        }else{
            $scope.dataBox=true;
            $(".navi-box").stop().animate({"left":"0"},300);
        }
    }

    //维修工具
    $scope.menuToolBox=function(item){
        pageService.Pdata.bjkCar=false;
        pageService.Pdata.ljcCar=false;
        pageService.Pdata.switchBox=false;
        $scope.repair=false;
        $scope.isFile=false;
        pageService.Pdata.toolBox=!pageService.Pdata.toolBox;
        $scope.setMenuStatus('menu-nav',item);
    };
    //工具选择状态
    $scope.toolsStatus=function(type,target){
        if(type=="obdscan"&&target.getAttribute('src')=="images/obdscan.png"){
            target.setAttribute('src',"images/obdscan_ed.png")
        }
        else if(type=="multimeter"&&target.getAttribute('src')=="images/multimeter.png"){
            target.setAttribute('src',"images/multimeter_ed.png");
            if(oscilloscopeService.Mdata.oscilloscopeStatus){
                oscilloscopeService.Mdata.oscilloscopeHide();
            }
            if(diodelampService.Odata.diodelampStatus){
                diodelampService.Odata.diodelampHide();
            }
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';
        }
        else if(type=="cylpressguage"&&target.getAttribute('src')=="images/cylinder.png"){
            target.setAttribute('src',"images/cylinder_ed.png")
        }
        else if(type=="oxygen"&&target.getAttribute('src')=="images/oxygen.png"){
            target.setAttribute('src',"images/oxygen_ed.png")
        }
        else if(type=="sparkplug"&&target.getAttribute('src')=="images/sparkPlug.png"){
            target.setAttribute('src',"images/sparkplug_ed.png")
        }
        else if(type=="diodelamp"&&target.getAttribute('src')=="images/diodelamp.png"){
            target.setAttribute('src',"images/diodelamp_ed.png");
            if(oscilloscopeService.Mdata.oscilloscopeStatus){
                oscilloscopeService.Mdata.oscilloscopeHide();
            }
            if(multimeterService.Mdata.multimeterStatus){
                multimeterService.Mdata.closemultimeter();
            }
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';
        }
        else if(type=="sata"&&target.getAttribute('src')=="images/starTool.png"){
            target.setAttribute('src',"images/startool_ed.png")
        }
        else if(type=="oscilloscope"&&target.getAttribute('src')=="images/oscilloscope.png"){
            target.setAttribute('src',"images/oscilloscope_ed.png");
            if(multimeterService.Mdata.multimeterStatus){
                multimeterService.Mdata.closemultimeter();
            }
            if(diodelampService.Odata.diodelampStatus){
                diodelampService.Odata.diodelampHide();
            }
            multimeterService.Mint.In1MultiLogic_x_Red_x_x = '0';
        }

        else if(type=="ignltionTestDevice"&&target.getAttribute('src')=="images/ignltionTestDevice.png"){
            target.setAttribute('src',"images/ignltionTestDevice_ed.png")
        }

    };
    //维修工具里二级菜单
    $scope.toolsSubMenu=function(item){
        $("."+item).show().siblings().hide();
        $scope.setMenuStatus('tool-tabs',item);
    };
    $scope.isPrint=false;
    $scope.isShowText=function(){
        if($("[name='print']").is(":checked")){
            $scope.isPrint=true;
        }
        else{
            $scope.isPrint=false;
        }
    };


    ////帮助
    //$scope.isHelp=false;
    //$scope.repairHelp=function(item){
    //    $scope.setMenuStatus('right-menu',item);
    //    pageService.Pdata.bjkCar=false;
    //    pageService.Pdata.ljcCar=false;
    //    pageService.Pdata.toolBox=false;
    //    $scope.repair=false;
    //    $scope.isHelp=!$scope.isHelp;
    //};

    //更换零件后的提示
    $scope.prompt = function(id){
        $timeout(function(){
            var promptTop = $(id).css('top');
            promptTop = promptTop > '200px' ? promptTop:'200px';
            var promptLeft = $(id).css('left');
            $('.prompt').show()
                .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'});
            $('.prompt').css({position:'absolute','left':promptLeft,'top':promptTop});
            if(id=='.t8a-body-install-hot'||id=='.t8b-body-install-hot'||id=='.t8c-body-install-hot'||id=='.t8d-body-install-hot'){
                $('.prompt').html("点火线圈已更换");
            }
            //if(id=='.t8a-body-install-hot'){
            //    $('.prompt').html("t8a点火线圈已更换");
            //}
            //if(id=='.t8b-body-install-hot'){
            //    $('.prompt').html("t8b点火线圈已更换");
            //}
            //if(id=='.t8c-body-install-hot'){
            //    $('.prompt').html("t8c点火线圈已更换");
            //}
            //if(id=='.t8d-body-install-hot'){
            //    $('.prompt').html("t8d点火线圈已更换");
            //}

            if(id=='.t8a-hhs-install-hot'||id=='.t8b-hhs-install-hot'||id=='.t8c-hhs-install-hot'||id=='.t8d-hhs-install-hot'){
                $('.prompt').html("火花塞已更换");
            }
            //if(id=='.t8a-hhs-install-hot'){
            //    $('.prompt').html("t8a点火线圈的火花塞已更换");
            //}
            //if(id=='.t8b-hhs-install-hot'){
            //    $('.prompt').html("t8b点火线圈的火花塞已更换");
            //}
            //if(id=='.t8c-hhs-install-hot'){
            //    $('.prompt').html("t8c点火线圈的火花塞已更换");
            //}
            //if(id=='.t8d-hhs-install-hot'){//t8dHhs-installHot
            //    $('.prompt').html("t8d点火线圈的火花塞已更换");
            //}
            $timeout(function(){
                $('.prompt').hide();
            },2000)
        },2000);

    };
    //线束插头打开
    $scope.ctOpen = function(id,num,href,z){
        if(/f\d{1,2}ua/ig.test(id)){
            pageService.Pdata.fuse_out=true;
        }
        if((id=="In1Sen_F31UA_Body_x_Install"||id=="In1Sen_F20UA_Body_x_Install"||id=="In1Sen_F12UA_Body_x_Install"||id=="In1Sen_F13UA_Body_x_Install"||id=="In1Sen_F14UA_Body_x_Install"||id=="In1Sen_F15UA_Body_x_Install")&&pageService.Pdata[z+'_cx']=='1'){
            xcjDataService.setHandle(pageService.Pdata.actionData[z].bjcId);
            xcjDataService.setHandle(pageService.Pdata.actionData[z].cId,'0','1');
            pageService.Pdata[z+'_cx']='2'
        }
        if((id=="In1Sen_K20_X1_x_Install"||id=="In1Sen_K20_X2_x_Install"||id=="In1Sen_K20_X3_x_Install")&&dashboardService.Dout.Out1Eng_x_EngSpeed_x_x >= 200){
            $('.prompt').show()
                .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                .css({position:'absolute','left':'348px','top':'361px'});
            $('.prompt').html("发动机运行状态下请勿拔下发动机模块插头");
            $timeout(function(){
                $('.prompt').hide();
            },2000)
        }else{
            pageService.Pint[id]='0';
            multimeterService.Mdata.rtnMultimeterPosition(num, href);
            var dragId=id.split('_').slice(1,2).toString().toLowerCase();
            $scope.onDragMove(dragId);
        }

    };
    //线束插头关闭
    $scope.ctClose = function(id,num,href,z){
        if(/f\d{1,2}ua/ig.test(id)){
            pageService.Pdata.fuse_out=false;
        }
        //15A保险丝拆卸
        if((id=="In1Sen_F31UA_Body_x_Install"||id=="In1Sen_F20UA_Body_x_Install"||id=="In1Sen_F12UA_Body_x_Install"||id=="In1Sen_F13UA_Body_x_Install"||id=="In1Sen_F14UA_Body_x_Install"||id=="In1Sen_F15UA_Body_x_Install")&&pageService.Pdata[z+'_cx']=='2'){
            xcjDataService.setHandle(pageService.Pdata.actionData[z].bjoId);
            xcjDataService.setHandle(pageService.Pdata.actionData[z].cId);
            pageService.Pdata[z+'_cx']='1'
        }
        //拆蓄电池正、负极
        if(dashboardService.Dint.In1IgnKey_x_ON_x_x== '1'||dashboardService.Dint.In1IgnKey_x_START_x_x== '1'){
            if(pageService.Pint.In1Sen_BATT_Pos_x_Install=='1'&&id=='In1Sen_BATT_Neg_x_Install'|| (pageService.Pint.In1Sen_BATT_Neg_x_Install=='1'&&id=='In1Sen_BATT_Pos_x_Install')){
                $(".pointer_oil").css({"transition":"transform 2s","transform":"rotate(110deg)"});
            }
        }
        pageService.Pint[id]='1';
        multimeterService.Mdata.rtnMultimeterPosition(num, href);
    };

    //点击点火线圈拔出
    $scope.dhxq_bc = function(id){

        $(id+'-head-out-hot').hide();
        $scope.onDragMove(id.substr(1));
        $(id+'-body-install-hot').hide();
        if(id=='.t8a'){
            $('.t8a-body-ls-install').hide();
            pageService.Pdata.t8a_body_ls = true;
            multimeterService.Mdata.rtnMultimeterPosition('1', 't8at8b');
            $('.t8a-body-ls-out').show()
                .animate({left:'-100px'},700,function(){});
            setTimeout(function () {
                $scope.$apply(dhxq_out(1));
            }, 200);
            setTimeout(function () {
                pageService.Pdata.t8a_body_zz = true;
            }, 300);
            setTimeout(function () {
                $scope.$apply(dhxq_ht('.t8a'))
            }, 350);
            setTimeout(function () {
                $(".t8a-body-out-process").animate({top: "27px"}, 1000,function(){
                    pageService.Pint.In1Sen_T8A_Coil_Body_Install='0';
                    $(".t8a-body-out-process").hide();
                    $(id+'-body-out-hot').show();
                });
            }, 1000);
            if(pageService.Pdata.bjdhxq_Install=='1'){
                xcjDataService.setHandle('ver369');//点火线圈备件拆卸
            }
        }
        if(id=='.t8b'){
            $('.t8b-body-ls-install').hide();
            pageService.Pdata.t8b_body_ls = true;
            multimeterService.Mdata.rtnMultimeterPosition('3', 't8at8b');
            $('.t8b-body-ls-out').show()
                .animate({left:'1100px'},700,function(){});
            setTimeout(function () {
                $scope.$apply(dhxq_out(2));
            }, 200);
            setTimeout(function () {
                pageService.Pdata.t8b_body_zz = true;
            }, 300);
            setTimeout(function () {
                $scope.$apply(dhxq_ht('.t8b'))
            }, 350);
            setTimeout(function () {
                $(".t8b-body-out-process").animate({top: "213px"},1000,function(){
                    pageService.Pint.In1Sen_T8B_Coil_Body_Install='0';
                    $(".t8b-body-out-process").hide();
                    $(id+'-body-out-hot').show();
                });
            }, 1000);
            if(pageService.Pdata.bjdhxq_Install=='2'){
                xcjDataService.setHandle('ver369');//点火线圈备件拆卸
            }
        }
        if(id=='.t8c'){
            $('.t8c-body-ls-install').hide();
            pageService.Pdata.t8c_body_ls = true;
            multimeterService.Mdata.rtnMultimeterPosition('1', 't8ct8d');
            $('.t8c-body-ls-out').show().animate({left:'-100px'},700,function(){});
            setTimeout(function () {
                $scope.$apply(dhxq_out(3));
            }, 200);
            setTimeout(function () {
                pageService.Pdata.t8c_body_zz = true;
            }, 300);
            setTimeout(function () {
                $scope.$apply(dhxq_ht('.t8c'))
            }, 350);
            setTimeout(function () {
                $(".t8c-body-out-process").animate({top: "57px"},1000,function(){
                    pageService.Pint.In1Sen_T8C_Coil_Body_Install='0';
                    $(".t8c-body-out-process").hide();
                    $(id+'-body-out-hot').show();
                });
                $(".t8c_out_zz").fadeOut(150);
            }, 1000);
            if(pageService.Pdata.bjdhxq_Install=='3'){
                xcjDataService.setHandle('ver369');//点火线圈备件拆卸
            }
        }
        if(id=='.t8d'){
            $('.t8d-body-ls-install').hide();
            pageService.Pdata.t8d_body_ls = true;
            multimeterService.Mdata.rtnMultimeterPosition('3', 't8ct8d');
            $('.t8d-body-ls-out').show().animate({left:'1100px'},700,function(){});
            setTimeout(function () {
                $scope.$apply(dhxq_out(4));
            }, 200);
            setTimeout(function () {
                pageService.Pdata.t8d_body_zz = true;
            }, 300);
            setTimeout(function () {
                $scope.$apply(dhxq_ht('.t8d'))
            }, 350);
            setTimeout(function () {
                $(".t8d-body-out-process").animate({top: "208"}, 1000,function(){
                    pageService.Pint.In1Sen_T8D_Coil_Body_Install='0';
                    $(".t8d-body-out-process").hide();
                    $(id+'-body-out-hot').show();
                });
                $(".t8d_out_zz").fadeOut(150);
            }, 1000);
            if(pageService.Pdata.bjdhxq_Install=='4'){
                xcjDataService.setHandle('ver369');//点火线圈备件拆卸
            }
        }
    };
    //点火线圈拔出的动效
    function dhxq_out(id) {
        if (id == 1) {
            $(".t8a-body-install").animate({
                top: "-300px",
                left: "220px",
                width: "442px",
                height: "525px"
            },200).animate({top: "-800px", left: "325px"}, 600);
        } else if (id == 2) {
            $(".t8b-body-install").animate({
                top: "-300px",
                left: "610px",
                width: "442px",
                height: "525px"
            },200).animate({top: "-800px", left: "755px"},600);
        } else if (id == 3) {
            $(".t8c-body-install").animate({
                top: "-300px",
                left: "150px",
                width: "442px",
                height: "525px"
            },200).animate({top: "-800px", left: "360px"},600);
        } else if (id == 4) {
            $(".t8d-body-install").animate({
                top: "-300px",
                left: "550px",
                width: "442px",
                height: "525px"
            },200).animate({top: "-800px", left: "680px"},600);
        }
    }
    //点火线圈拔出一点点就换图片啦
    function dhxq_ht(id) {
        $(id + "-body-install").css("background", "url('images/sbt_engine/dhxq/dhxq_body_out2.png') no-repeat");
    }


    //点火线圈插上
    $scope.dhxq_cs = function(id){
        $(id+'-body-out-hot').hide();
        $(id+'-body-out-process').css({top:'-400px'}).show();
        $timeout(function(){
            $(id+'-body-ls-out').hide();
            $(id+'-body-ls-install').show();
            $(id+'-head-out-hot').show();
        },1500);
        if(id=='.t8a'){
            pageService.Pint.In1Sen_T8A_Coil_Body_Install='1';
            $(id+'-body-install').css({width:'442px',height:'525px',top:'-800px',left:'325px',background:'url("images/sbt_engine/dhxq/dhxq_body_out2.png") no-repeat'});
            setTimeout(function(){
                $('.t8a-body-install').css("background","url('images/sbt_engine/dhxq/t8a_body_install.png') no-repeat");
            },660);
            setTimeout(function(){
                pageService.Pdata.t8a_body_zz = false;
            },660);
            $('.t8a-body-install').animate({
                top: "-300px",
                left: "220px"
            },600).animate({
                top: "101px",
                left: "123px",
                width: "461px",
                height: "285px"
            },200,function(){
                $(id+'-body-install-hot').show();
            });
            $timeout(function(){
                $('.t8a-body-ls-out').css({left:'-100px'}).show()
                    .animate({left:'337px'},700,function(){
                        $('.t8a-body-ls-install').show();
                        $('.t8a-body-ls-out').hide();
                        $(id+'-body-install-hot').show();
                        pageService.Pdata.t8a_body_ls = false;
                    })
            },800);
            if(pageService.Pdata.bjdhxq_Install=='1'){
                xcjDataService.setHandle('ver368');//点火线圈备件安装
            }

        }
        if(id=='.t8b'){
            pageService.Pint.In1Sen_T8B_Coil_Body_Install='1';
            $(id+'-body-install').css({width:'442px',height:'525px',top:'-800px',left:'755px',background:'url("images/sbt_engine/dhxq/dhxq_body_out2.png") no-repeat'});
            setTimeout(function(){
                $('.t8b-body-install').css("background","url('images/sbt_engine/dhxq/t8b_body_install.png') no-repeat");
            },660);
            setTimeout(function(){
                pageService.Pdata.t8b_body_zz = false;
            },660);
            $('.t8b-body-install').animate({
                top: "-300px",
                left: "610px"
            },600).animate({
                top: "70px",
                left: "586px",
                width: "419px",
                height: "311px"
            },200,function(){

            });
            $timeout(function(){
                $('.t8b-body-ls-out').css({left:'1100px'}).show()
                    .animate({left:'766px'},700,function(){
                        $('.t8b-body-ls-install').show();
                        $('.t8b-body-ls-out').hide();
                        $(id+'-body-install-hot').show();
                        pageService.Pdata.t8b_body_ls = false;
                    })
            },800);
            if(pageService.Pdata.bjdhxq_Install=='2'){
                xcjDataService.setHandle('ver368');//点火线圈备件安装
            }
        }
        if(id=='.t8c'){
            pageService.Pint.In1Sen_T8C_Coil_Body_Install='1';
            $(id+'-body-install').css({width:'442px',height:'525px',top:'-800px',left:'360px',background:'url("images/sbt_engine/dhxq/dhxq_body_out2.png") no-repeat'});
            setTimeout(function(){
                $('.t8c-body-install').css("background","url('images/sbt_engine/dhxq/t8c_body_install.png') no-repeat");
            },660);
            setTimeout(function(){
                pageService.Pdata.t8c_body_zz = false;
            },660);
            $('.t8c-body-install').animate({
                top: "-300px",
                left: "150px"
            },600).animate({
                top: "53px",
                left: "48px",
                width: "469px",
                height: "300px"
            },200,function(){

            });
            $timeout(function(){
                $('.t8c-body-ls-out').css({left:'-100px'}).show()
                    .animate({left:'270px'},700,function(){
                        $('.t8c-body-ls-install').show();
                        $('.t8c-body-ls-out').hide();
                        $(id+'-body-install-hot').show();
                        pageService.Pdata.t8c_body_ls = false;
                    })
            },800);
            if(pageService.Pdata.bjdhxq_Install=='3'){
                xcjDataService.setHandle('ver368');//点火线圈备件安装
            }
        }
        if(id=='.t8d'){
            pageService.Pint.In1Sen_T8D_Coil_Body_Install='1';
            $(id+'-body-install').css({width:'442px',height:'525px',top:'-800px',left:'680px',background:'url("images/sbt_engine/dhxq/dhxq_body_out2.png") no-repeat'});
            setTimeout(function(){
                $('.t8d-body-install').css("background","url('images/sbt_engine/dhxq/t8d_body_install.png') no-repeat");
            },660);
            setTimeout(function(){
                pageService.Pdata.t8d_body_zz = false;
            },660);
            $('.t8d-body-install').animate({
                top: "-300px",
                left: "550px"
            },600).animate({
                top: "59px",
                left: "520px",
                width: "429px",
                height: "328px"
            },200,function(){
                $('.t8d-body-ls-out').css({left:'1100px'}).show()
                    .animate({left:'693px'},700,function(){
                        $('.t8d-body-ls-install').show();
                        $('.t8d-body-ls-out').hide();
                        $(id+'-body-install-hot').show();
                        pageService.Pdata.t8d_body_ls = false;
                    })
            });
            if(pageService.Pdata.bjdhxq_Install=='4'){
                xcjDataService.setHandle('ver368');//点火线圈备件安装
            }
        }

    };

    //火花塞拔出
    pageService.hhs_bc = function(id){
        $scope.onDragMove(id+'_hhs');
        $('.'+id+'-hhs-install').hide();
        $('.'+id+'-hhs-install-hot').hide();
        $timeout(function(){
            $('.'+id+'-hhs-out-process').hide();
            $('.'+id+'-hhs-out').show();
            $('.'+id+'-hhs-out-hot').show();
        },1200);

        if(id=='t8a'){
            $('.t8a-hhs-out-process').show().animate({
                top:'20px'
            },200).animate({top:'316px',left:'380px'},1000,function(){
                pageService.Pint.In1Sen_T8A_SpPlug_Body_Install = '0';
            });
            if(pageService.Pdata.bjhhs_Install=='1'){
                xcjDataService.setHandle('ver371');//火花塞备件备件拆卸
            }
        }
        if(id=='t8b'){
            $('.t8b-hhs-out-process').show().animate({
                top:'7px'
            },200).animate({top:'300px',left:'770px'},1000,function(){
                pageService.Pint.In1Sen_T8B_SpPlug_Body_Install = '0';
            });
            if(pageService.Pdata.bjhhs_Install=='2'){
                xcjDataService.setHandle('ver371');//火花塞备件备件拆卸
            }
        }
        if(id=='t8c'){
            $('.t8c-hhs-out-process').show().animate({
                top:'25px'
            },200).animate({top:'316px',left:'313px'},1000,function(){
                pageService.Pint.In1Sen_T8C_SpPlug_Body_Install = '0';
            });
            if(pageService.Pdata.bjhhs_Install=='3'){
                xcjDataService.setHandle('ver371');//火花塞备件备件拆卸
            }
        }
        if(id=='t8d'){
            $('.t8d-hhs-out-process').show().animate({
                top:'3px'
            },200).animate({top:'300px',left:'714px'},1000,function(){
                pageService.Pint.In1Sen_T8D_SpPlug_Body_Install = '0';
            });
            if(pageService.Pdata.bjhhs_Install=='4'){
                xcjDataService.setHandle('ver371');//火花塞备件备件拆卸
            }
        }
    };

    //火花塞插上
    $scope.hhs_cs = function(id){
        if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
            $('.'+id+'-hhs-out').hide();
            $('.'+id+'-hhs-out-hot').hide();
            $timeout(function(){
                $('.'+id+'-hhs-out-process').hide();
                $('.'+id+'-hhs-install').show();
                $('.'+id+'-hhs-install-hot').show();
            },1200);
            if(id=='t8a'){
                $('.t8a-hhs-out-process').show().css({top:'316px',left:'380px'}).animate({
                    top:'20px',left:'403px'
                },1000).animate({top:'40px'},200,function(){
                    pageService.Pint.In1Sen_T8A_SpPlug_Body_Install = '1';
                });
                if(pageService.Pdata.bjhhs_Install=='1'){
                    xcjDataService.setHandle('ver370');//火花塞备件备件安装
                }
            }
            if(id=='t8b'){
                $('.t8b-hhs-out-process').show().css({top:'300px',left:'770px'}).animate({
                    top:'7px',left:'793px'
                },1000).animate({top:'27px'},200,function(){
                    pageService.Pint.In1Sen_T8B_SpPlug_Body_Install = '1';
                });
                if(pageService.Pdata.bjhhs_Install=='2'){
                    xcjDataService.setHandle('ver370');//火花塞备件备件安装
                }
            }
            if(id=='t8c'){
                $('.t8c-hhs-out-process').show().css({top:'316px',left:'313px'}).animate({
                    top:'25px',left:'336px'
                },1000).animate({top:'45px'},200,function(){
                    pageService.Pint.In1Sen_T8C_SpPlug_Body_Install = '1';
                });
                if(pageService.Pdata.bjhhs_Install=='3'){
                    xcjDataService.setHandle('ver370');//火花塞备件备件安装
                }
            }if(id=='t8d'){
                $('.t8d-hhs-out-process').show().css({top:'300px',left:'714px'}).animate({
                    top:'3px',left:'737px'
                },1000).animate({top:'33px'},200,function(){
                    pageService.Pint.In1Sen_T8D_SpPlug_Body_Install = '1';
                });
                if(pageService.Pdata.bjhhs_Install=='4'){
                    xcjDataService.setHandle('ver370');//火花塞备件备件安装
                }
            }
        }else{
            $('.prompt').show()
                .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'});
            if(id=='t8a'){
                $('.prompt').css({position:'absolute','left':'348px','top':'211px'});
            }
            if(id=='t8b'){
                $('.prompt').css({position:'absolute','left':'741px','top':'201px'});
            }
            if(id=='t8c'){
                $('.prompt').css({position:'absolute','left':'277px','top':'207px'});
            }
            if(id=='t8d'){
                $('.prompt').css({position:'absolute','left':'679px','top':'201px'});
            }
            $('.prompt').html("发动机运行状态下请勿安装火花塞");
            $timeout(function(){
                $('.prompt').hide();
            },2000)
        }

    };

    //跳到二极管试灯灯笔所在页面
    $scope.diodelampBack = function(href){
        if(href!=null){
            $state.go(href);
            if(diodelampService.Odata.diodelampStatus){
                if(diodelampService.Odata.diodelamp_Html==href||diodelampService.Odata.diodelamp_Html==null){
                    diodelampService.Odata.diodelamp_pen = true;
                }else{
                    diodelampService.Odata.diodelamp_pen = false;
                }
            }
            $timeout(function(){ multimeterService.Mdata.freshHontspot();},100)
        }
    };

    //缸压表关闭
    $scope.closeGYB = function(id){
        xcjDataService.setHandle('ver379');
        cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '0';
        cylpressguageService.Odata.gybzz = '0';
        pageService.Pdata.gybwz=0;
        $('.gangYaBiao-pointer').css('transform','rotate(0deg)');
        $("#cylpressguage").attr("src","images/cylinder.png");
        cylpressguageService.Odata.cylpressguagehide1();
    };
    //点火测试仪关闭
    $scope.testHide=function(id){
        ignltionTestDeviceService.Odata.ignltionTestDeviceTest=false;
        pageService.Pdata[id+"_test"]=false;
        dashboardService.Dint.In1Eng_x_SpPlugTest_x_x = '0';
        if(id=='t8a'){
            pageService.Pint.In1Sen_T8A_Coil_x_Install = '0';
            pageService.Pint.In1Sen_T8A_Coil_Body_Install = '0';
        }
        if(id=='t8b'){
            pageService.Pint.In1Sen_T8B_Coil_x_Install = '0';
            pageService.Pint.In1Sen_T8B_Coil_Body_Install = '0';
        }
        if(id=='t8c'){
            pageService.Pint.In1Sen_T8C_Coil_Conn_Install = '0';
            pageService.Pint.In1Sen_T8C_Coil_Body_Install = '0';
        }
        if(id=='t8d'){
            pageService.Pint.In1Sen_T8D_Coil_Conn_Install = '0';
            pageService.Pint.In1Sen_T8D_Coil_Body_Install = '0';
        }

    };

    //机油尺拔出动画
    $scope.oliFootOut=function(){
        $('.oliFoot-head').animate({top:'-105px'},1000);
        $('.oliFoot-head').animate({left:'690px'},1000);
        $('.oliFoot-head').animate({top:'28px'},1000,function(){
            pageService.Pdata.oliFoot=true;
            $('.oliFoot-head').css({'top':'249px','left':'490px'});
        });
    };
    $scope.oliFootInstall=function(){
        $('.oliFoot-head-out').animate({top:'-105px'},1000);
        $('.oliFoot-head-out').animate({left:'490px'},1000);
        $('.oliFoot-head-out').animate({top:'246px'},1000,function(){
            pageService.Pdata.oliFoot=false;
            $('.oliFoot-head-out').css({'top':'28px','left':'690px'});
        });
        $scope.addAction('ver002');
    };
    //
    $scope.sameFuseDefault=function(fault){
        var faultParam=pageService.Pdata.fault[fault].change;
        pageService.Pdata.faultId="";
        if(fault=="SBT_VER_ES_ES_011_FAULT"||fault=="SBT_VER_ES_ES_012_FAULT"||fault=="SBT_VER_ES_ES_013_FAULT"||fault=="SBT_VER_ES_ES_014_FAULT"){
            pageService.Pdata.faultId=faultParam.split('_')[0];
            $scope.faultObj={f12ua:"SBT_VER_ES_ES_011_FAULT",f13ua:"SBT_VER_ES_ES_012_FAULT",f14ua:"SBT_VER_ES_ES_013_FAULT",f15ua:"SBT_VER_ES_ES_014_FAULT"};
        }
    };
    //监听故障
    $scope.watchFault=function(fault){
        var faultParam=pageService.Pdata.fault[fault].change;
        var faultPlace=pageService.Pdata.fault[fault].gzcs;
        pageService.Pint[faultPlace]='0';
        $scope.$watch(function(){
            return pageService.Pdata[faultParam] ;
        },function(oldValue,newValue,scope){
            if(newValue != oldValue){
                if(pageService.Pdata[faultParam]){
                    pageService.Pint[faultPlace]='1';
                }else{
                    pageService.Pint[faultPlace]='0';
                }
            }
        })
    };
    $scope.watchFault(xcjDataService.faultType);
    $scope.sameFuseDefault(xcjDataService.faultType);
});