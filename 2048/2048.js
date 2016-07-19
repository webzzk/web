var game={
		data:[],//单元格中的所有数字
		score:0,
		state:1,
		RUNNING:1,
		GAME_OVER:0,
		PLAYING:2,//动画正在播放中
		start:function(){//启动游戏时调用
			this.data=[[0,0,0,0],
					   [0,0,0,0],
					   [0,0,0,0],
					   [0,0,0,0]];
			//在两个随机位置生成2或4
			this.score=0;
			this.state=this.RUNNING;
			var div=document.getElementById("gameOver");
			div.style.display="none";
			this.randomNum();this.randomNum();
			this.updateView();
		},
		isFull:function(){
			for(row=0;row<4;row++){
				for(col=0;col<4;col++){
					if(this.data[row][col]==0){return false;}
					
				}
			}return true;
		},
		randomNum:function(){	//在随机位置生成2或4
			if(this.isFull()){return;}
			//随机条件：true
			while(true){
			//随机在0-3行中生成一个行下标row
			//			Math.floor(Math.random()*(max-min+1)+min)
				var row=Math.floor(Math.random()*4);
			//随机在0-3列中生成一个列下标col
				var col=Math.floor(Math.random()*4);
			//如果该位置==0
			//	随机选择2或4，
			//		如果Math.random()<0.5,选2,否则4
			//	放入该位置
			//	退出循环
				if(this.data[row][col]==0){
					this.data[row][col]=Math.random()<0.5?2:4;
					break;
				}	
			}	
		},

		/*________________________实现左移______________________*/
		canLeft:function(){
		//遍历每个元素(除最左侧列之外)
			for(var row=0;row<4;row++){
				for(var col=1;col<4;col++){
		//	只要发现任意元素左侧值===或 当前值==左侧值
					if(this.data[row][col]!=0){
						if(this.data[row][col-1]==0||this.data[row][col-1]==this.data[row][col]){
							return true;
						}
					}
				}
			}return false;
		},
		moveLeft:function(){//左移所有行
			//左移4行
			if(this.canLeft()){//先判断能否左移
				for(var row=0;row<4;row++){
					this.moveLeftInRow(row);
				}
				this.state=this.PLAYING;
				animation.start();
				setTimeout(function(){
					game.state=game.RUNNING;
					game.randomNum();
					game.updateView();
				},animation.times*animation.interval);
			}
		},
		moveLeftInRow:function(row){//左移一行
		//从0位置开始到2结束，遍历row行中每个元素
			for(var col=0;col<=2;col++){
		//	获得下一个不为0的元素的nextCol下标
				var nextCol=this.getNextRight(row,col);
				if(nextCol==-1){//如果nextCol==-1
					break;
				}
				else{//否则，判断合并
					//如果自己=0
					if(this.data[row][col]==0){
						//自己与下一个元素替换
						this.data[row][col]=this.data[row][nextCol];
						//下一个元素为0
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
						col--;//col留在原地
					}
					else if(this.data[row][col]==this.data[row][nextCol]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
					}
				}

			}
		},
		//获得当前行中，指定位置右侧第一个不为0的数
			//返回下一个不为0的数
		getNextRight:function(row,col){
			//遍历row行中col右侧右侧的每个元素
			for(var i=col+1;i<4;i++){
			//	只要发现!=0的
				if(this.data[row][i]!=0){
			//		就返回其位置下标
					return i;
				}
			}return -1;
			
			
			//	就返回下一个位置nextCol
			//退出循环，返回-1
		},
		
		/*将游戏数据整体更新到页面上*/
		updateView:function(){
		//step1:遍历二维数组中的每个元素
			for(row=0;row<4;row++){
				for(col=0;col<4;col++){
					//step2:找到和当前数组对应的div
					//	拼div的id:c+row+col
					//	var div=document.getElementById();	
					//step3:将当前元素的值放入div中
					//	div.innerHTML=?
					//	如果当前值==0，放入""
					//	否则放入当前值
					//step4:根据当前元素值修改div样式类
					//	div.className="类名"
					//	如果当前值==0，className="cell"
					//	否则className="cell n"+当前值
					var div=document.getElementById("c"+row+col);
						div.innerHTML=this.data[row][col]==0?"":this.data[row][col];
						div.className=this.data[row][col]==0?"cell":"cell n"+this.data[row][col];
					
				}	
			}
			/*将分数插入span*/
			var span=document.getElementById("score");
			span.innerHTML=this.score;
			/*判断游戏结束*/
			//如果游戏结束，
			if(this.isGameOver()){
				this.state=this.GAME_OVER;
				//显示游戏结束div
				//找到gameOver div
				var div=document.getElementById("gameOver");
				var finalScore=document.getElementById("finalScore");
					finalScore.innerHTML=this.score;
				//修改div的style.display
				div.style.display="block";
			}
			
		},
		

/*___________________________________________________	右	___________________________________________________*/
		canRight:function(){/*判断能否右移*/
			for(var row=0;row<4;row++){
				for(var col=0;col<3;col++){
					if(this.data[row][col]!=0){
						if(this.data[row][col+1]==0||this.data[row][col]==this.data[row][col+1]){
							return true;
						}
					}
				}
			}return false;
		},
		moveRight:function(){/*向右移动所有行*/
			if(this.canRight()){
				for(var row=0;row<4;row++){
					this.moveRightInRow(row);
				}
				this.state=this.PLAYING;
				animation.start();
				setTimeout(function(){
					game.state=game.RUNNING;
					game.randomNum();
					game.updateView();
				},animation.times*animation.interval);
			}
		},
		moveRightInRow:function(row){/**/
			for(var col=3;col>0;col--){
		//	获得下一个不为0的元素的nextCol下标
				var nextCol=this.getNextLeft(row,col);
				if(nextCol==-1){//如果nextCol==-1
					break;
				}
				else{//否则，判断合并
					//如果自己=0
					if(this.data[row][col]==0){
						//自己与下一个元素替换
						this.data[row][col]=this.data[row][nextCol];
						//下一个元素为0
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
						col++;//col留在原地
					}
					else if(this.data[row][col]==this.data[row][nextCol]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
					}
				}

			}
		},
		getNextLeft:function(row,col){
			for(var i=col-1;i>=0;i--){
				if(this.data[row][i]!=0){
					return i;
				}
			}return -1;	
		},

	/*_________________________________________________	上 _________________________________________*/
		canUp:function(){
			for(var row=1;row<4;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]!=0){
						if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){
							return true;
						}
					}
				}
			}return false;
		},
		moveUp:function(){
			if(this.canUp()){
				for(var col=0;col<4;col++){
					this.moveUpInCol(col);
				}
				this.state=this.PLAYING;
				animation.start();
				setTimeout(function(){
					game.state=game.RUNNING;
					game.randomNum();
					game.updateView();
				},animation.times*animation.interval);
			}
		},
		moveUpInCol:function(col){
			for(var row=0;row<3;row++){
				var nextRow=this.getNextDown(row,col);
				if(nextRow==-1){break;}
				else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[nextRow][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
						row--;
					}
					else if(this.data[row][col]==this.data[nextRow][col]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
					}
				}
			}
		},
		getNextDown:function(row,col){
			for(var i=row+1;i<4;i++){
				if(this.data[i][col]!=0){
					return i;
				}
			}return -1;
		},
