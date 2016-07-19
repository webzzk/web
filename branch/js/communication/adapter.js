/**
 * @author  周博宇
 * 定义与后台通信对象
 * @construtor
 */
var url,domainUrl,question,order=[], totalScore=0,            //记录获取服务器时间的本地时间节点
    StudyTsUrl="web/api/token/getStudyTs";      //获取token，sessionId的服务器接口
startStudyUrl="/api/oper/study/startStudy",    //开始学习的服务器接口
    commitStudyUrl="/api/oper/study/commitStudy",  //提交的服务器接口
    exitStudyUrl="/api/oper/study/exitStudy";      //退出的服务器接口

function Adapter() {
    this.domainAccount = "";      //当前域名
    this.userEmail = "";          //当前用户email（当前账号唯一标识）
    this.sessionId = "";          //当前学习过程唯一标识
    this.token = "";              //当前学习过程口令
    this.courseNumber = "";       //当前学习课程编号
    this.faultNumber = "";        //当前学习故障编号
    this.code = "";               //随机验证码
    this.type = 1;                //课件类型
    this.seconds = 0;             //学习时间
    this.progress = 0;            //进度
    this.score = 0;               //得分
    this.isComplete = 0;          //是否完成
    this.isPass = 0;              //能否通过
    this.characterA = {
        progress:[],
        score:[],
        handle:[]
    };         //进度、得分、动作详细数据
    this.characterB = {};         //试题集合
    this.characterC = {};         //自定义参数
    this.courseName = "";         //课件名称
    this.passCondition = 0;       //通过条件
    this.completeCondition = 0;   //完成条件
    this.serverTime="";           //服务器返回时间
};

/**
 * @author zzk
 * 初始化必要参数
 */
Adapter.prototype.init = function () {
    var data=urlParse(location.search);
    this.courseNumber=data.courseNumber;
    this.faultNumber=data.faultNumber;
    domainUrl=data.domainUrl;
    this.userEmail=data.userEmail;
    this.domainAccount=data.domainAccount;
    this.code =data.code ;
};

/**
 * 解析url后面的数据的方法
 * @param search 传入url的search数据部分
 * @returns {{urlObj}} 返回一个以数据为属性的对象
 */
function urlParse(search){
    var urlObj={};
    if (search.indexOf("?") != -1) {
        var dataStr = search.substr(1).split("&");
        for (var i = 0, len = dataStr.length; i < len; i++) {
            var dataStrsin = dataStr[i].split("=");
            urlObj[dataStrsin[0]] = dataStrsin[1];
        }
    }
    return urlObj;
}

/**
 * @author zzk
 * 获取token，sessionId
 */
Adapter.prototype.getStudyTs = function () {
    var _this=this,data={"userEmail":this.userEmail,"code":this.code};
    var getStudyTsUrl=domainUrl+StudyTsUrl;
    $.ajax({
        type: 'get',
        url: getStudyTsUrl,
        data:data,
        dataType:"jsonp",
        jsonp:"callback",
        success:function(data){
            if(data.errCode=="0"){
                _this.sessionId=data.sessionId;
                _this.token=data.token;
            }else{
                if(data.errCode=="-1"){
                    $("#errorPop,#busy").show();
                }
                console.log(data.errCode);
            }

        },
        error: function(){console.log('Error');}
    });

};

/**
 * @author zzk
 * 开始学习
 * @param progress 进度数组对象
 * @param paper 试题数组对象
 * @param handle 动作数组对象
 */
Adapter.prototype.startStudy=function(progress,paper,handle){
    var _this=this;
    this.characterC.questionOrde=[];
    url='http://'+location.host+startStudyUrl;
    var obj={};
    obj.adapter=JSON.stringify(this);
    $.ajax({
        type:"POST",
        url:url,
        dataType:"json",
        data: obj,
        success:function(data){
            if(data.errCode=="0") {
                totalScore=data.adapter.totalScore;
                order=data.adapter.characterB.question;
                _this.domainAccount = data.adapter.domainAccount;
                _this.userEmail = data.adapter.userEmail;
                _this.sessionId = data.adapter.sessionId;
                _this.token = data.adapter.token;
                _this.courseNumber = data.adapter.courseNumber;
                _this.faultNumber = data.adapter.faultNumber;
                _this.code = data.adapter.code;
                _this.type = data.adapter.type;
                _this.seconds = data.adapter.seconds;
                _this.progress = data.adapter.progress;
                _this.score = data.adapter.score;
                _this.isComplete = data.adapter.isComplete;
                _this.isPass = data.adapter.isPass;
                _this.courseName = data.adapter.courseName;
                _this.passCondition = data.adapter.passCondition;
                _this.completeCondition = data.adapter.completeCondition;
                _this.serverTime = data.adapter.serverTime;
                _this.characterC = data.adapter.characterC;
                _this.analyzeCharacter(data.adapter.characterA, data.adapter.characterB, progress, paper, handle);
                progress.rate = _this.progress;
                paper.rate = _this.score;
            }
            if(data.errCode=="-1"){
                $("#errorPop,#busy").show();
            }
        },
        error: function(){console.log('Error');}
    });

};

