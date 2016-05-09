/**
 *	   __  ___												 
 *	  /  |/  / ___   _____ _____ ___   ____   ____ _ ___   _____
 *   / /|_/ / / _ / / ___// ___// _ / / __ / / __ `// _ / / ___/
 *  / /  / / /  __/(__  )(__  )/  __// / / // /_/ //  __// /	
 * /_/  /_/ /___//____//____/ /___//_/ /_/ /__, / /___//_/	 
 *
 */
define(function (require) {
  // ��Ϣǰ׺, ����ʹ���Լ�����Ŀ��, �������Ŀ֮��ĳ�ͻ
  var prefix = "[PROJECT_NAME]",
    supportPostMessage = 'postMessage' in window;
  // Target ��, ��Ϣ����
  function Target(target, name){
    var errMsg = '';
    if(arguments.length < 2){
      errMsg = 'target error - target and name are both requied';
    } else if (typeof target != 'object'){
      errMsg = 'target error - target itself must be window object';
    } else if (typeof name != 'string'){
      errMsg = 'target error - target name must be string type';
    }
    if(errMsg){
      throw new Error(errMsg);
    }
    this.target = target;
    this.name = name;
  }
  // �� target ������Ϣ, ���ڰ�ȫ����, ������Ϣ�����ǰ׺
  if ( supportPostMessage ){
    // IE8+ �Լ��ִ������֧��
    Target.prototype.send = function(msg){
      this.target.postMessage(prefix + msg, '*');
    };
  } else {
    // ����IE 6/7
    Target.prototype.send = function(msg){
      var targetFunc = window.navigator[prefix + this.name];
      if ( typeof targetFunc == 'function' ) {
        targetFunc(prefix + msg, window);
      } else {
        throw new Error("target callback function is not defined");
      }
    };
  }
  // ��ʹ��
  function Messenger(name){
    this.targets = {};
    this.name = name;
    this.listenFunc = [];
    this.initListen();
  }
  // ���һ����Ϣ����
  Messenger.prototype.addTarget = function(target, name){
    var targetObj = new Target(target, name);
    this.targets[name] = targetObj;
  };
  // ��ʼ����Ϣ����
  Messenger.prototype.initListen = function(){
    var self = this;
    var generalCallback = function(msg){
      if(typeof msg == 'object' && msg.data){
        msg = msg.data;
      }
      // ������Ϣǰ׺
      msg = msg.slice(prefix.length);
      for(var i = 0; i < self.listenFunc.length; i++){
        self.listenFunc[i](msg);
      }
    };
    if ( supportPostMessage ){
      if ( 'addEventListener' in document ) {
        window.addEventListener('message', generalCallback, false);
      } else if ( 'attachEvent' in document ) {
        window.attachEvent('onmessage', generalCallback);
      }
    } else {
      // ����IE 6/7
      window.navigator[prefix + this.name] = generalCallback;
    }
  };
  // ������Ϣ
  Messenger.prototype.listen = function(callback){
    this.listenFunc.push(callback);
  };
  // �㲥��Ϣ
  Messenger.prototype.send = function(msg){
    var targets = this.targets,
      target;
    for(target in targets){
      if(targets.hasOwnProperty(target)){
        targets[target].send(msg);
      }
    }
  };
  return Messenger;
});