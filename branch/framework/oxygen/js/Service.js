/**
 * @author 谢国亮
 */
oxygenModule.service('oxygenService', function (pageService,eventService) {
    var oxygenService = oxygenService || {};
    oxygenService.Odata = oxygenService.Odata || {};
    oxygenService.Oint = oxygenService.Oint || {};
    oxygenService.Oout = oxygenService.Oout || {};
    oxygenService.Odata = {
        status: false,//套筒的显示状态
        oxygenSocket_hot: false,//是否在热区上
        oxygenSocket:function(){
            $(".oxygen").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".oxygenSocket",
                over: function () {
                    oxygenService.Odata.oxygenSocket_hot = true;
                },
                out: function () {
                    oxygenService.Odata.oxygenSocket_hot = false;
                },
                drop: function (event, ui) {
                    oxygenService.Odata.oxygenSocket_hot = false;
                    var trueId = this.id,tName;
                    var name = trueId.split("-")[1];
                    var oName = pageService.Pdata.ljName[name];
                    $("[status='bj-" + name + "']").show();
                    if(pageService.Pdata[name+"_bjOn"]){
                        tName="bj"+name;
                        oName+="(备件)";
                    }else{
                        tName=name;
                    }
                    var html = "<img id='ljc_" + tName + "' src='images/bjk/bj_" + name + ".png' height='62'  width='62' title='" + oName + "'/>";
                    eventService.ljcJump();
                    $($("#ljcBox li:empty")[0]).html(html);
                    pageService.Pdata[name + "_tearDown"] = false;
                    eventService.inLjc(tName, oName);
                }
            });
        }
    };
    oxygenService.Odata.smokehide0=function(){
        oxygenService.Odata.status = false;
    };

    return oxygenService;

});
