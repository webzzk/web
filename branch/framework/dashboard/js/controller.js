/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */
var dashboardModule = angular.module('dashboardModule', []);

/*加载诊断仪的模板*/
dashboardModule.run(function ( $templateCache) {
	$templateCache.put("dashboardTemplate", "template/switchMeter.html");
});

dashboardModule.directive("dashboard", function ($templateCache) {
	return {
		restrict: 'E', //指令的使用方式，包括标签，属性，类，注释AECM
		templateUrl: $templateCache.get("dashboardTemplate"),
		replace: false //是否用模板替换当前元素，若为false，则append在当前元素上
	}
});



dashboardModule.controller('dashboardCtrl',['$scope','$timeout','dashboardService','pageService','$interval','cylpressguageService','obdscanService','xcjDataService','oscilloscopeService',function($scope,$timeout,dashboardService,pageService,$interval,cylpressguageService,obdscanService,xcjDataService,oscilloscopeService){


	//点火仪表盘的ng-include的src初始值
	$scope.switchMeterSrc='framework/dashboard/template/switchMeter.html';
	$scope.dashboardServiceDdata = dashboardService.Ddata;
	$scope.dashboardServiceDint = dashboardService.Dint;
	$scope.dashboardServiceDout = dashboardService.Dout;
//	$scope.pageServiceMint = pageService.Mint;
	//用来控制表盘显示器显示
	$scope.dashboardShowmonitor = false;

	var timerDashBoardPointer,lockInit=false,accInit=true,onInit=true,onRunInit=true;
	
//点火面板动画=====================================================================
	var resultTime=true;
	var stalls=1;
//旋转开关角度
	$scope.stallsAngle =function(target,stall){
		if((stalls==4)&&(stall==3)){
			//如果已经点火了，就不允许点击on状态了
			stalls=4;
			return;
		}else{
			//把传过来的参数传给控制变量
			stalls=stall;
		}
		if(stalls==1 || stalls==2){
			//诊断仪联动
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/obdscan4.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/obdscan2.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/obdscan3.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/sbycur.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/sby.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/sby1.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/action.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/actiontest.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd2.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd3.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd4.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd5.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd6.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd7.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/dzzd8.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs2.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs3.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs4.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs5.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs6.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs7.html"
				||obdscanService.Zdata.url=="framework/obdscan/template/obdscan/cs8.html"

			){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/guzhang.html";
			}
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"){
				obdscanService.Zdata.memory=["obdscanMenu","pai","car"];
			}
		}
//		if(stalls>4){
//			stalls=1
//		}
		dashboardService.Ddata.dashboarstalls=stalls;

		//仪表指针
		if((stalls==3)||(stalls==4)){
			if(timerDashBoardPointer){$interval.cancel(timerDashBoardPointer);}
			if(obdscanService.Zdata.url=="framework/obdscan/template/obdscan/guzhang.html"&&pageService.Pint.In1Sen_BATT_Pos_x_Install=="1"&&pageService.Pint.In1Sen_BATT_Neg_x_Install=="1"&&pageService.Pint.In1Sen_K20_X1_x_Install=="1"){
				obdscanService.Zdata.url = "framework/obdscan/template/obdscan/car.html";
			}
			timerDashBoardPointer=$interval(function() {
				if (dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x >= 40 && dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x < 121) {
					$(".pointer_water").css("transform", "rotate(" + ((dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x - 40) * 1.8) + "deg)");
				} else if (dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x < 40) {
					$(".pointer_water").css("transform", "rotate(0deg)");
				} else if (dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x > 120) {
					$(".pointer_water").css("transform", "rotate(120deg)");
				}
				//发动机转速指针旋转
				if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x<=1000){
					$(".pointer_roate").css("transform", "rotate(" + (dashboardService.Dout.Out1Eng_x_EngSpeed_x_x / 26.5) + "deg)");
				}else if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x>1000&&dashboardService.Dout.Out1Eng_x_EngSpeed_x_x<1500){
					$(".pointer_roate").css("transform", "rotate(" + (dashboardService.Dout.Out1Eng_x_EngSpeed_x_x / 28.8) + "deg)");
				}else if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x>=1500&&dashboardService.Dout.Out1Eng_x_EngSpeed_x_x<2000){
					//dashboardService.Dout.Out1Eng_x_EngSpeed_x_x = 1500
					$(".pointer_roate").css("transform", "rotate(" + (dashboardService.Dout.Out1Eng_x_EngSpeed_x_x / 29) + "deg)");
				}else if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x>=2000){
					$(".pointer_roate").css("transform", "rotate(" + (dashboardService.Dout.Out1Eng_x_EngSpeed_x_x / 32) + "deg)");
				}

				//车速指针旋转
				$(".pointer_speed").css("transform", "rotate(" + (dashboardService.Dout.Out1Eng_x_VehSensor_x_x * 1.1) + "deg)");
			}, 40);
			//油压表指针旋转
			if(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x=='0'){
				dashboardService.Dint.In1Sen_APP_NO1_x_x="0";
				var pedal=parseInt($(".pedal_accelerator").css("top"));
				if(pedal){
					//$(".pedal_accelerator").text(pedal-24);
				}else{
					//$(".pedal_accelerator").text(pedal);
				}
			}
			//油箱油量
			if(pageService.Pint.In1Sen_BATT_Pos_x_Install=="1" && pageService.Pint.In1Sen_BATT_Neg_x_Install == "1"){
				//$(".pointer_oil").css({"transition":"transform 2s","transform":"rotate("+(dashboardService.Dout.Out1Eng_x_OilVolume_x_x  * 120)+"deg)"});
				$(".pointer_oil").css({"transition":"transform 2s","transform":"rotate(100deg)"});
			}
		}else{
			$interval.cancel(timerDashBoardPointer);
		}

		if(dashboardService.Ddata.dashboarstalls==1){
			resultTime=true;
			onRunInit=true;
			accInit=true;
			onInit=true;
			//让踏板归零
			if(lockInit){
				$(".pedal_accelerator").css("top","0px");
				var pedal=parseInt($(".pedal_accelerator").css("top"));
				if(pedal){
					$(".pedal_accelerator").text(pedal-24);
				}else{$(".pedal_accelerator").text(pedal);}
				lockInit=false;
			}

			$(".key").css("transform","rotate(0deg)");
			$(".pointer_water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_speed").css("transform","rotate(0deg)");
			//油箱油量指针旋转
			$(".pointer_oil").css("transform","rotate(0deg)");

			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '1';//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0';//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0';//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0';//	点火钥匙START档位

			dashboardService.Ddata.dashboardLockAcc=false;
			/*pageService.Pdata.lockOrAcc=false;//acc or lock*/

			$(".pedal_brake").css("top","0px");
			$(".pedal_brake").text(parseInt($(".pedal_brake").css("top"))*2);

			//模型也初始化
			dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
			//dashboardService.Dint.In1Sen_APP_NO1_x_x=parseInt(parseInt($(".pedal_accelerator").css("top"))).toString();
			dashboardService.Dint.In1Sen_x_BrakeSig_x_x=parseInt(parseInt($(".pedal_brake").css("top"))*2).toString();
			
//			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;

		}else if(dashboardService.Ddata.dashboarstalls==2){
			resultTime=true;
			lockInit=true;
			onInit=true;
			onRunInit=true;
			$(".key").css("transform","rotate(50deg)");
			$(".pointer_water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_speed").css("transform","rotate(0deg)");
			//油箱油量指针旋转
			$(".pointer_oil").css("transform","rotate(0deg)");

			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0';//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '1';//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0';//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0';//	点火钥匙START档位

			//让踏板归零
			if(accInit){
				$(".pedal_accelerator").css("top","0px");
				var pedal=parseInt($(".pedal_accelerator").css("top"));
				if(pedal){
					$(".pedal_accelerator").text(pedal-24);
				}else{$(".pedal_accelerator").text(pedal);}
				accInit=false;
			}


			$(".pedal_brake").css("top","0px");
			$(".pedal_brake").text(parseInt($(".pedal_brake").css("top"))*2);
			//模型也初始化
			//dashboardService.Dint.In1Sen_APP_NO1_x_x=parseInt(parseInt($(".pedal_accelerator").css("top"))).toString();
			dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
			dashboardService.Dint.In1Sen_x_BrakeSig_x_x=parseInt(parseInt($(".pedal_brake").css("top"))*2).toString();
			dashboardService.Ddata.dashboardLockAcc=false;
			//隐藏表盘显示器
			$scope.dashboardShowmonitor=false;
		}else if(dashboardService.Ddata.dashboarstalls==3){
			$(".key").css("transform","rotate(90deg)");
/*			pageService.Pdata.onOpen=true;
			pageService.Pdata.startOpen=false;
			pageService.Pdata.lockOrAcc=false;*/
			lockInit=true;accInit=true;onRunInit=true;
			//让踏板归零
			if(onInit){
				$(".pedal_accelerator").css("top","0px");
				var pedal=parseInt($(".pedal_accelerator").css("top"));
				if(pedal){
					$(".pedal_accelerator").text(pedal-24);
				}else{$(".pedal_accelerator").text(pedal);}
				onInit=false;
			}

			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0';//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0';//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '1';//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '0';//	点火钥匙START档位
		}
		else if(dashboardService.Ddata.dashboarstalls==4){
			resultTime=true;
			accInit=true;lockInit=true;onInit=true;
			//$(".pointer_roate").css("transform", "rotate(90deg)");

			//让踏板归零
			if(onRunInit){
				var pedal=parseInt($(".pedal_accelerator").css("top"));
				if(pedal){
					$(".pedal_accelerator").css("top","0px");
					$(".pedal_accelerator").text(0);
					dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
				}else{
					$(".pedal_accelerator").text(pedal);
				}
				dashboardService.Dint.In1Sen_APP_NO1_x_x="0";
				onRunInit=false;
			}

			dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0';//	点火钥匙LOCK档位
			dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0';//	点火钥匙ACC档位
			dashboardService.Dint.In1IgnKey_x_ON_x_x= '0';//	点火钥匙ON档位
			dashboardService.Dint.In1IgnKey_x_START_x_x= '1';//	点火钥匙START档位

			//油压表指针旋转
/*			if($scope.pageServicePint.In1Sen_BATT_Neg_x_Install == "1"&&$scope.pageServicePint.In1Sen_BATT_Pos_x_Install == "1"){
				$(".pointer_oil").css("transform","rotate(-80deg)");
			}*/
			$(".key").css("transform","rotate(140deg)");
			dashboardService.Ddata.dashboardLockAcc=true;
			//点击点火开关至ST档

			//显示表盘显示器
			$scope.dashboardShowmonitor=true;
			target.onmouseup=function(){
					//油压表指针旋转
/*					if($scope.pageServicePint.In1Sen_BATT_Neg_x_Install == "1"&&$scope.pageServicePint.In1Sen_BATT_Pos_x_Install == "1"){
						$(".pointer_oil").css("transform","rotate(-80deg)");
					}*/

					$timeout(function () {
						dashboardService.Dint.In1IgnKey_x_LOCK_x_x= '0';//	点火钥匙LOCK档位
						dashboardService.Dint.In1IgnKey_x_ACC_x_x= '0';//	点火钥匙ACC档位
						dashboardService.Dint.In1IgnKey_x_ON_x_x= '1';//	点火钥匙ON档位
						dashboardService.Dint.In1IgnKey_x_START_x_x= '0';//	点火钥匙START档位
						$(".key").css("transform","rotate(90deg)");

						if(dashboardService.Dint.In1Eng_x_SpPlugTest_x_x == '1'||dashboardService.Dint.In1Eng_x_SpPlugTest_x_x == '2'||dashboardService.Dint.In1Eng_x_SpPlugTest_x_x == '3'||dashboardService.Dint.In1Eng_x_SpPlugTest_x_x == '4'){
							xcjDataService.setCondition('v05','4',pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]);
						}//测试点火线圈
						if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
							xcjDataService.setHandle('ver004');
						}

					},100)
			};
			if(cylpressguageService.Oint.In1Eng_x_CylPressGauge_x_x == '1'&&cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x!=0){
				$(".gangYaBiao-pointer").css("transform","rotate("+(cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x* 2.613)+"deg)");
				cylpressguageService.Odata.gybzz = '1';
			}
			//console.log(dashboardService.Dint.In1IgnKey_x_START_x_x);
		}else{
			stalls=1;
			$(".key").css("transform","rotate(0deg)");
			$(".pointer_water").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_roate").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_speed").css("transform","rotate(0deg)");
			//转速指针旋转
			$(".pointer_oil").css("transform","rotate(0deg)");
		}
