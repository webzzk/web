/**
 * @author Administrator
 */
var appService = angular.module('xcj.Service', [
	'xcj.validate'
]);

appService.service('xcjService', function($http, $rootScope, $timeout,validateService) {
	$.xcj = $.xcj || {};
	$.xcj.content = $.xcj.content || {};

	$.xcj.content.study = $.xcj.content.study || {};

	/**
	 * 课件基础属性定义
	 */
	$.xcj.content.study.baseParame = {
		isAtive : true, //debug模式状态,类型: Boolean//日志统一方法
		isAuto : true, //是否自动提交数据状态,类型: Boolean
		faultType:"SBT_VER_001",//sbt故障类型
		action:[],//添加动作id
		score:[],//得分id
		actionTime:0,
		setTime:30000,
		currentTime:0,//是从平台获取的时间戳
		autoTime :0 ,//自动提交数据时间,毫秒-类型: Integer
		answers:{
			"SBT_VER_001":{ "q02_01":{isRight : false,score : "4",kp:"12",ranswer : "q02_01_a2"},
				"q02_02":{isRight : false,score : "6",kp:"12",ranswer : "q02_02_a1"},
				"q03_01":{isRight : false,score : "4",kp:"12",ranswer : "q03_01_a1"},
				"q03_02":{isRight : false,score : "4",kp:"12",ranswer : "q03_02_a2"},
				"q03_03":{isRight : false,score : "4",kp:"12",ranswer : "q03_03_a2"},
				"q04_01":{isRight : false,score : "4",kp:"12",ranswer : "选项一11"},
				"q05_01_01_01":{isRight : false,score : "4",kp:"12",ranswer : "q05_01_01_01_a2"},
				"q05_01_02_01":{isRight : false,score : "4",kp:"12",ranswer : "q05_01_02_01_a2"},
				"q05_02_01_01":{isRight : false,score : "4",kp:"12",ranswer : "q05_02_01_01_a1"},
				"q05_04":{isRight : false,score : "4",kp:"12",ranswer : "aa选项一"},
				"q06_01_01":{isRight : false,score : "4",kp:"12",ranswer : "q06_01_01_a1"},
				"q07_01":{isRight : false,score : "4",kp:"12",ranswer : "q07_01_a2"},
				"q07_02":{isRight : false,score : "4",kp:"12",ranswer : "q07_02_a1"},
				"q08_01_01":{isRight : false,score : "6",kp:"12",ranswer : "q08_01_01_a1"},
				"q09_01_01":{isRight : false,score : "4",kp:"12",ranswer : "q09_01_01_a2"},
				"q10_01_02":{isRight : false,score : "4",kp:"12",ranswer : "元件损坏1"},
				"q10_02_02":{isRight : false,score : "4",kp:"12",ranswer : "线路区间2"},
				"q10_02":{isRight : false,score : "4",kp:"12",ranswer : "q10_02_a2"}
			}
		}



};

	/*
	 * 课件属性定义(和平台交互)
	 */
	$.xcj.content.study.parame = {
		token : "", //token码,必填字段,类型: String
		courseNumber : "", //课件编号,必填字段,类型: String
		userEmail : "", //用户邮箱,必填字段,类型: String
		domainUsername : "", //域名称,必填字段,类型: String
		sessionId : "", //sessionId,必填字段,类型: String
		receive : "", //提交数据,类型: String
		character :{'action':'','question':[],type:"sbt",'param':'{In1_BATT_PO : "0"}'} , //长字符串(传输数据用,可以为空),类型: String {'action':"",，‘question’：“”，'param':"characterC"}
		progress : 0, //进度,必填字段,类型: Integer
		score : 0, //得分,必填字段,类型: Integer
		isComplete : 1, //是否完成1完成;0未完成,必填字段,类型: Integer
		isPass : 1, //是否通过1通过;0未通过,必填字段,类型: Integer
		actionTime : 0
	};
	/**
	 * 验证测评属性
	 */
	$.xcj.content.study.validaStudyData = function(){
		var parame = $.xcj.content.study.parame;
		if(validateService.checkString(parame.token,'token')
			&& validateService.checkString(parame.courseNumber,'courseNumber')
			&& validateService.checkString(parame.courseNumber,'courseNumber')
			&& validateService.isEmail(parame.userEmail,'userEmail')
			&& validateService.checkString(parame.domainUsername,'domainUsername')
			&& validateService.checkString(parame.sessionId,'sessionId')
				//&& validateService.checkString(parame.receive,'receive')
				//&& validateService.isString(parame.character,'character')
			&&validateService.isNum(parame.progress,'progress')
			&&validateService.checkNumber(parame.score,'score')
			&&validateService.isPass(parame.isComplete,'isComplete')
			&&validateService.isPass(parame.isPass,'isPass')){
			return true;
		}
		return false;
	};

	/**
	 * 初始化学习数据接口(第一次学习调用)
	 */
	$.xcj.content.study.initStudyData = function(param){
		$.xcj.content.study.parame.userEmail=param.userEmail;
		$.xcj.content.study.parame.courseNumber=param.courseName;
		$.xcj.content.study.parame.domainUsername=param.domainName;
		$.xcj.content.study.parame.token=param.token;
		$.xcj.content.study.parame.sessionId=param.sessionId;

		if($.xcj.content.study.validaStudyData()){
			var init = content.study.startStudy($.xcj.content.study.parame.token,
				$.xcj.content.study.parame.courseNumber,
				$.xcj.content.study.parame.userEmail,
				$.xcj.content.study.parame.domainUsername,
				$.xcj.content.study.parame.sessionId);

			if(init.errCode=="0"){

				if(init.data.characterC == null){//第一次学习
					//需要课件那边把所有章节赋值到characterC中
					$.xcj.content.study.parame.actionTime = 0;
					$.xcj.content.study.parame.isComplete = 0;
					$.xcj.content.study.parame.isPass = 0;
					$.xcj.content.study.parame.score = 0;
					$.xcj.content.study.parame.progress = 0;
					$.xcj.content.study.parame.character = {'action':'','question':[],'param':{progress:[]}} ;
					$.xcj.content.study.parame.character.action= "";
					$.xcj.content.study.parame.receive = "";
					$.xcj.content.study.baseParame.autoTime=init.data.seconds;
				}else{
					$.xcj.content.study.parame.isComplete = init.data.isComplete;
					$.xcj.content.study.parame.isPass = init.data.isPass;
					$.xcj.content.study.parame.character={};
					$.xcj.content.study.parame.character.action =JSON.parse(init.data.characterA).action;
					$.xcj.content.study.parame.character.question= JSON.parse(init.data.characterA).question;
					$.xcj.content.study.parame.character.param= JSON.parse(init.data.characterA).param;
					$.xcj.content.study.parame.score =JSON.parse(init.data.characterC).score;
					$.xcj.content.study.parame.receive = "";
					$.xcj.content.study.baseParame.autoTime=init.data.seconds;

				}

			}
		}
	};

	/**
	 * 定时器，用于定时提交课件信息
	 */

	//setInterval($.xcj.content.study.autoCommitStudyData(),$.xcj.content.study.baseParame.autoTime);
	/**
	 * 计算得分
	 * */
	$.xcj.content.study.calculateScore=function() {
		var question=$.xcj.content.study.baseParame.answers.SBT_VER_001;
		var score=0;
		for(var props in question){
			if(question[props].isRight){
				score+=parseInt(question[props].score);
			}
		}
		$.xcj.content.study.parame.score=score;
	};

	/**
	 * 提交学习数据接口(课件学习和退出调用)
	 */
	$.xcj.content.study.commitStudyData = function(){
		$.xcj.content.study.parame.receive="提交";
		//计算进度方法
		$.xcj.content.study.calculateScore();
		//设置进度数组
		//$.xcj.content.study.getStudyProgressData();
		//验证方法
		//alert(JSON.stringify($.xcj.content.study.parame.character))
		//var logs =content.study.commitStudy($.xcj.content.study.parame.character);
		if($.xcj.content.study.validaStudyData()){
			var data = $.extend(true, {}, $.xcj.content.study.parame);
			//data.character.action=$.xcj.content.study.baseParame.action.join("_");
			//data.score=$.xcj.content.study.parame.character.param.score;
			//alert(JSON.stringify($.xcj.content.study.parame.character.question))
			//data.character=JSON.stringify(data.character);

			var logs =content.study.commitStudy(data);

			//console.log(logs);
		}else{
			//console.log();
			//调用日志方法，输出错误日志
		}

	};

	/**
	 * 学习退出方法
	 * */
	$.xcj.content.study.exit=function(){
		$.xcj.content.study.parame.receive="退出";
		//计算进度方法
/*		$.xcj.content.study.calculateScore();
		$.xcj.content.study.getStudyProgressData();
		var data = $.extend(true, {}, $.xcj.content.study.parame);
		data.character.action=$.xcj.content.study.baseParame.action.join("_");
		data.score=$.xcj.content.study.parame.character.param.score;
		data.character=JSON.stringify(data.character);
		var logs = content.study.exitStudy(data);*/
		//console.log(logs);
	};


	/**
	 * 自动提交学习数据方法(定时2分钟自动调用)
	 */
	$.xcj.content.study.autoCommitStudyData = function(){
		if($.xcj.content.study.baseParame.isAuto){
			setInterval(function () {
				//alert($.xcj.content.study.baseParame.action);
				//$.xcj.content.study.commitStudyData();
			}, $.xcj.content.study.baseParame.autoTime);
		}
	};

	/**
	 * 设置进度数组接口   ****
	 */
	$.xcj.content.study.setStudyProgressData=function(progress){
		//赋值
		var character = $.xcj.content.study.parame.character.param;
		for(var i=0;i<character.progress.length;i++){
			if(character.progress[i].postedId==progress.postedId){
				character.progress[i].status=progress.status;
				character.progress[i].score=progress.score;
				return ;
			}
		}

	};

	/**
	 * 设置charater属性
	 * */

	$.xcj.content.study.setCharacter=function(action,question,param){
		$.xcj.content.study.parame.character.action=action;
		$.xcj.content.study.parame.character.question=question;
		$.xcj.content.study.parame.character.param=param;
	};

	/**
	 * 计算进度方法
	 *
	 */
	$.xcj.content.study.getStudyProgressData = function(){
		//先验证
		var character=$.xcj.content.study.parame.character;
		var progress=character.param.progress;
		//var question=character.question;
		if( progress.length > 0 && progress!=undefined){
			//计算progress
			var num=0;
			for( var i=0; i < progress.length; i++ ){
				if(progress[i].status){
					num=num+1;
				}
			}
			//console.log(m+"----------");
			$.xcj.content.study.parame.progress=parseInt((num/progress.length)*100);
			//console.log($.xcj.content.study.parame.progress+"$$$$$$$$");
/*			//计算score
			$.xcj.content.study.parame.score=0;
			for( var j=0; j < question.length; j++ ){
				if(question[j].isRight=="1"){
					$.xcj.content.study.parame.score+=question[j].score;
				}
			}*/
		}
	};

	/**
	 * 计算是否完成和是否通过方法 ????
	 * */
	$.xcj.content.study.getStudyCompleteData=function(){
		//先验证
		var parame=$.xcj.content.study.parame;
		var complete=parame.character.param.complete;
		var pass=parame.character.param.pass;
		var score=parame.score;

		var baseParame = $.xcj.content.study.baseParame;
		if(validateService.isNum(complete) && validateService.isNum(pass)){
			$.xcj.content.study.parame.isComplete= parame.progress > complete ? 1 : 0;
			$.xcj.content.study.parame.isPass = score > pass ? 1 : 0;
			content.log($.xcj.content.study.parame.isComplete,$.xcj.content.study.parame.isPass);
		}
	};

	return $.xcj.content.study;

});
