allsensorModule.service('eventService', function ($timeout,$interval,pageService,ignltionTestDeviceService,dashboardService,xcjDataService,cylpressguageService,diodelampService,multimeterService,sataService) {
    var eventService={};

    //显示弹框
    eventService.showMsg=function(id,msg){
        var _top=$("#"+id).css("top");
        var _left=$("#"+id).css("left");
        if(parseFloat(_top)<200){
            _top=250+"px";
        }
        $('.replaceLineMsg').css({"top":_top,"left":_left}).html(msg).show();
        $timeout(function(){
            $('.replaceLineMsg').hide();
        },2000);
    };

    //部件拖动
    var ljcNum,imgId;
    eventService.onDragMove=function(id){
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
            accept: "#t8a,#t8b,#t8c,#t8d,#t8a_hhs,#t8b_hhs,#t8c_hhs,#t8d_hhs,#f12ua,#f13ua,#f14ua,#f15ua,#f31ua,#f20ua,#f36ua,#f18ua,#f57ua,#kr42r,#kr42l,#kr48,#kr27,#f5da,#f11da,#f14da,#f31da,#f32da,#f8da,#f8ua,#f3ua",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var html = "",myId="";
                var dom = $("#ljcBox li:empty")[0];

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

                }else if(id=="f12ua"||id=="f13ua"||id=="f14ua"||id=="f15ua"||id=="f8ua"){
                    //if(imgId=='hhs'&&pageService.Pdata.bjhhs_Install!=0){
                    //    pageService.Pdata.bjhhs_Install=0;
                    //}
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
                        ljcNum=pageService.Pdata.ljName[id];
                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_f12ua.png' height='62'  width='62'/>";
                    pageService.Pdata[id+"_out"]=false;
                }else if(id=='kr42l'||id=='kr42r'){
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum="日间行车灯继电器（备件）";
                        if(/bj/.test(ui.helper.attr('tag'))){
                            newId=ui.helper.attr('tag')
                        }else{
                            newId="bj"+ui.helper.attr('tag');
                        }
                        pageService.Pdata[id+"_bjOn"]=false;
                    }else{
                        if(ui.helper.attr('tag')){
                            newId=ui.helper.attr('tag');
                            ljcNum=pageService.Pdata.ljName[newId];

                        }else{
                            ljcNum=pageService.Pdata.ljName[id];
                        }

                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_kr42.png' height='62'  width='62'/>";
                    pageService.Pdata[id+"_out"]=false;
                }else if(id=='f31ua'||id=='f36ua'||id=='f8da'){
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum="7.5A保险丝（备件）";
                        if(/bj/.test(ui.helper.attr('tag'))){
                            newId=ui.helper.attr('tag')
                        }else{
                            newId="bj"+ui.helper.attr('tag');
                        }
                        pageService.Pdata[id+"_bjOn"]=false;
                    }else{
                        if(ui.helper.attr('tag')){
                            newId=ui.helper.attr('tag');
                            myId=newId.split('_')[1];
                            ljcNum=pageService.Pdata.ljName[myId];
                        }else{
                            ljcNum=pageService.Pdata.ljName[id];
                        }

                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_f31ua.png' height='62'  width='62'/>";
                    pageService.Pdata[id+"_out"]=false;
                }else if(id=='f3ua'||id=='f18ua'||id=='f5da'||id=='f11da'){
                    var aa=
                        console.log('pageService.Pint.In1Veh_'+id.toString().toLocaleUpperCase()+'_Body_x_Install');
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum="30A保险丝（备件）";
                        if(/bj/.test(ui.helper.attr('tag'))){
                            newId=ui.helper.attr('tag')
                        }else{
                            newId="bj"+ui.helper.attr('tag');
                        }
                        pageService.Pdata[id+"_bjOn"]=false;
                    }else{
                        if(ui.helper.attr('tag')){
                            newId=ui.helper.attr('tag');
                            myId=newId.split('_')[1];
                            ljcNum=pageService.Pdata.ljName[myId];
                        }else{
                            ljcNum=pageService.Pdata.ljName[id];
                        }

                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_f3ua.png' height='62'  width='62'/>";
                    console.log('pageService.Pint.In1Veh_'+id.toString().toLocaleUpperCase()+'_Body_x_Install');
                    pageService.Pdata[id+"_out"]=false;
                }else if(id=='f32da'||id=='f31da'){
                    if(pageService.Pdata[id+"_bjOn"]){
                        ljcNum="20A保险丝（备件）";
                        if(/bj/.test(ui.helper.attr('tag'))){
                            newId=ui.helper.attr('tag')
                        }else{
                            newId="bj"+ui.helper.attr('tag');
                        }
                        pageService.Pdata[id+"_bjOn"]=false;
                    }else{
                        if(ui.helper.attr('tag')){
                            newId=ui.helper.attr('tag');
                            myId=newId.split('_')[1];
                            ljcNum=pageService.Pdata.ljName[myId];
                        }else{
                            ljcNum=pageService.Pdata.ljName[id];
                        }
                    }
                    html+="<img id='ljc_"+newId+"' src='images/bjk/bj_20a.png' height='62'  width='62'/>";
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
                eventService.ljcJump();
                $($("#ljcBox li:empty")[0]).html(html);
                $($("#ljcBox li:empty")[0]).attr('title',ljcNum);
                eventService.ljcDragMove("ljc_"+imgId);
                eventService.ljcDragMove("ljc_"+newId);
            }
        });

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
                    eventService.replaceFuse(id,id,false);
                    pageService.Pdata[id]=false;
                }
                if(pageService.Pdata[id+"_bjOn"]){
                    eventService.replaceFuse(id,'bj'+id,true);
                }
                if(/bj/.test(ui.helper.context.id)){
                    pageService.Pdata[id+"_bjOn"]=true;
                }else{
                    pageService.Pdata[id+"_bjOn"]=false;
                    pageService.Pdata[id]=true;
                }
                if(/bj-/.test(ui.helper.context.id)){
                    msg='已更换';
                }else{
                    msg='已安装';
                }
                if(id=='f14da'){
                    pageService.Pdata.csFuse_out=false;
                }else{
                    pageService.Pdata.fuse_out=false;
                }
                pageService.Pdata[id+'_out']=true;
                var _id=id.toUpperCase();

                if(id=='f18ua'||id=='f57ua'||id=='f14da'){
          pageService.Pint['In1Veh_'+_id+'_Body_x_Install']="1";
                }else if(id=='kr48'){
       pageService.Pint["In1Veh_"+_id+"_Conn_x_Install"]="1";
                }else if(id=='kr27'){
   pageService.Pint["In1Sen_"+_id+"_Conn_x_Install"]="1";
                } else{
                    pageService.Pint["In1Sen_"+_id+"_Body_x_Install"]="1";
                }

                eventService.showMsg(id,pageService.Pdata.ljName[id]+msg);
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
                    xcjDataService.setHandle(pageService.Pdata.actionData[id].bjoId);
                    pageService.Pdata[id+'_cx']='1';
                }
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
                    eventService.replaceFuse(rId,rId,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    eventService.replaceFuse(rId,"bj"+rId,true);
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId=="ljc_f31da"||dragId=="ljc_f32da"){
                    pageService.Pdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg=pageService.Pdata.ljName[rId]+'已更换';
                }else{
                    msg=pageService.Pdata.ljName[rId]+'已安装';
                }
                var _id=rId.toUpperCase();
                pageService.Pdata.csFuse_out=false;
                pageService.Pdata[rId+"_out"]=true;
                pageService.Pdata[rId]=true;
                pageService.Pint["In1Veh_"+_id+"_Body_x_Install"]="1";
                if(rId!==trueId){
                    $("#"+rId).attr("tag",trueId);
                }
                eventService.showMsg(id,msg);
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
                    pageService.Pdata[id+'_cx']='1';
                }
            }
        });
        $(".bjz-f31ua").droppable({
            zIndex: 100,
            tolerance: "pointer",
            accept: "#bj-f31ua,#ljc_f31ua,#ljc_bjf31ua,#ljc_f36ua,#ljc_bjf36ua,#ljc_f8da,#ljc_bjf8da,#bj-f8da",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var id=this.id,msg="";
                var rId=id.split("-").slice(1,2).toString();
                var dragId=ui.helper.context.id;
                var trueId=dragId.split("_").slice(1,2).toString();

                $("#"+ui.helper.context.id).remove();
                if(pageService.Pdata[rId]&&!pageService.Pdata[rId + "_bjOn"]&&pageService.Pdata[rId + "_out"]){
                    eventService.replaceFuse(rId,rId,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    eventService.replaceFuse(rId,"bj"+rId,true);
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId=="ljc_f31ua"||dragId=="ljc_f36ua"||dragId=="ljc_f8da"){
                    pageService.Pdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg=pageService.Pdata.ljName[rId]+'已更换';
                }else{
                    msg=pageService.Pdata.ljName[rId]+'已安装';
                }
                var _id=rId.toUpperCase();
                if(rId=='f8da'){
                    pageService.Pdata.csFuse_out=false;
                }else{
                    pageService.Pdata.fuse_out=false;
                }

                pageService.Pdata[rId+"_out"]=true;
                pageService.Pdata[rId]=true;
                if(_id=='F8DA'){
pageService.Pint["In1Veh_"+_id+"_Body_x_Install"]="1";
                }else{
pageService.Pint["In1Sen_"+_id+"_Body_x_Install"]="1";
                }

                if(rId!==trueId&&!/bj/.test(ui.helper.context.id)){
                    $("#"+rId).attr("tag",trueId);
                }
                eventService.showMsg(id,msg);
            }
        });
        $(".bjz-f3ua").droppable({
            zIndex: 100,
            tolerance: "pointer",
            accept: "#bj-f3ua,#ljc_f3ua,#ljc_bjf3ua,#ljc_f18ua,#ljc_bjf18ua,#ljc_f5da,#ljc_f11da,#bj-f5da,#ljc_bjf5da,#ljc_bjf11da",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var id=this.id,msg="";
                var rId=id.split("-").slice(1,2).toString();
                var dragId=ui.helper.context.id;
                var trueId=dragId.split("_").slice(1,2).toString();

                $("#"+ui.helper.context.id).remove();
                if(pageService.Pdata[rId]&&!pageService.Pdata[rId + "_bjOn"]&&pageService.Pdata[rId + "_out"]){
                    eventService.replaceFuse(rId,rId,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    eventService.replaceFuse(rId,"bj"+rId,true);
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId.length=="9"||dragId.length=="8"){
                    pageService.Pdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg=pageService.Pdata.ljName[rId]+'已更换';
                }else{
                    msg=pageService.Pdata.ljName[rId]+'已安装';
                }
                var _id=rId.toUpperCase();
                if(rId=='f5da'||rId=='f11da'){
                    pageService.Pdata.csFuse_out=false;
                }else{
                    pageService.Pdata.fuse_out=false;
                }
                pageService.Pdata[rId+"_out"]=true;
                pageService.Pdata[rId]=true;
                if(rId=='f18ua'||rId=='f5da'||rId=='f11da'){
pageService.Pint["In1Veh_"+_id+"_Body_x_Install"]="1";
                }else{
pageService.Pint["In1Sen_"+_id+"_Body_x_Install"]="1";
                }
                if(rId!==trueId&&!/bj/.test(ui.helper.context.id)){
                    $("#"+rId).attr("tag",trueId);
                }
                eventService.showMsg(id,msg);
            }
        });
        $(".bjz-kr42").droppable({
            zIndex: 100,
            tolerance: "pointer",
            accept: "#bj-kr42,#ljc_kr42l,#ljc_bjkr42l,#ljc_kr42r,#ljc_bjkr42r",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var id=this.id,msg="";
                var rId=id.split("-").slice(1,2).toString();
                var dragId=ui.helper.context.id;
                var trueId=dragId.split("_").slice(1,2).toString();

                $("#"+ui.helper.context.id).remove();
                if(pageService.Pdata[rId]&&!pageService.Pdata[rId + "_bjOn"]&&pageService.Pdata[rId + "_out"]){
                    eventService.replaceFuse(rId,rId,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    eventService.replaceFuse(rId,"bj"+rId,true);
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId.length=="9"){
                    eventService.pageServicePdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg=pageService.Pdata.ljName[rId]+'已更换';
                }else{
                    msg=pageService.Pdata.ljName[rId]+'已安装';
                }
                var _id=rId.toUpperCase();
                if(rId!=trueId&&!/bj/.test(ui.helper.context.id)){
                    $("#"+rId).attr("tag",trueId);
                }
                pageService.Pdata.fuse_out=false;
                pageService.Pdata[rId+"_out"]=true;
                pageService.Pdata[rId]=true;
                pageService.Pint["In1Veh_"+_id+"_Conn_x_Install"]="1";
                eventService.showMsg(id,msg);
            }
        });
        $(".bjz-f12ua").droppable({
            zIndex: 100,
            tolerance: "pointer",
            accept: "#bj_f12ua,#ljc_f12ua,#ljc_f13ua,#ljc_f14ua,#ljc_f15ua,#ljc_bjf12ua,#ljc_bjf13ua,#ljc_bjf14ua,#ljc_bjf15ua,#ljc_f8ua,#ljc_bjf8ua",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var id=this.id,msg="";
                var rId=id.split("-").slice(1,2).toString();
                var dragId=ui.helper.context.id;
                var trueId=dragId.split("_").slice(1,2).toString();

                $("#"+ui.helper.context.id).remove();
                if(pageService.Pdata[rId]&&!pageService.Pdata[rId + "_bjOn"]&&pageService.Pdata[rId + "_out"]){
                    eventService.replaceFuse(rId,rId,false);
                }
                if(pageService.Pdata[rId + "_bjOn"]){
                    eventService.replaceFuse(rId,"bj"+rId,true);
                    pageService.Pdata[rId + "_bjOn"]=false;
                }
                if(dragId.length=="9"){
                    pageService.Pdata[trueId]=true;
                }
                if(/bj/.test(ui.helper.context.id)) {
                    pageService.Pdata[rId + "_bjOn"] = true
                }
                if(/bj_/.test(ui.helper.context.id)){
                    msg=pageService.Pdata.ljName[trueId]+'已更换';
                }else{
                    msg=pageService.Pdata.ljName[trueId]+'已安装';
                }
                var _fid=rId.toUpperCase();
                if(rId!==trueId&&!/bj/.test(ui.helper.context.id)){
                    $("#"+rId).attr("tag",trueId);
                }
                pageService.Pdata.fuse_out=false;
                pageService.Pdata[rId+"_out"]=true;
                pageService.Pdata[rId]=true;

                if(rId=='f8ua'){
                    pageService.Pint.In1Veh_F8UA_Body_x_Install="1";
                }else{
 pageService.Pint["In1Sen_"+_id+"_Body_x_Install"]="1";
                }

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
                    pageService.Pdata[id+'_cx']='1';
                }

            }
        });

    };