//		console.log(stalls)
	};
//灯全亮,再熄灭
	$scope.lightingThenLightOff=function (){
		$(".switch_meter .meter .light .transparent").removeClass("transparent");
		$timeout(function(){
			$(".switch_meter .meter .light img").not(".monitor").addClass("transparent");
		},2000);
	}
//灯指针初始化
	$scope.lightAndPointerInitialize=function (){
		$(".switch_meter .meter .light").addClass("transparent");
	};
//点火开关面板开关
	$scope.openSwitchMeter=function (){
		////显示大面板
		//dashboardService.Ddata.dashboardStatus=true;
		////隐藏小面板
		//dashboardService.Ddata.dashboarSmaill=false;
		////加上大面板的拖拽事件
		//$scope.dragDiv();
		$scope.dragDiv_pedal();
		//转速指针旋转
		if(dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x>=40&&dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x<121){
		$(".pointer_water").css("transform","rotate("+((dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x-40)*1.8)+"deg)");
		}else if(dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x<40){
			$(".pointer_water").css("transform","rotate(0deg)");
		}else if(dashboardService.Dout.Out1Sen_x_CoolantTemp_x_x>120){
			$(".pointer_water").css("transform","rotate(120deg)");
		}
		//转速指针旋转
		$(".pointer_roate").css("transform","rotate("+(dashboardService.Dout.Out1Eng_x_EngSpeed_x_x/25)+"deg)");
		//转速指针旋转
		//$(".pointer_speed").css("transform","rotate("+(dashboardService.Dout.Out1EngM_x_VehSpeed_x_x*1.1)+"deg)");
		//转速指针旋转
//		$(".pointer_oil").css("transform","rotate(-80deg)");
	};
