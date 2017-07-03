function Block(canvas){
    BaseObj.call(this, canvas);
    this.prototype = new BaseObj(canvas);
    this.id = (new Date()).getTime()+Math.random();
    this.h=100;
    var closed = false;

    this.inPt = [new ParamPoint(canvas),new ParamPoint(canvas)];
    this.outPt = [new ParamPoint(canvas),new ParamPoint(canvas)];
    this.btnClose = new Button(canvas);
    this.btnClose.label = "关闭";
    this.btnClose.doAction = function(){
        closed = true;
    };

    this.onmousedown = function(e){
        this.prototype.onmousedown.call(this,e);
        this.btnClose.onmousedown(e);
    };
    this.onmousedownOutPt = function(e){
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].onmousedown(e);
        }
    };
    this.onmousemovewhendown = function(e){
        this.prototype.onmousemovewhendown.call(this,e);

        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].onmousemovewhendown(e);
        }
    };
    this.onmouseup = function(e){
        this.prototype.onmouseup.call(this,e);
        this.btnClose.onmouseup(e);

        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].onmouseup(e);
        }
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].onmouseup(e);
        }
    };
    this.onmousemove = function(e){
        this.prototype.onmousemove.call(this,e);
        this.btnClose.onmousemove(e);
    };
    this.doAction = function(){

    };
    this.isClosed = function(){
        return closed;
    };

    this.rend = function(){
        this.prototype.rend.call(this);

        // in
        for(var i=0;i<this.inPt.length;i++){
            this.inPt[i].setPos(this.x-this.r,this.y+this.r+this.r*i);
            this.inPt[i].rend();
        }

        // out
        for(var i=0;i<this.outPt.length;i++){
            this.outPt[i].setPos(this.x+this.w+this.r,this.y+this.h-this.r*i);
            this.outPt[i].rend();
        }

        // close button
        this.btnClose.setPos(this.x,this.y+this.h);
        this.btnClose.rend();
    };
}