/**
 * * @author zzk
 * 解析学习数据字符串
 * @param characterA 平台返回的进度、得分、动作详细数据
 * @param characterB 平台返回的的试题合集
 * @param progress 进度数组对象
 * @param paper 试题数组对象
 * @param handle 动作数组对象
 */
Adapter.prototype.analyzeCharacter = function (characterA, characterB, progress, paper, handle) {
    //初始化handle valueArray
    analyzeValueAry(characterB.value,handle.valueMap);

    //初始化handle.actionMap
    analyzeHandleAry(characterB.handle,handle);

    //初始化progressMap.array
    analyzeProgressAry(characterB.progress,progress.progressMap,handle);

    //初始化paper exclusiveArray
    analyzeExclusiveAry(characterB.exclusive,paper.exclusiveArray);

    //初始化 paper questionArray
    analyzeQuestionAry(characterB.question,paper.questionArray);

    //初始化paper scoreArray
    analyzeScoreObject(characterB.score,paper,handle);

    characterA=JSON.parse(characterA);
    if (characterA.progress.length!=0) {
        for(var i=0;i<characterA.progress.length;i++){
            progress.setProgress(characterA.progress[i].id);
        }
    }
    if (characterA.score.length!=0) {
        for(var j=0;j<characterA.score.length;j++){
            var ids=[];
            if(characterA.score[j].optionArray.length!="0"){
                for(var k=0;k<characterA.score[j].optionArray.length;k++){
                    ids.push(characterA.score[j].optionArray[k].id);
                }
                paper.setQuestion(paper.scoreMap.get(characterA.score[j].id).questionID,ids.join(","),true);
            }
        }
    }
    if (characterA.handle.length!=0) {
        for(var x=0;x<characterA.handle.length;x++){
            if(handle.actionMap.find(characterA.handle[x].id)){
                handle.setHandle(characterA.handle[x].id,progress,paper,characterA.handle[x].time);
            }
            //    handle.actionMap.get(characterA.handle[x].id).isAction=true;
            //    handle.actionMap.get(characterA.handle[x].id).time=characterA.handle[x].time;
            //    handle.handleArray.push(handle.actionMap.get(characterA.handle[x].id));
            //}
        }
        handle.isUpdate=true;
    }
    progress.sumProgressStr();
    paper.sumScoresStr();
    handle.sumHandleStr();
    // console.log(paper.scoresStr);
    // console.log(handle.handleStr);
};

/**
 * 初始化得分对象
 * @param scoreObjects 获取的得分对象数组
 * @param paper 试题对象
 * @param handle 动作对象
 */
function analyzeScoreObject(scoreObjects,paper,handle){
    for(var i=0;i<scoreObjects.length;i++){
        var scoreObject=new ScoreObject(
            scoreObjects[i].id,
            scoreObjects[i].rate,
            scoreObjects[i].questionId
        );
        if(scoreObjects[i].handleId){
            if(handle.actionMap.find(scoreObjects[i].handleId)){
                var handleObject=handle.actionMap.get(scoreObjects[i].handleId);
                handleObject.SID=scoreObject.id;
                scoreObject.handleArray.push(handleObject);
            }
        }
        paper.scoreMap.put(scoreObject.id,scoreObject);
    }
}

/**
 * 初始化数值对象
 * @param objects 传入的获取的数组
 * @param map 要存入的map对象
 */
function analyzeValueAry(objects,map){
    for(var i=0;i<objects.length;i++){
        var valueObject=new ValueObject(
            objects[i].id,
            objects[i].discription,
            objects[i].value
        );
        map.put(valueObject.id,valueObject);
    }
};

/**
 * 初始化互斥得分对象
 * @param objects 传入的获取的数组
 * @param array 要存入的array对象
 */
function analyzeExclusiveAry(objects,array){
    for(var i=0;i<objects.length;i++){
        var exclusiveObject=new ExclusiveObject(
            objects[i].idArray,
            objects[i].priorityId
        );
        array.push(objects[i]);
    }
};

/**
 * 初始化动作对象
 * @param handleObjects 传入的获取的数组
 * @param handle 动作对象
 */
function analyzeHandleAry(handleObjects,handle){
    for(var i= 0;i<handleObjects.length;i++){
        var handleObject=new HandleObject(
            handleObjects[i].id,
            handleObjects[i].rate);
        for(var j= 0;j<handleObjects[i].condition.length;j++){
            var conditionObject=new ConditionObject(
                handleObjects[i].condition[j].id,
                handleObjects[i].condition[j].linkVID,
                handleObjects[i].condition[j].cdt,
                handleObjects[i].condition[j].cdtID,
                handleObjects[i].condition[j].cdtValue
            );
            conditionObject.linkHID=handleObjects[i].id;
            if(handle.valueMap.find(handleObjects[i].condition[j].linkVID)){
                handle.valueMap.get(handleObjects[i].condition[j].linkVID).cdtMap.put(conditionObject.id,conditionObject);
            }
            handleObject.conditionMap.put(conditionObject.id,conditionObject);
        }
        handle.actionMap.put(handleObject.id,handleObject);
    }
}

