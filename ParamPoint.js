function ParamPoint(canvas){
    var cvs = canvas;
    var cvsRect = canvas.getBoundingClientRect();

    this.x = 0;
    this.y = 0;
    this.colorOff = "#cccccc";
    this.colorReday = "#77cc77";
    this.colorOccupied = "#cc7777";
    this.colorMouseDown = "#7777cc";
    this.colorOn = "#cccc00";

    var parameterPointR = 5;
    var mouseDrag = false;
    var mouseDown = false;

    var link;
    var lnkNum = 0;
    var next;
    var readyForLink = false;

    this.setLink = function(obj){
        link = obj;
    };
    this.getLink = function(){
        return link;
    };
    this.addLink = function(){
        lnkNum++;
    };
    this.removeLink = function(){
        lnkNum--;
        if(lnkNum<0){
            lnkNum = 0;
        }
    };

    this.getCVS = function(){
        return cvs;
    };
    this.getCVSRect = function(){
        return cvsRect;
    };
    this.setX = function(n){
        this.x = n;
    };
    this.setY = function(n){
        this.y = n;
    };
    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    };
    this.getR = function(x,y){
        return parameterPointR;
    };

    this.isOutStart = function(){
    	return mouseDown;
    };

    this.holdForLink = function(){
        readyForLink = false;
    };
    this.readyForLink = function(){
        readyForLink = true;
    };

    this.isInParamPos = function(mx,my){
        var cx = mx-this.getCVSRect().left*(this.getCVS().width/this.getCVSRect().width);
        var cy = my-this.getCVSRect().top*(this.getCVS().height/this.getCVSRect().height);
        
        if(cx>this.x-parameterPointR && cx<(this.x+parameterPointR)
        && cy>this.y-parameterPointR && cy<(this.y+parameterPointR)){
            return true;
        }
        return false;
    };

    this.onmousedown = function(e){
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDown = true;
        }
    };
    this.onmousemovewhendown = function(e){
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDrag = true;
        }else{
            mouseDrag = false;
        }
    };
    this.onmouseup = function(e){
    	mouseDown = false;
        if(this.isInParamPos(e.clientX,e.clientY)){
            mouseDrag = false;
        }
    };

    this.rend = function(ctx){
        // refresh canvas bounding, incase scroll page
        cvsRect = canvas.getBoundingClientRect();
        var ptColor = mouseDrag?(lnkNum?(readyForLink?this.colorOccupied:this.colorOn):(readyForLink?this.colorReday:this.colorOff)):(lnkNum?this.colorOn:this.colorOff);
        ptColor = mouseDown?this.colorMouseDown:ptColor;

        ctx.beginPath();
        ctx.arc(this.x, this.y, parameterPointR, (Math.PI/180)*0, (Math.PI/180)*360, false);
        ctx.strokeStyle="#000000";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.fillStyle=ptColor;
        ctx.fill();
        ctx.closePath();
    };
}

