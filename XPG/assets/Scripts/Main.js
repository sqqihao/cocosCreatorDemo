cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        player:{
            default : null,
            type : cc.Node
        },
        diciPref:{
          default : null,
          type : cc.Prefab
        },
        countTime : {
            default : null,
            type : cc.Label
        },
        score : {
            default : null,
            type : cc.Label
        },
        bgM : {
            default : null,
            url : cc.AudioClip
        },
        jpM : {
            default : null,
            url : cc.AudioClip
        },
        scoreD : 0,
        gameTime : 40,
        wallWidth : 90,
        jumpHeight : 30,
        iCount : 8,
        monsterH : 101,
        between : 300,
    },
    moveRight : function() {
        if(this.player.rotationY == 180) {
            let pos = cc.moveTo(0.1, cc.p(this.node.width/2-this.wallWidth-this.jumpHeight, this.player.getPositionY()));
            let pos1 = cc.moveTo(0.2, cc.p( this.node.width/2-this.wallWidth , this.player.getPositionY()));
            this.player.runAction( cc.sequence(pos, pos1) );
        }else{
            let pos = cc.moveTo(0.2, cc.p( this.node.width/2-this.wallWidth , this.player.getPositionY()));
            this.player.rotationY = 180;
            this.player.runAction( pos );   
        }
    },
    moveLeft : function() {
        if(this.player.rotationY == 0) {
            let pos = cc.moveTo(0.1, cc.p(-this.node.width/2+this.wallWidth+this.jumpHeight,this.player.getPositionY()));
            let pos1 = cc.moveTo(0.2, cc.p( -this.node.width/2+this.wallWidth , this.player.getPositionY()));
            this.player.runAction( cc.sequence(pos, pos1) );
        }else{
            let pos = cc.moveTo(0.2, cc.p( -this.node.width/2+this.wallWidth , this.player.getPositionY()));
            this.player.rotationY = 0;
            this.player.runAction( pos );   
        }
    },
    setInputControl : function() {
        var self = this;
        let listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function( touchs, event ) {
                cc.audioEngine.play(self.jpM, false);
                var target = event.getCurrentTarget();
                var loc = touchs.getLocation();
                var locNode = target.convertToNodeSpace(loc);
                if( locNode.x > self.node.width/2 ) {
                    self.moveRight();
                }else{
                    self.moveLeft();
                }
                self.scoreD++;
                cc.sys.localStorage.setItem("score", self.scoreD);
                self.score.string = self.scoreD;
                self.newDici( ++self.iCount );
            },
            onTouchMoved : function( touchs, event ) {
                cc.log("move");
            },
            onTouchEnded : function( touchs, event ) {
                cc.log("end");
            }
        };
        cc.eventManager.addListener(listener, this.node);
    },
    newDici : function( i ) {
        var rn = cc.random0To1();
        var rotateY;
        rn>0.5 ? rotateY = 180 : rotateY = 0 ;
        var x;
        rn>0.5 ? x = (-this.node.width/2 + this.wallWidth  ) : x = (this.node.width/2- this.wallWidth);
        var y = 0;
        y = this.node.height/2 -  this.monsterH*i*1.5 - this.between;
        var eDici = cc.instantiate(this.diciPref);
        eDici.setPosition( cc.p(x, y) );
        eDici.rotationY = rotateY;
        this.node.addChild( eDici );
    },
    // use this for initialization
    onLoad: function () {
        //用户输入的控制
        this.setInputControl();
        //
        for(let i=0; i<this.iCount; i++) {
            this.newDici(i);
        }
        cc.director.preloadScene("OverScene");
        
        this.schedule(function() {
            this.gameTime--;
            console.log(this.gameTime);
            if(this.playTime<0) {
                cc.director.loadScene("OverScene");
            }else{
                this.countTime.string = "Time : " + this.gameTime;
            }
        },1);
        
        cc.audioEngine.play(this.bgM, true);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