//零件车跳页问题
    eventService.ljcJump = function(){
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
    //初始化各零件可拖放
    eventService.initComponentDrop=function(id){
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
                        eventService.dhxq_bc('.'+id);
                    }else{
                        eventService.showMsg("msg-"+id,"请选择合适的工具");
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
                                eventService.ctOpen('In1Sen_BATT_'+id+'_x_Install','2','bt-left');
                            }
                            if(id=="Neg"){
                                eventService.ctOpen('In1Sen_BATT_'+id+'_x_Install','4','bt-left');
                            }
                        }else{
                            eventService.showMsg("msg-"+id,"请选择合适的工具");
                        }
//油箱油量指针旋转
                        $(".pointer_oil").css("transform","rotate(0deg)");
                    }
                }else{
                    eventService.withDrawalTool(id);

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
                eventService.changeComponent(id,ui.helper.context.id,pageService.Pdata.ljName[id]);
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
                eventService.ljcJump();
                if(/bj/.test(ui.helper.context.id)){

                    html="<img id='ljc_line' src='images/bjk/bj_line.png' height='62'  width='62' title='发动机线束' />";

                    $($("#ljcBox li:empty")[0]).html(html);
                    eventService.ljcDragMove("ljc_line");
                }else{
                    html="<img id='ljc_bjline' src='images/bjk/bj_line.png' height='62'  width='62' title='发动机线束(备件)' />";
                    $($("#ljcBox li:empty")[0]).html(html);
                    eventService.ljcDragMove("ljc_bjline");
                }

                eventService.replaceLine(this.id);
            }

        });
        $(".absline").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: "#bj-absline,#ljc_absline,#ljc_bjabsline",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var dom,html;
                $('#'+ui.helper.context.id).remove();
                if(ui.helper.context.id == 'bj-absline'){
                    pageService.Pdata.absline_bjOn = true;
                    xcjDataService.setHandle('ver831');//更换发动机线束
                }else if(ui.helper.context.id == 'ljc_bjabsline'){
                    pageService.Pdata.absline_bjOn = true;
                    xcjDataService.setHandle('ver831')
                }else if(ui.helper.context.id == 'ljc_absline'){
                    pageService.Pdata.absline_bjOn = false;
                    xcjDataService.setHandle('ver831','1');
                }
                eventService.ljcJump();
                if(/bj/.test(ui.helper.context.id)){
                    dom = $("#ljcBox li:empty")[0];
                    html="<img id='ljc_absline' src='images/bjk/bj_absline.png' height='62'  width='62' title='ABS线束' />";
                    $(dom).html(html);
                    eventService.ljcDragMove("ljc_absline");
                }else{
                    dom = $("#ljcBox li:empty")[0];
                    html="<img id='ljc_bjabsline' src='images/bjk/bj_absline.png' height='62'  width='62' title='ABS线束(备件)' />";
                    $(dom).html(html);
                    eventService.ljcDragMove("ljc_bjabsline");
                }
                eventService.replaceLine(this.id);
            }

        });
        $(".csline").droppable({
            tolerance: "touch",
            zIndex: 100,
            accept: "#bj-cs-line,#ljc_cs_line,#ljc_cs_bjline",
            over: function (event, ui) {

            },
            out: function (event, ui) {

            },
            drop: function (event, ui) {
                var dom,html;
                $('#'+ui.helper.context.id).remove();
                if(ui.helper.context.id == 'bj-csline'){
                    pageService.Pdata.csline_bjOn = true;
                    xcjDataService.setHandle('ver830');//更换发动机线束
                }else if(ui.helper.context.id == 'ljc_bjcsline'){
                    pageService.Pdata.csline_bjOn = true;
                    xcjDataService.setHandle('ver830')
                }else if(ui.helper.context.id == 'ljc_csline'){
                    pageService.Pdata.csline_bjOn = false;
                    xcjDataService.setHandle('ver830','1');
                }
                eventService.ljcJump();
                if(/bj/.test(ui.helper.context.id)){
                    dom = $("#ljcBox li:empty")[0];
                    html="<img id='ljc_cs_line' src='images/bjk/bj_cs_line.png' height='62'  width='62' title='车身线束' />";
                    $(dom).html(html);
                    eventService.ljcDragMove("ljc_cs_line");
                }else{
                    dom = $("#ljcBox li:empty")[0];
                    html="<img id='ljc_cs_bjline' src='images/bjk/bj_cs_line.png' height='62'  width='62' title='车身线束(备件)' />";
                    $(dom).html(html);
                    eventService.ljcDragMove("ljc_cs_bjline");
                }
                eventService.replaceLine(this.id);
            }

        });
    };

    //更换保险丝，如果保险丝未放入零件车
    eventService.replaceFuse=function(id,name,index){
        var html = "",title=pageService.Pdata.ljName[id];
        if(index){
            title=pageService.Pdata.ljName[id]+"(备件)";
        }
        var dom = $("#ljcBox li:empty")[0];
        if(id=="f12ua"||id=="f13ua"||id=="f14ua"||id=="f15ua"||id=='f8ua'){
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_f12ua.png' height='62'  width='62' title='"+title+"' />";
        }else if(id=='kr42r'||id=='kr42l') {
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_kr42.png' height='62'  width='62' title='"+title+"' />";
        }else if(id=='f31ua'||id=='f36ua'||id=='f8da') {
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_f31ua.png' height='62'  width='62' title='"+title+"' />";
        }else if(id=='f3ua'||id=='f18ua'||id=='f5da'||id=='f11da') {
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_f3ua.png' height='62'  width='62' title='"+title+"' />";
        } else if(id=='f31da'||id=='f32da'){
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_20a.png' height='62'  width='62' title='"+title+"' />";
        }else {
            html+="<img id='ljc_"+name+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='"+title+"' />";
        }
        pageService.Pdata.fuse_out=false;
        eventService.ljcJump();
        $(dom).html(html);
        eventService.ljcDragMove("ljc_"+name);
    };

    //更换线束
    eventService.replaceLine=function(Id) {
        var times1= $interval(function(){$("[status='"+Id+"']").show();},500);
        var times2= $interval(function(){$("[status='"+Id+"']").hide();},700);
        $timeout(function() {
            $interval.cancel(times1);
            $interval.cancel(times2);
            eventService.showMsg(Id,"线束已更换");
        },2300)
    };

    //零件拆卸,用于世达工具拆卸
    eventService.withDrawalTool=function(id){
        var ary=$("#msg-"+id).attr("sata").split("-");
        var dom=$("#ljcBox li:empty")[0];
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
            eventService.ljcJump();
            $(dom).html(html);
            pageService.Pdata[id+"_tearDown"]=false;
            eventService.ljcDragMove("ljc_"+newId);
            eventService.showMsg("msg-"+id,name+"已拆卸");
        }else if(id=="q22"||id=="q12"||id=="k20"){
            $scope.showMsg("msg-"+id,"请直接点击拆除");
        }else{
            eventService.showMsg("msg-"+id,"请选择合适的工具");
        }
    };

    //用于氧传感器拆卸
    eventService.inLjc=function(id,name){
        eventService.ljcDragMove("ljc_"+id);
        eventService.showMsg("mg-"+id,name+"已拆卸");
    };

    //拆卸q12和k20，用于点击拆卸插座体
    eventService.tearDownBody=function(id,num,href){
        multimeterService.Mdata.rtnMultimeterPosition(num,href);
        var dom=$("#ljcBox li:empty")[0];
        var name=pageService.Pdata.ljName[id];
        var newId=id,html="";
        if(pageService.Pdata[id+"_bjOn"]) {
            html += "<img id='ljc_bj" + id + "' src='images/bjk/bj_" + id + ".png' height='62'  width='62' title='" + name + "(备件)'/>";
            pageService.Pdata[id + "_bjOn"] = false;
            newId = "bj" + id;
        }else{
            html+="<img id='ljc_"+id+"' src='images/bjk/bj_"+id+".png' height='62'  width='62' title='" + name + "'/>";
        }
        eventService.ljcJump();
        $(dom).html(html);
        pageService.Pdata[id+"_tearDown"]=false;
        eventService.ljcDragMove("ljc_"+newId);
        eventService.showMsg("msg-"+id,name+"已拆卸");
        if(pageService.Pdata[id+'_cx'] == '1'){
            xcjDataService.setHandle(pageService.Pdata.actionData[id].bjcId);
            xcjDataService.setHandle(pageService.Pdata.actionData[id].cId,'0','1');
            pageService.Pdata[id+'_cx'] = '0';
        }

    };

    //零件车中零件的拖动
    eventService.ljcDragMove=function(id) {
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
                var t8aId;
                pageService.Pdata.t8a_num = ljcNum;
                pageService.Pdata.t8a_imgId = imgId;

                $('#msg-t8a').attr('title',ljcNum);
                eventService.dhxq_cs('.t8a');
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8a=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    eventService.prompt(".t8a-body-install-hot");
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
                    eventService.hhs_cs('t8a');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8a_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        eventService.prompt(".t8a-hhs-install-hot");
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
                eventService.dhxq_cs('.t8b');
                pageService.Pdata.t8b_num = ljcNum;
                pageService.Pdata.t8b_imgId = imgId;
                $('#msg-t8b').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8b=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    eventService.prompt(".t8b-body-install-hot");
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
                    eventService.hhs_cs('t8b');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8b_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        eventService.prompt(".t8b-hhs-install-hot");
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
                eventService.dhxq_cs('.t8c');
                pageService.Pdata.t8c_num = ljcNum;
                pageService.Pdata.t8c_imgId = imgId;
                $('#msg-t8c').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8c=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    eventService.prompt(".t8c-body-install-hot");
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
                    eventService.hhs_cs('t8c');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8c_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        eventService.prompt(".t8c-hhs-install-hot");
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
                eventService.dhxq_cs('.t8d');
                pageService.Pdata.t8d_num = ljcNum;
                pageService.Pdata.t8d_imgId = imgId;
                $('#msg-t8d').attr('title',ljcNum);
                $("#" + ui.helper.context.id).siblings().remove();
                $("#" + ui.helper.context.id).remove();
                //$("[num=" + ui.helper.context.id + "]").remove();
                pageService.Pdata.t8d=true;
                if(ui.helper.context.id=='bj-t8abcd'){
                    pageService.Pdata.onDrag=true;
                    eventService.prompt(".t8d-body-install-hot");
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
                    eventService.hhs_cs('t8d');
                    $("#" + ui.helper.context.id).siblings().remove();
                    $("#" + ui.helper.context.id).remove();
                    pageService.Pdata.t8d_hhs=true;
                    if(ui.helper.context.id=='bj-hhs'){
                        pageService.Pdata.onDrag=true;
                        eventService.prompt(".t8d-hhs-install-hot");
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
    eventService.changeComponent=function(name,id,msg){
        if(/bj/.test(id)){
            pageService.Pdata[name+"_bjOn"]=true;
        }
        pageService.Pdata[name+"_tearDown"]=true;
        $("#"+id).remove();
        if(/bj-/.test(id)){
            msg+="已更换";
        }else{
            msg+="已安装";
        }
        eventService.showMsg(id,msg);
    };

    //初始化备件库部件
    eventService.initDrag=function(str){
        $.each($("."+str+" li"),function(i,u){
            if($(u).find("img").attr("id")){
                eventService.onDragMove($(u).find("img").attr("id"));
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

    //更换零件后的提示
    eventService.prompt = function(id){
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
    eventService.ctOpen = function(id,num,href,z){
        if(/f\d{1,2}ua/ig.test(id)||/kr\d{1,2}/ig.test(id)){
            pageService.Pdata.fuse_out=true;
        }else if(/f\d{1,2}da/ig.test(id)){
            pageService.Pdata.csFuse_out=true;
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
            eventService.onDragMove(dragId);
        }

    };

    //线束插头关闭
    eventService.ctClose = function(id,num,href,z){
        if(/f\d{1,2}ua/ig.test(id)||/kr\d{1,2}/ig.test(id)){
            pageService.Pdata.fuse_out=false;
        }else if(/f\d{1,2}da/ig.test(id)){
            pageService.Pdata.csFuse_out=false;
        }
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
    eventService.dhxq_bc = function(id){
        $(id+'-head-out-hot').hide();
        eventService.onDragMove(id.substr(1));
        $(id+'-body-install-hot').hide();
        if(id=='.t8a'){
            $('.t8a-body-ls-install').hide();
            pageService.Pdata.t8a_body_ls = true;
            multimeterService.Mdata.rtnMultimeterPosition('1', 't8at8b');
            $('.t8a-body-ls-out').show()
                .animate({left:'-100px'},700,function(){});
            $timeout(function () {
                eventService.dhxq_out(1);
            }, 200);
            $timeout(function () {
                pageService.Pdata.t8a_body_zz = true;
            }, 300);
            $timeout(function () {
                eventService.dhxq_ht('.t8a');
            }, 350);
            $timeout(function () {
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
            $timeout(function () {
                eventService.dhxq_out(2);
            }, 200);
            $timeout(function () {
                pageService.Pdata.t8b_body_zz = true;
            }, 300);
            $timeout(function () {
                eventService.dhxq_ht('.t8b');
            }, 350);
            $timeout(function () {
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
            $timeout(function () {
                eventService.dhxq_out(3);
            }, 200);
            $timeout(function () {
                pageService.Pdata.t8c_body_zz = true;
            }, 300);
            $timeout(function () {
                eventService.dhxq_ht('.t8c');
            }, 350);
            $timeout(function () {
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
            $timeout(function () {
                eventService.dhxq_out(4);
            }, 200);
            $timeout(function () {
                pageService.Pdata.t8d_body_zz = true;
            }, 300);
            $timeout(function () {
                eventService.dhxq_ht('.t8d');
            }, 350);
            $timeout(function () {
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

    eventService.dhxq_cs = function(id){
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
            $timeout(function(){
                $('.t8a-body-install').css("background","url('images/sbt_engine/dhxq/t8a_body_install.png') no-repeat");
            },660);
            $timeout(function(){
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
            $timeout(function(){
                $('.t8b-body-install').css("background","url('images/sbt_engine/dhxq/t8b_body_install.png') no-repeat");
            },660);
            $timeout(function(){
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
            $timeout(function(){
                $('.t8c-body-install').css("background","url('images/sbt_engine/dhxq/t8c_body_install.png') no-repeat");
            },660);
            $timeout(function(){
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
            $timeout(function(){
                $('.t8d-body-install').css("background","url('images/sbt_engine/dhxq/t8d_body_install.png') no-repeat");
            },660);
            $timeout(function(){
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

    //点火线圈拔出的动效
    eventService.dhxq_out=function(id) {
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
    };

    //点火线圈拔出一点点就换图片啦
    eventService.dhxq_ht=function(id) {
        $(id + "-body-install").css("background", "url('images/sbt_engine/dhxq/dhxq_body_out2.png') no-repeat");
    };

    //火花塞拔出
    eventService.hhs_bc = function(id){
        eventService.onDragMove(id+'_hhs');
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
    eventService.hhs_cs = function(id){
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
            $('.prompt').html("发动机运行状态下请勿拔出火花塞");
            $timeout(function(){
                $('.prompt').hide();
            },2000)
        }


    };


    //跳到二极管试灯灯笔所在页面
    eventService.diodelampBack = function(href){
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
    eventService.closeGYB = function(id){
        xcjDataService.setHandle('ver379');
        cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x = '0';
        cylpressguageService.Odata.gybzz = '0';
        pageService.Pdata.gybwz=0;
        $('.gangYaBiao-pointer').css('transform','rotate(0deg)');
        $("#cylpressguage").attr("src","images/cylinder.png");
        cylpressguageService.Odata.cylpressguagehide1();
    };

    //点火测试仪关闭
    eventService.testHide=function(id){
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
    eventService.oliFootOut=function(){
        $('.oliFoot-head').animate({top:'-105px'},1000);
        $('.oliFoot-head').animate({left:'690px'},1000);
        $('.oliFoot-head').animate({top:'28px'},1000,function(){
            pageService.Pdata.oliFoot=true;
            $timeout(function(){$('.oliFoot-head').css({'top':'249px','left':'490px'});},100);
        });
    };
    eventService.oliFootInstall=function(){
        $('.oliFoot-head-out').animate({top:'-105px'},1000);
        $('.oliFoot-head-out').animate({left:'490px'},1000);
        $('.oliFoot-head-out').animate({top:'246px'},1000,function(){
            pageService.Pdata.oliFoot=false;
            $timeout(function(){$('.oliFoot-head-out').css({'top':'28px','left':'690px'});},100);

        });
        xcjDataService.setHandle('ver002');
    };
    return eventService;
});