//关闭点火面板按钮
	$scope.closeSwitchShowBtn=function (obj){

		//显示大面板
		dashboardService.Ddata.dashboardStatus=false;
		//隐藏小面板
		dashboardService.Ddata.dashboarSmaill=true;


//		//显示大面板
//		dashboardService.Ddata.dashboardStatus=false;
//		//隐藏小面板
//		dashboardService.Ddata.dashboarSmaill=true;
		if(dashboardService.Ddata.dashboarstalls==1){
			$(".key").css("transform","rotate(0deg)");

		}else if(dashboardService.Ddata.dashboarstalls==2){
			$(".key").css("transform","rotate(50deg)");
		}else if(dashboardService.Ddata.dashboarstalls==3||dashboardService.Ddata.dashboarstalls==4){
			$(".key").css("transform","rotate(90deg)");
		}
	};
	//面板拖拽事件
	$scope.dragDiv=function (){
		//给新面板加上拖拽事件
		$(".dragSource").draggable({
			containment:".main",
			cursor:"move"
		})
	};
//x方向上拖拽事件
	$scope.dragDiv_pedal=function (){
		//给新面板加上拖拽事件
		$(".pedal_brake").draggable({//刹车
			containment:".pedal",
			cursor:"move",
			axis:"y",
			drag:function(){
				var top=parseInt($(this).css("top"))*2;
				top == 4 && top == 0;
				dashboardService.Dint.In1Dash_x_Brake_Signal_x=top.toString();
				$(".pedal_brake").text(top);
			},
			stop:function(){
				if($scope.lock){
					$(this).css("top","0px");
					$(".pedal_brake").text(0);
					dashboardService.Dint.In1Dash_x_Brake_Signal_x='0';
				}
			}
		});
		//给新面板加上拖拽事件
		$(".pedal_accelerator").draggable({//油门
			containment:".pedal",
			cursor:"move",
			axis:"y",
			drag:function(){
				var top=parseInt($(this).css("top"))*2+24;
				if(top==24){
					dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
					$(".pedal_accelerator").text(0);
				}else{
					dashboardService.Dint.In1Dash_x_APP_Signal_x=top.toString();
					$(".pedal_accelerator").text(top);
				}
			},
			stop:function(){
				if($scope.lock){
					$(this).css("top","0px");
					$(".pedal_accelerator").text(0);
					dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
				}
			}
		})
	};
	//锁切换
	$scope.lock = false;
	$scope.lock_replace = function(){
		if($scope.lock){
			$('.pedal .lock').css({'background':'url("framework/dashboard/images/lock.png") no-repeat','top':'25px'});
			$scope.lock = false;
		}else{
			$('.pedal .lock').css({'background':'url("framework/dashboard/images/unlock.png") no-repeat','top':'24px'});
			$scope.lock = true;
			$(".pedal_brake").css("top","0px").text(0);
			$(".pedal_accelerator").css("top","0px").text(0);
			dashboardService.Dint.In1Dash_x_Brake_Signal_x='0';
			dashboardService.Dint.In1Dash_x_APP_Signal_x="0";
		}
	};
	//仪表盘故障描述滚动显示
	var gzxstime = 2000;
	var gzxsInterval = $interval(function(){
		$scope.gzxslb();
	},gzxstime);
	$scope.gzxslb = function(){//仪表盘故障描述轮播
		if(parseInt($('#gzxs').css('height')) >= 32 ){
			$timeout(function(){
				$('#gzxs').css('top','-16px');
			},2000);
			if(parseInt($('#gzxs').css('height')) == 32){
				gzxstime = 4000;
			}
		}
		if(parseInt($('#gzxs').css('height')) >=48){
			$timeout(function(){
				$('#gzxs').css('top','-32px');
			},4000);
			if(parseInt($('#gzxs').css('height')) == 48){
				gzxstime = 6000;
			}
		}
		if(parseInt($('#gzxs').css('height')) >=64){
			$timeout(function(){
				$('#gzxs').css('top','-48px');
			},6000);
			if(parseInt($('#gzxs').css('height')) == 64){
				gzxstime = 8000;
			}
		}
		$timeout(function(){
			$('#gzxs').css('top','0px');
		},gzxstime);
	};
	//监听仪表盘故障描述的时间
	var YBXS = $scope.$watch(function(){return gzxstime},function(newValue,oldValue){
		if(newValue!=oldValue){
			$interval.cancel(gzxsInterval);
			gzxsInterval = $interval(function(){
				$scope.gzxslb();
			},gzxstime);
		}
	});
}]);

