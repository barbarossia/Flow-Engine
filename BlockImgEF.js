function BlockImgEF(){
    Block.call(this);
    this.parentType = new Block();
    this.id = (new Date()).getTime()+Math.random();
    this.h=280;
    this.w=120;
    this.title="特效";
    this.titleColor = 'rgba(0,180,0,0.5)';

    this.inPt = [new ParamPoint()];
    this.outPt = [
                    new ParamPoint(),new ParamPoint(),new ParamPoint(),new ParamPoint(),new ParamPoint(),
                    new ParamPoint(),new ParamPoint(),new ParamPoint(),new ParamPoint(),new ParamPoint(),
                    new ParamPoint(),new ParamPoint(),new ParamPoint(),new ParamPoint()
                 ];

    var img = [
                new Image(),new Image(),new Image(),new Image(),new Image(),
                new Image(),new Image(),new Image(),new Image(),new Image(),
                new Image(),new Image(),new Image(),new Image()
              ];
    var psMethod = [
                "美肤","素描","自然增强","紫调","柔焦",
                "复古","黑白","仿lomo","亮白增强","灰白",
                "灰色","暖秋","木雕","粗糙"
             ];
    var imageView = new ImageView();

    var done = false;
    var oldImgSrc;
    this.doAction = function(){
        if(this.inPt[0].value){
            if(!oldImgSrc){
                oldImgSrc = this.inPt[0].value.accessKey;
            }else{
                if(oldImgSrc!=this.inPt[0].value.accessKey){
                    done = false;
                    oldImgSrc = this.inPt[0].value.accessKey;
                }
            }
            if(!done){
                for(var i=0;i<img.length;i++){
                    img[i] = imageView.getImgClone(this.inPt[0].value,this.w*1.5,this.h*1.5);
                    $AI(img[i]).ps(psMethod[i]).replace(img[i]);
                }
                done = true;
            }
        }else{
            done = false;
            // clear img value make sure output is no value
            img = [
                null,null,null,null,null,
                null,null,null,null,null,
                null,null,null,null
              ];
        }

        // make sure out value is the newest and will not lost
        for(var i=0;i<img.length;i++){
            this.outPt[i].value = img[i];
            if(img[i]){
                img[i].accessKey = oldImgSrc;
            }
        }
    };

    function getStrLength(str){
        var realLength = 0;
        for (var i = 0; i < str.length; i++){
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
            realLength += 1;
            else
            realLength += 2;
        }
        return realLength*6;
    }

    this.rend = function(){
        this.parentType.rend.call(this);

        // show label for effect
        ctx.save();
        for(var i=0;i<psMethod.length;i++){
            ctx.fillStyle = '#bbbb88';
            ctx.fillText(psMethod[i],this.x+this.w-getStrLength(psMethod[i])+2.5,this.y+this.h-this.r*i+2.5);
        }
        ctx.restore();
    };
}

