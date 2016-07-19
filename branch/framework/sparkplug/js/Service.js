/**
 * @author 谢国亮
 */
sparkplugModule.service('sparkplugService', function ($timeout,pageService,dashboardService,eventService) {
    var sparkplugService = sparkplugService || {};
    sparkplugService.Odata = sparkplugService.Odata || {};
    sparkplugService.Oint = sparkplugService.Oint || {};
    sparkplugService.Oout = sparkplugService.Oout || {};
    sparkplugService.Odata = {
        smokeStatus: false,//火花塞套筒的显示状态
        sparkplug_hot:false,//是否在热区位置

        freshSocketHontspot: function () {
          $(".t8a-hhs-install-hot").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".sparkplugsocket",
              over:function(){
                  sparkplugService.Odata.sparkplug_hot=true;
              },
              out:function(){
                  sparkplugService.Odata.sparkplug_hot=false;
              },
                drop: function (event, ui) {
                    sparkplugService.Odata.sparkplug_hot=false;
                    sparkplugService.Odata.sparkplugSocketPos("211px","348px","t8a");
                }
            });
            $(".t8b-hhs-install-hot").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".sparkplugsocket",
                over:function(){
                    sparkplugService.Odata.sparkplug_hot=true;
                },
                out:function(){
                    sparkplugService.Odata.sparkplug_hot=false;
                },
                drop: function (event, ui) {
                    sparkplugService.Odata.sparkplug_hot=false;
                    sparkplugService.Odata.sparkplugSocketPos("201px","741px","t8b");
                }
            });
            $(".t8c-hhs-install-hot").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".sparkplugsocket",
                over:function(){
                    sparkplugService.Odata.sparkplug_hot=true;
                },
                out:function(){
                    sparkplugService.Odata.sparkplug_hot=false;
                },
                drop: function (event, ui) {
                    sparkplugService.Odata.sparkplug_hot=false;
                    sparkplugService.Odata.sparkplugSocketPos("207px","277px","t8c");
                }
            });
            $(".t8d-hhs-install-hot").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".sparkplugsocket",
                over:function(){
                    sparkplugService.Odata.sparkplug_hot=true;
                },
                out:function(){
                    sparkplugService.Odata.sparkplug_hot=false;
                },
                drop: function (event, ui) {
                    sparkplugService.Odata.sparkplug_hot=false;
                    sparkplugService.Odata.sparkplugSocketPos("201px","679px","t8d");
                }
            });

        },
        sparkplugSocketPos:function(top,left,target){
            if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x <= 200){
                $(".sparkplugsocket").hide();
                $('<div id="sparkplugSocket" style="z-index:31;position:absolute;width:224px;height:72px;background:url(framework/sparkplug/images/sparkPlugSocket.png) no-repeat;"></div>').css({"top":top,"left":left}).appendTo($("#contain"));
                var time1=setInterval(function(){
                    $("#sparkplugSocket").css({"transition":"transform 1s","transform":"rotate(-720deg)"})
                },1000);
                setTimeout(function(){
                    window.clearInterval(time1);
                    $("#sparkplugSocket").remove();
                    $(".sparkplugsocket").show();
                    eventService.hhs_bc(target);
                },3000);
            }else{
                $('.prompt').show()
                    .css({maxWidth:'400px',height:'30px',background: '#e5e5e5',fontSize: '14px',borderRadius: '5px',lineHeight:'30px',padding:'5px',zIndex:'20'})
                    .css({position:'absolute','left':left,'top':top});
                $('.prompt').html("发动机运行状态下请勿拔出火花塞");
                $timeout(function(){
                    $('.prompt').hide();
                },2000)
            }

        }

    };

    sparkplugService.Odata.smokehide0=function(){
        sparkplugService.Odata.smokeStatus = false;
    };

    return sparkplugService;

});
