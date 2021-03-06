function Button(canvas){
    var cvs = canvas;
    var cvsRect = canvas.getBoundingClientRect();

    this.x = 0;
    this.y = 0;
    this.w = 30;
    this.h = 8;
    this.colorOff = "#cccccc";
    this.colorMouseDown = "#dddddd";
    this.colorOn = "#eeeeee";

    var buttonR = 5;
    var mouseOver = false;
    var mouseDown = false;

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
        return buttonR;
    };

    this.isInBtnArea = function(mx,my){
        var cx = mx-this.getCVSRect().left*(this.getCVS().width/this.getCVSRect().width);
        var cy = my-this.getCVSRect().top*(this.getCVS().height/this.getCVSRect().height);
        
        if(cx>this.x-buttonR && cx<(this.x+this.w+buttonR)
        && cy>this.y-buttonR && cy<(this.y+this.h+buttonR)){
            return true;
        }
        return false;
    };

    this.onmousedown = function(e){
        if(this.isInBtnArea(e.clientX,e.clientY)){
            mouseDown = true;
        }
    };
    this.onmousemovewhendown = function(e){
    };
    this.onmouseup = function(e){
        if(this.isInBtnArea(e.clientX,e.clientY) && mouseDown && mouseOver){
            this.doAction();
        }
        mouseDown = false;
    };
    this.onmousemove = function(e){
        if(this.isInBtnArea(e.clientX,e.clientY)){
            mouseOver = true;
        }else{
            mouseOver = false;
        }
    };
    this.doAction = function(){

    };

    this.rend = function(ctx){
        // refresh canvas bounding, incase scroll page
        cvsRect = canvas.getBoundingClientRect();

        var btntColor = mouseDown?this.colorMouseDown:(mouseOver?this.colorOn:this.colorOff);

        ctx.beginPath();

        ctx.arc(this.x, this.y, buttonR, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
        ctx.lineTo(this.x+this.w,this.y-buttonR);//T
        ctx.arc(this.x+this.w, this.y, buttonR, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
        ctx.lineTo(this.x+this.w+buttonR,this.y+this.h);//R
        ctx.arc(this.x+this.w, this.y+this.h, buttonR, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
        ctx.lineTo(this.x,this.y+this.h+buttonR);//B
        ctx.arc(this.x, this.y+this.h, buttonR, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
        ctx.lineTo(this.x-buttonR,this.y);//L

        ctx.strokeStyle="#000000";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.fillStyle=btntColor;
        ctx.fill();
        ctx.fill();
        ctx.fillStyle = '#222222';
        ctx.fillText("测试",this.x-buttonR/4,this.y+buttonR*3/2);
        ctx.closePath();
    };
}