/**
 * 初始化动作对象
 * @param progressObjects 传入的获取的数组
 * @param map 要存入的map对象
 * @param handle 动作对象
 */
function analyzeProgressAry(progressObjects,map,handle){
    for(var i= 0;i<progressObjects.length;i++){
        var progressObject=new ProgressObject(
            progressObjects[i].id,
            progressObjects[i].rate
        );
        if(handle.actionMap.find(progressObjects[i].handleId)){
            var idArray=progressObjects[i].handleId.split(",");
            for(var j=0;j<idArray.length;j++){
                var handleObject=handle.actionMap.get(idArray[j]);
                handleObject.PID=progressObjects[i].id;
                progressObject.handleArray.push(handleObject);
            }
        }
        map.put(progressObject.id,progressObject);
    }
}

/**
 * 初始化试题对象
 * @param questionObjects 传入的获取的数组
 * @param array 要存入的array对象
 */
var flag;
function analyzeQuestionAry(questionObjects,array){
    for(var i=0;i<questionObjects.length;i++){
        var descriptionObject=questionObjects[i].description;
        if(typeof(questionObjects[i].description)=="Object"){
            for(var j=0;j<questionObjects[i].description.optionArray.length;j++){
                var desOptionObject=new DesOptionObject(
                    questionObjects[i].description.optionArray[j].linkOptionID,
                    questionObjects[i].description.optionArray[j].description,
                    questionObjects[i].description.optionArray[j].isSub
                );
            }
            descriptionObject=new DescriptionObject(
                questionObjects[i].description.dtArray.concat(),
                desOptionObject
            );
        }
        var questionObject=new QuestionObject(
            questionObjects[i].id,
            questionObjects[i].rate,
            questionObjects[i].type,
            descriptionObject,
            questionObjects[i].kp,
            questionObjects[i].remark
        );
        if(questionObjects[i].option){
            analyzeOptionAry(questionObjects[i].option,questionObject.optionArray);
        }
        if(flag){
            if(questionObjects[i].question){
                analyzeOptionAry(questionObjects[i].question.option,questionObject.optionArray);
            }
        }
        if(questionObjects[i].type=="5"){
            flag=true;
        }
        if(questionObjects[i].question){
            arguments.callee(questionObjects[i].question,questionObject.questionArray);
        }
        array.push(questionObject);
    }
}

/**
 * 初始化选项对象
 * @param optionObjects 传入的获取的数组
 * @param array 要存入的数组对象
 */
function analyzeOptionAry(optionObjects,array){
    if(optionObjects){
        for(var i=0;i<optionObjects.length;i++){
            var optionObject=new OptionObject(
                optionObjects[i].id,
                optionObjects[i].description,
                optionObjects[i].isRight
            );
            if(optionObjects[i].option){
                arguments.callee(optionObjects[i].option,optionObject.optionArray);
            }
            array.push(optionObject);
        }
    }
}

/**
 * @author 周博宇
 * 合成学习数据字符串
 * @param progress 进度数组对象
 * @param paper 试题数组对象
 * @param handle 动作数组对象
 */
Adapter.prototype.composeCharacter = function (progress, paper, handle) {
    progress.sumRate();
    progress.sumProgressStr();
    this.characterA.progress= progress.progressStr;
    paper.sumScoresStr();
    paper.sumRate();
    this.characterA.score = paper.scoresStr;
    handle.sumHandleStr();
    this.characterA.handle = handle.handleStr;
    this.rate = progress.rate;
    this.score = paper.rate;
};

/**
 * @author 周博宇
 * 提交学习
 * @param progress 进度数组对象
 * @param paper 试题数组对象
 * @param handle 动作数组对象
 */

Adapter.prototype.commitStudy = function (progress, paper, handle) {
    this.composeCharacter(progress, paper, handle);
    var _this=this;
    var obj1={};
    console.log(this.score);
    obj1.adapter=JSON.stringify(this);
    url="http://"+location.host+commitStudyUrl;
    $.ajax({
        type: 'post',
        url: url,
        data:obj1,
        dataType:"json",
        success:function(data){
            if(data.errCode=="0"){
                _this.serverTime=data.serverTime;
            }else{
                if(data.errCode=="-1"){
                    $("#errorPop , #busy").show();
                }
                console.log(data.errCode);
            }
        },
        error:function(e){
            console.error(e);
        }
    });
};

/**
 * @author 周博宇
 * 退出学习
 * @param progress 进度数组对象
 * @param paper 试题数组对象
 * @param handle 动作数组对象
 */
Adapter.prototype.exitStudy = function (progress, paper, handle) {
    this.composeCharacter(progress, paper, handle);
    var _this=this;
    var obj2={};
    obj2.adapter=JSON.stringify(this);
    url="http://"+location.host+exitStudyUrl;
    $.ajax({
        type: 'post',
        url: url,
        data:obj2,
        dataType:"json",
        success:function(data){
            if(data.errCode!="0"){
                console.log(data.errCode);
            }
        },
        error:function(e){
            console.error(e);
        }
    });
};
