/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       xie guoliang
 * @email        gl.xie@xiaochejiang.com
 * @version      1.0
 */

obdscanModule.controller('obdscanCtrl',function ($scope, $timeout,$interval,pageService,obdscanService,dashboardService,xcjDataService) {
	//添加诊断仪
	//console.log(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType]]+"---"+pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs])
	$scope.obdscanServiceZdata=obdscanService.Zdata;
	$scope.obdscanServiceMout=obdscanService.Mout;
	$scope.obdscanServiceMint=obdscanService.Mint;
	$interval(function(){
		$scope.obdscanServiceZdata=obdscanService.Zdata;
		$scope.obdscanServiceMout=obdscanService.Mout;
		$scope.obdscanServiceMint=obdscanService.Mint;
	},1);
	$scope.fdjzx=$scope.obdscanServiceMout.Out1Eng_x_EngSpeed_x_x;
	$scope.obdscan = function () {
		xcjDataService.setHandle('ver380');
		if(obdscanService.Zdata.obdscanStatus){
			return;
		}
		obdscanService.Zdata.obdscanStatus = true;
		pageService.Pdata.s13d = true;
		pageService.Pdata.s58b = true;
		pageService.Pdata.s30swt = true;
		pageService.Pdata.s78swt = true;
		pageService.Pdata.s33 = true;
		$scope.isPower = false;
		$("#mask-obdscan").draggable({    //示波仪的拖动
			handle: ".mask-obdscan",
			containment: "#contain",
			scroll: false,
			cursor: "move",
			iframeFix: true,
			drag: function (event) {

			}
		});
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";

	};
	//动作测试弹出层的拖动
	$scope.ationTestPop = function () {
		$( ".draghandle" ).draggable({
			handle: "",
			containment: "#obsanbody",
			scroll: false,
			cursor: "move",
			iframeFix: true,
			drag:function(event) {

			}
		});

	};
	//关闭动作测试里面的弹出层
	$scope.colsedPoplayer=function(name){
           $(name).hide();
	};
	//关闭诊断仪
	$scope.closedobdscan = function () {
		xcjDataService.setHandle('ver381');
		//设置工具栏目状态万用表
		$("#obdsan").attr("src","images/obdscan.png");
		obdscanService.Zdata.obdscanStatus = false;
		pageService.Pdata.s13d = false;
		pageService.Pdata.s58b = false;
		pageService.Pdata.s30swt = false;
		pageService.Pdata.s78swt = false;
		pageService.Pdata.s33 = false;
		$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		$scope.obdscanPower();
		$scope.obdscanServiceZdata.isPower=false;
	};


	/*诊断仪的菜单操作*/
	$scope.changeTemplate = function (type, page,clear) {

		$.each(obdscanService.Zdata.memory, function (index, value) {
			if (value == page) {
				obdscanService.Zdata.memory.splice($.inArray(page, obdscanService.Zdata.memory), 1);  //判断模板数组是否存在，如存在删除
			}
		});
		obdscanService.Zdata.memory.push(page);//，添加模板
		if(type=="obdscan2" || type=="dzzd2" || type=="cs2"){
			if(dashboardService.Ddata.dashboarstalls==3||dashboardService.Ddata.dashboarstalls==4){
				if(pageService.Pint.In1Sen_BATT_Pos_x_Install=="1"&&pageService.Pint.In1Sen_BATT_Neg_x_Install=="1"&&pageService.Pint.In1Sen_K20_X1_x_Install=="1" ) {
					$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + type + ".html";
				}else{
					$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/guzhang.html";
				}
			}else{
				$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/guzhang.html";
			}
		}else{
			$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + type + ".html";
		}


		if(clear==0){
			obdscanService.Mint.In1OBD_x_ClearCode_x_x="1";
			//console.log(obdscanService.Mint.In1OBD_x_ClearCode_x_x);
			$timeout(function(){
				obdscanService.Mint.In1OBD_x_ClearCode_x_x="0";
				//console.log(obdscanService.Mint.In1OBD_x_ClearCode_x_x);
			},100)
		}
		if(type == "sbycur"){
			//修复前读取故障代码
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'&&!obdscanService.Zdata.clearGZM){
				xcjDataService.setHandle('ver005');
			}
			//修复前，清除故障代码后再读取故障代码
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'&&obdscanService.Zdata.clearGZM){
				xcjDataService.setHandle('ver273');
			}
			//修复后读取故障代码
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='1'){
				xcjDataService.setHandle('ver310');
			}
		}
		if (type == "obdscan3") {
			//修复前读取数据流
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
				xcjDataService.setHandle('ver006');
			}
			//修复后读取数据流
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='1'){
				xcjDataService.setHandle('ver271');
			}
		}
		if(type=="sby1"){
			//修复前清除故障代码
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
				xcjDataService.setHandle('ver270');
				obdscanService.Zdata.clearGZM = true;
			}
			//修复后清除故障代码
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='1'){
				xcjDataService.setHandle('ver272');
			}
			obdscanService.Mint.In1OBD_x_ClearCode_x_x = '1';
			$timeout(function(){
				obdscanService.Mint.In1OBD_x_ClearCode_x_x = '0';
			},500);
		}
		if (type == "dongjiezhen") {
			//读取定格数据
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
				xcjDataService.setHandle('ver269');
			}
		}
		if(type=="actiontest"){
			$timeout(function(){
				$scope.ationTestPop();
			},1000);
		}
	};

	//诊断仪的返回
	$scope.obdscanReturn = function () {
		var obj = obdscanService.Zdata.memory.pop();
		if(!obj){
			return;
		}
/*		if(((dashboardService.Dint.In1IgnKey_x_LOCK_x_x=='1')||(dashboardService.Dint.In1IgnKey_x_ACC_x_x=='1'))&&(obj!='obdscanMenu')&&(obj!='pai')){
			obj='car';
		}*/

		if (obj) {
			$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/" + obj + ".html";
			obdscanService.Zdata.url = "framework/obdscan/template/obdscan/" + obj + ".html";
		} else {
			$scope.obdscanServiceZdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
			obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		}
		obdscanService.Mint.In1OBD_x_ClearCode_x_x = '0';
		obdscanService.Mint.In1OBD_ActTest_Q22_x_x = '0';
		obdscanService.Mint.In1OBD_ActTest_Q12_x_x = '0';
	};

	//诊断仪的加电
	$scope.obdscanPower = function () {
		obdscanService.Zdata.memory = [];
		$scope.obdscanServiceZdata.isPower=!obdscanService.Zdata.isPower;
		obdscanService.Zdata.url = "framework/obdscan/template/obdscan/obdscanMenu.html";
		//$scope.obdscanServiceZdata.isPower=obdscanService.Zdata.isPower=!obdscanService.Zdata.isPower;
	};

	//tabMenu 菜单
	$scope.tabMenu = function (type,target) {
		$('.tab_menu li').removeClass("selected");
		$(target).addClass("selected");
		obdscanService.Zdata.tabBox1=false;
		obdscanService.Zdata.tabBox2=false;
		obdscanService.Zdata.tabBox3=false;
		if(type=="tab1"){
			obdscanService.Zdata.tabBox1=true;
		}
		else if(type=="tab2"){
			obdscanService.Zdata.tabBox2=true;
		}
		else if(type=="tab3"){
			obdscanService.Zdata.tabBox3=true;
		}
	};
	$scope.actionTest = function (type,layer) {
		obdscanService.Zdata.actionType=type;
		obdscanService.Zdata.layerType=layer;
		if(type == "jqzstjf") {//进气凸轮轴调节阀故障
			//pageService.Pdata.addAction('Ses070');
			if (pageService.Pdata.faultType=="SBT_FCO_ES_ES_009_false"&& pageService.Pdata.bjk_jqzstjf) {//更换前动作测试
				//pageService.Pdata.addActionKey('Ses070', 'action', 'om');
			}
		}

	};
	//设置Service参数
	var setServiceData=function(){
		switch (obdscanService.Zdata.actionType){
			case "py":
				var value=$(".tk-1-text span").text();
				obdscanService.Mint.In1OBD_x_CtrlInjVol_x_x=value;
				break;
			case "jqzstjf":
				var value=$(".tk-5-text span").text();
				obdscanService.Mint.In1OBD_x_CtrlVVTLinear_x_x=value;
				break;
			case "pqzstjf":
				var value=$(".tk-5-text span").text();
				obdscanService.Mint.In1OBD_x_CtrlVVTExLinear_x_x=value;
				break;
			case "krbcgq":
				var value=$(".tk-2-text").text();
				obdscanService.Mint.In1OBD_x_CtrlInjVolforAF_x_x=parseFloat(value).toString();
				break;
			case "tgdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiVsvEvap_x_x=value=='off' ? "1" :"2";
				break;
			case "ryb":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_CtrlTCandTE1_x_x=value=='off' ? "1" :"2";
				break;
			case "lqfs":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ElecCoolFan_x_x=value=='off' ? "1" :"2";
				break;
			case "qdjdq":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiStRelay_x_x=value=='off' ? "1" :"2";
				break;
			case "jqm":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_EtcsOpClSlowSpeed_x_x=value=='close' ? "1" :"2";
				break;
			case "qgdy"://?
				var value=$(".tk-4-text").text();
				obdscanService.Mint.In1OBD_x_SeleCylFuelCut_x_x=value=='off' ? "1" :"2";

				break;
			case "SLTdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldSLT_x_x=value=='off' ? "1" :"2";
				break;
			case "S1dcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldS1_x_x=value=='off' ? "1" :"2";
				break;
			case "S2dcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldS2_x_x=value=='off' ? "1" :"2";
				break;
			case "szdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiLockUp_x_x=value=='off' ? "1" :"2";
				break;
			case "SLdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldSL_x_x=value=='off' ? "1" :"2";
				break;
			case "hdw":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ShiftPosition_x_x=value=='off' ? "1" :"2";
				break;
			case "STdcf":
				var value=$(".tk-3-text").text();
				obdscanService.Mint.In1OBD_x_ActiSolenoldST_x_x=value=='off' ? "1" :"2";
				break;

		}

	};
	//弹出层调节器
	$scope.leftAdjust=function(tmep,cs){
		$('.tk-1-zuo').css('background','url("framework/obdscan/images/pylces/6.png")');
		$('.tk-1-you').css('background','url("framework/obdscan/images/pylces/4.png")');
		if(tmep=='tmp1'){
			var val=parseFloat($(".tk-1-gun").css("left"));
			var left=val > 128 ? val-3.8:val;

			var text=parseFloat($(".tk-1-text").text());
			if(text==-4.5){
				left=val > 128 ? val-6:val;
			}
			var adjust=(text-2).toFixed(2)>-12.5 ? (text-2).toFixed(2):-12.5;
			$(".tk-1-gun").css("left",function(){return left+"px";} );
			$(".tk-1-text span").text(adjust);
			setServiceData();
		}
		else if(tmep=='tmp2'){
			var val=parseFloat($(".tk-5-gun").css("left"));
			var left=val > 128 ? val-3.1:val;
			var text=parseFloat($(".tk-5-text").text());
			$(".tk-5-gun").css("left",function(){return left+"px";} );
			var adjust=text-12>-128 ? text-12:-128;
			$(".tk-5-text span").text(adjust);
			setServiceData();
		}
	};
	$scope.rightAdjust=function(temp,cs){
		$('.tk-1-you').css('background','url("framework/obdscan/images/pylces/7.png")');
		$('.tk-1-zuo').css('background','url("framework/obdscan/images/pylces/5.png")');
		if(temp=='tmp1') {
			var val = parseFloat($(".tk-1-gun").css("left"));
			var left = val < 192 ? val + 2.8 : val;
			var text = parseFloat($(".tk-1-text").text());
			if(text==-0.5){
				left=val < 192 ? val + 16 : val;
			}
			var adjust = (text + 2).toFixed(2) < 24.8 ? (text + 2).toFixed(2) : 24.8;
			$(".tk-1-text span").text(adjust);
			$(".tk-1-gun").css("left", function () {return left + "px";});

			setServiceData();
		}
		else if(temp=='tmp2'){
			var val = parseFloat($(".tk-5-gun").css("left"));
			var left = val< 192 ? val + 4 : val;
			var text=parseFloat($(".tk-5-text").text());
			$(".tk-5-gun").css("left",function(){return left+"px";});
			if(text==-20){text=32;}
			var adjust=text+12<127 ? text+12:127;
			$(".tk-5-text span").text(adjust);
			setServiceData();
		}
	};




	$scope.adjustData = function (num) {
		if(num=='-12.5'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo_2.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you.png")');
		}else if(num=='0'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong_2.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you.png")');
		}else if(num=='12.5'){
			$('.tk-2-zuo').css('background','url("framework/obdscan/images/krbcgq/zuo.png")');
			$('.tk-2-zhong').css('background','url("framework/obdscan/images/krbcgq/zhong.png")');
			$('.tk-2-you').css('background','url("framework/obdscan/images/krbcgq/you_2.png")');
		}
		$(".tk-2-text").text(num+"%");
		setServiceData();
	 };

	$scope.switchBtn=function(type,str){

		if(type=='tk3'&&str=='off'){
			$('.tk-3-zuo').css('background','url("framework/obdscan/images/tgdcf/zuo-2.png")');
			$('.tk-3-you').css('background','url("framework/obdscan/images/tgdcf/you.png")');
		}else if(type=='tk3'&&str=='on'){
			$('.tk-3-zuo').css('background','url("framework/obdscan/images/tgdcf/zuo.png")');
			$('.tk-3-you').css('background','url("framework/obdscan/images/tgdcf/you-2.png")');
		}else if(type=='tk4'&&str=='off'){
			$('.tk-4-zuo').css('background','url("framework/obdscan/images/qgan/zuo-2.png")');
			$('.tk-4-you').css('background','url("framework/obdscan/images/qgan/you.png")');
		}else if(type=='tk4'&&str=='on'){
			$('.tk-4-zuo').css('background','url("framework/obdscan/images/qgan/zuo.png")');
			$('.tk-4-you').css('background','url("framework/obdscan/images/qgan/you-2.png")');
		}

		if(type=="tk3"){
			if(obdscanService.Zdata.actionType=="jqm"){
				var tm=str=="off" ? "close" : "open";
				$(".tk-3-text").text(tm);
			}
			else{
				$(".tk-3-text").text(str);
			}
		}
		else if(type=="tk4"){$(".tk-4-text").text(str);}
		setServiceData();

	};
	$scope.setInitVal=function(num){
		if(num==1){
			$('.shu1').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu1').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');

		}
		else if(num==2){
			$('.shu2').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu2').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==3){
			$('.shu3').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu3').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==4){
			$('.shu4').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu4').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==5){
			$('.shu5').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu5').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==6){
			$('.shu6').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu6').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==7){
			$('.shu7').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu7').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		else if(num==8){
			$('.shu8').css('background','url("framework/obdscan/images/qgan/8.png")');
			$('.shu8').siblings().css('background','url("framework/obdscan/images/qgan/9.png")');
		}
		obdscanService.Mint.In1OBD_x_SeleCylFuelCutNum_x_x=num;
	};

	/*$scope.obdscanPfefeower = function () {
		alert();
	};*/

	var djzgzm = false;
	var watch_1 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P16A0_x},function(newValue,oldValue,scope){
		$scope.jianTing();
		if(newValue == '916010'){obdscanService.Zdata.dongJieZheng = true;}
	});
	var watch_2 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0458_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90458'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_3 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0443_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90443'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_4 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0030_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90030'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_5 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0031_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90031'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_6 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0037_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90037'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_7 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0036_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90036'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_8 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0661_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90661'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_9 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0660_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90660'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_10 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0192_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90192'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_11 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P2311_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90300'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_12 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0352_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90352'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_13 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0365_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90365'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_14 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0340_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90340'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_15 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0102_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90102'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_16 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0353_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90353'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_17 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0108_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90108'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_18 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0106_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90106'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_19 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0010_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90010'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_20 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P2091_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '92091'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_21 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0013_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90013'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_22 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P129D_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '912904'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_23 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P062B_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '906202'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_24 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P1682_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '91682'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_25 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0689_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90689'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_26 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P1682_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '91682'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_27 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0616_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90616'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_28 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0615_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90615'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_29 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P171B_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '917102'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_30 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P171A_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '917101'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_31 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0598_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90598'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_32 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0597_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90597'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_33 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0351_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90351'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_34 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0354_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90354'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_35 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P16A1_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '916011'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_36 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P2089_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '92089'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_37 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P00F4_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '900064'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_38 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0463_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90463'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_39 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P2229_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '92229'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_40 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0073_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90073'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_41 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0533_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90533'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_42 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0097_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90097'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_43 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0113_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90113'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_44 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P2227_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '92227'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_45 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0137_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90137'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_46 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0141_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90141'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_47 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P228D_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '922804'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_48 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0089_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90089'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_49 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P135A_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '913501'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_50 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0135_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90135'){obdscanService.Zdata.dongJieZheng = true;}});
	var watch_51 = $scope.$watch(function(){return obdscanService.Mout.Out1Eng_x_FaultCode_P0203_x},function(newValue,oldValue,scope){$scope.jianTing();if(newValue == '90203'){obdscanService.Zdata.dongJieZheng = true;}});
	//var watch_52 = $scope.$watch(function(){return djzgzm},function (newValue,oldValue,scope){
	//	if(newValue != 0){
	//		obdscanService.Zdata.dongJieZheng = true;
	//	}else if(newValue == 0){
	//		obdscanService.Zdata.dongJieZheng = false;
	//	}
	//	console.log(djzgzm)
	//});

	$scope.jianTing = function(){
		obdscanService.Zdata.Out1Eng_x_EngSpeed_x_x=obdscanService.Mout.Out1Eng_x_EngSpeed_x_x;
		obdscanService.Zdata.Out1Eng_x_CoolTempSensor_x_x=obdscanService.Mout.Out1Eng_x_CoolTempSensor_x_x;
		obdscanService.Zdata.Out1Eng_x_InAirTempSen_x_x=obdscanService.Mout.Out1Eng_x_InAirTempSen_x_x;
		obdscanService.Zdata.Out1Eng_x_MAFSensor_x_x=obdscanService.Mout.Out1Eng_x_MAFSensor_x_x;
		obdscanService.Zdata.Out1Eng_x_EngLoad_x_x=obdscanService.Mout.Out1Eng_x_EngLoad_x_x;
		obdscanService.Zdata.Out1Eng_x_MfAbsPreSensor_x_x=obdscanService.Mout.Out1Eng_x_MfAbsPreSensor_x_x;
		obdscanService.Zdata.Out1Eng_x_AmbPre_x_x=obdscanService.Mout.Out1Eng_x_AmbPre_x_x;
		obdscanService.Zdata.Out1Eng_x_FuelCtrlLoopSta1_x_x=obdscanService.Mout.Out1Eng_x_FuelCtrlLoopSta1_x_x;
		obdscanService.Zdata.Out1Eng_x_ShortFT_x_x=obdscanService.Mout.Out1Eng_x_ShortFT_x_x;
		obdscanService.Zdata.Out1Eng_x_LongFT_x_x=obdscanService.Mout.Out1Eng_x_LongFT_x_x;
		obdscanService.Zdata.Out1Eng_x_FuelPreSensorVlt_x_x=obdscanService.Mout.Out1Eng_x_FuelPreSensorVlt_x_x;
		obdscanService.Zdata.Out1Eng_x_FRailPreSensor_x_x=obdscanService.Mout.Out1Eng_x_FRailPreSensor_x_x;
		obdscanService.Zdata.Out1Eng_x_IgnTiming_x_x=obdscanService.Mout.Out1Eng_x_IgnTiming_x_x;
		obdscanService.Zdata.Out1Eng_x_EvapEmiPSVInd_x_x=obdscanService.Mout.Out1Eng_x_EvapEmiPSVInd_x_x;
	};
	$scope.ygb = function(){//已关闭按钮
		$('.mingming span').html('已关闭');
		$('.jqqg-ygb').css('background','url("framework/obdscan/images/jqqg/ygb_2.png")');
		$('.jqqg-kl').css('background','url("framework/obdscan/images/jqqg/kl_1.png")');
		obdscanService.Zdata.obdscanData.jqqg.neiRong[1][1] = '点亮';
		obdscanService.Mint.In1OBD_ActTest_Q22_x_x = '1';
		if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
			xcjDataService.setCondition("v07","true");
		}
	};
	$scope.kl = function(){//开路按钮
		$('.mingming span').html('开路');
		$('.jqqg-ygb').css('background','url("framework/obdscan/images/jqqg/ygb_1.png")');
		$('.jqqg-kl').css('background','url("framework/obdscan/images/jqqg/kl_2.png")');
		obdscanService.Zdata.obdscanData.jqqg.neiRong[1][1] = '关闭';
		obdscanService.Mint.In1OBD_ActTest_Q22_x_x = '2';
		if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
			xcjDataService.setCondition("v08","true");
		}
	};

	$scope.cs_bhd = function(id){//不活动按钮
		$('.mingming span').html('不活动');
		$('.bg_1_left').css('background','url("framework/obdscan/images/wuyue/kl_2.png")');
		$('.bg_1_right').css('background','url("framework/obdscan/images/wuyue/kl_1.png")');
		if(id == "yqdd" || id == "zqdd"){
			obdscanService.Zdata.obdscanCS[id].neiRong[1][1] = '0';
		}
		if(id == "lbjdq" || id=="yuanguang"){obdscanService.Zdata.obdscanCS[id].neiRong[1][1] = '不活动'};
	};
	$scope.cs_jh = function(id){//激活按钮
		$('.mingming span').html('激活');
		$('.bg_1_left').css('background','url("framework/obdscan/images/wuyue/kl_1.png")');
		$('.bg_1_right').css('background','url("framework/obdscan/images/wuyue/kl_2.png")');
		if(id == "yqdd" || id == "zqdd"){
			obdscanService.Zdata.obdscanCS[id].neiRong[1][1] = '100';
		}
		if(id == "lbjdq" || id=="yuanguang"){obdscanService.Zdata.obdscanCS[id].neiRong[1][1] = '激活'};

	};
	var dzcsHK = 0;
	var dzcsZS = 0 ;
	$scope.dzcs_left = function(){
		$('.cxdcf-left').css({'width':'15px','height':'15px','background':'url("framework/obdscan/images/cxdcf/left_2.png")'});
		$('.cxdcf-right').css({'width':'19px','height':'19px','background':'url("framework/obdscan/images/cxdcf/right_1.png")'});
		if(obdscanService.Zdata.layerType=='lay2'){
				dzcsHK -= 10;
				if(dzcsHK <= 0){
					dzcsHK = 0;
				}
				$('.mingming span').html(dzcsHK + "%");
				$('.cxdcf-hk').css('left',dzcsHK*2.8+12+'px');

		}
		else if(obdscanService.Zdata.layerType=='lay6'){
			if(dzcsHK==0){
				dzcsHK = 500;
			}
			dzcsHK <= 0? dzcsHK = 0 : dzcsHK -= 150;
			dzcsZS <= 0? dzcsZS = 0 : dzcsZS -= 10;
			$('.mingming span').html(dzcsHK+"分钟转数");
			$('.cxdcf-hk').css('left',dzcsZS*2.8+12+'px');
		}
		else if(obdscanService.Zdata.layerType == 'lay5'){
			dzcsHK <= 0? dzcsHK = 0 : dzcsHK -= 2;
			dzcsZS <= 0? dzcsZS = 0 : dzcsZS -= 20;
			$('.mingming span').html(dzcsHK+"*");
			$('.bg_2_hk').css('left',dzcsZS*2.8+12+'px');
		}
		/*dzcsHK -= 10;
		if(dzcsHK <= 0){
			dzcsHK = 0;
			$('.cxdcf-hk').css('left','14px');
		}else{
			$('.cxdcf-hk').css('left',dzcsHK*2.8+12+'px');
		}
		$('.mingming span').html(dzcsHK + "%");*/
		obdscanService.Zdata.obdscanData.cxdcf.neiRong[1][1] = obdscanService.MoutOut1Eng_x_EvapEmiPSVInd_x_x;
		obdscanService.Mint.In1OBD_ActTest_Q12_x_x = dzcsHK.toString();
		if(dzcsHK==0){
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
				xcjDataService.setCondition("v10","0");
			}
		}

	};
	$scope.dzcs_right = function(){
		$('.cxdcf-right').css({'width':'15px','height':'15px','background':'url("framework/obdscan/images/cxdcf/right_2.png")'});
		$('.cxdcf-left').css({'width':'19px','height':'19px','background':'url("framework/obdscan/images/cxdcf/left_1.png")'});

		if(obdscanService.Zdata.layerType=='lay2'){

			dzcsHK += 10;
			if(dzcsHK >= 100){
				dzcsHK = 100;
			}
			$('.mingming span').html(dzcsHK + "%");
			$('.cxdcf-hk').css('left',dzcsHK*2.8+12+'px');
		}
		else if(obdscanService.Zdata.layerType=='lay6'){
			if(dzcsHK==0){
				dzcsHK = 500;
			}
			dzcsHK >= 2000? dzcsHK = 2000 : dzcsHK += 150;
			dzcsZS >= 100? dzcsZS = 100 : dzcsZS += 10;
			$('.mingming span').html(dzcsHK+"分钟转数");
			$('.cxdcf-hk').css('left',dzcsZS*2.8+12+'px');
		}
		else if(obdscanService.Zdata.layerType == 'lay5'){
			dzcsHK >= 10? dzcsHK = 10 : dzcsHK += 2;
			dzcsZS >= 100? dzcsZS = 100 : dzcsZS += 20;
			$('.mingming span').html(dzcsHK+"*");
			$('.bg_2_hk').css('left',dzcsZS*2.8+12+'px');
		}
		//else if(obdscanService.Zdata.layerType == 'lay5'){}

		console.log(obdscanService.Zdata.layerType)
		obdscanService.Zdata.obdscanData.cxdcf.neiRong[1][1] = obdscanService.MoutOut1Eng_x_EvapEmiPSVInd_x_x;
		obdscanService.Mint.In1OBD_ActTest_Q12_x_x = dzcsHK.toString();
		console.log("dzcsHK---"+dzcsHK);
		if(dzcsHK==50){
			if(pageService.Pint[pageService.Pdata.fault[xcjDataService.faultType].gzcs]=='0'){
				xcjDataService.setCondition("v06","50");
			}
		}

	};
	$scope.cs_close = function(id){
		$('.mingming span').html('关闭');
		$('.bg_1_left').css('background','url("framework/obdscan/images/wuyue/kl_2.png")');
		$('.bg_1_right').css('background','url("framework/obdscan/images/wuyue/kl_1.png")');
		if(id=='rybqy'){
			obdscanService.Zdata.obdscanData.rybqy.neiRong[1][1] = '关闭';
		}
		if(id=='ycgqjrq1'||id=='ycgqjrq2'){
			obdscanService.Zdata.obdscanData[id].neiRong[1][1] = '关闭';
			obdscanService.Zdata.obdscanData[id].neiRong[2][1] = '0';
			obdscanService.Zdata.obdscanData[id].neiRong[3][1] = '确定';
			obdscanService.Zdata.obdscanData[id].neiRong[4][1] = '确定';
		}
	};
	$scope.cs_dianliang = function(id){
		$('.mingming span').html('点亮');
		$('.bg_1_left').css('background','url("framework/obdscan/images/wuyue/kl_1.png")');
		$('.bg_1_right').css('background','url("framework/obdscan/images/wuyue/kl_2.png")');
		if(id=='rybqy'){
			obdscanService.Zdata.obdscanData.rybqy.neiRong[1][1] = '点亮';
		}
		if(id=='ycgqjrq1'||id=='ycgqjrq2'){
			obdscanService.Zdata.obdscanData[id].neiRong[1][1] = '点亮';
			obdscanService.Zdata.obdscanData[id].neiRong[2][1] = '100';
			obdscanService.Zdata.obdscanData[id].neiRong[3][1] = '未运行';
			obdscanService.Zdata.obdscanData[id].neiRong[4][1] = '未运行';
		}
	};
	$scope.cs_jiesuo = function(id){
		if(id=="xlxg"){
			$('.bg_1_long').css('background','url("framework/obdscan/images/wuyue/long_2.png")');
			obdscanService.Zdata.obdscanCS.xlxg.neiRong[1][1] = '激活';
		}
		if(id=='1'){
			$('#cms1').css('background','url("framework/obdscan/images/wuyue/cms_2.png")');
			$('#cms2').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			$('#cms3').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[1][1] = '激活';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[2][1] = '不活动';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[3][1] = '不活动';
		}
		if(id=='2'){
			$('#cms2').css('background','url("framework/obdscan/images/wuyue/cms_2.png")');
			$('#cms1').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			$('#cms3').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[2][1] = '激活';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[1][1] = '不活动';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[3][1] = '不活动';
		}
		if(id=='3'){
			$('#cms3').css('background','url("framework/obdscan/images/wuyue/cms_2.png")');
			$('#cms1').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			$('#cms2').css('background','url("framework/obdscan/images/wuyue/cms_1.png")');
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[3][1] = '激活';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[1][1] = '不活动';
			obdscanService.Zdata.obdscanCS.chemensuo.neiRong[2][1] = '不活动';
		}

	}

});