/*_______________________________________________	下	______________________________________________*/
		canDown:function(){
			for(var row=0;row<3;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]!=0){
						if(this.data[row+1][col]==0||this.data[row][col]==this.data[row+1][col]){
							return true;
						}
					}
				}
			}return false;
		},
		moveDown:function(){
			if(this.canDown()){
				for(var col=0;col<4;col++){
					this.moveDownInCol(col);
				}
				this.state=this.PLAYING;
				animation.start();
				setTimeout(function(){
					game.state=game.RUNNING;
					game.randomNum();
					game.updateView();
				},animation.times*animation.interval);
			}
		},
		moveDownInCol:function(col){
			for(var row=3;row>0;row--){
				var nextRow=this.getNextUp(row,col);
				if(nextRow==-1){break;}
				else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[nextRow][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
						row++;
					}
					else if(this.data[row][col]==this.data[nextRow][col]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
					}
				}
			}
		},
		getNextUp:function(row,col){
			for(var i=row-1;i>=0;i--){
				if(this.data[i][col]!=0){
					return i;
				}
			}return -1;
		},
		isGameOver:function(){/*判断游戏是否结束*/
		//能继续时返回false，否则返回true
			for(var row=0;row<4;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]==0){return false;}
					if(col<3){//检查右侧相邻
						if(this.data[row][col]==this.data[row][col+1]){
							return false;
						}
					}
					if(row<3){
						if(this.data[row][col]==this.data[row+1][col]){
							return false;
						}
					}
				}
			}return true;
		},
	}

		/*******************/	
//当窗口加载后，调用game对象的start方法
window.onload=function(){//事件处理函数
	game.start();
	/*_____键盘响应按键时间____*/
	document.onkeydown=function(){
		if(game.state!=game.PLAYING){
			//step1:先获得事件对象！
				//所有事件发生时，都自动创建一个event对象
				//event对象中封装了事件信息：
					//比如：鼠标坐标，触发事件的元素，按键的编号
			var event=window.event||arguments[0];
						//	IE			其他
				//	||	经常用来解决浏览器兼容性问题
			//step2:获得事件对象中的按键编号
				//如果是37号，就调用moveLeft
			if(game.state==game.RUNNING){
				if(event.keyCode==37){
					game.moveLeft();
				}
				else if(event.keyCode==39){
					game.moveRight();
				}
				else if(event.keyCode==38){
					game.moveUp();
				}
				else if(event.keyCode==40){
					game.moveDown();
				}
			}
			else if(event.keyCode==13){
				game.start();
			}
		}
	}
}