var playerTmp = require("Player");
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
        dgM : {
            default : null,
            url : cc.AudioClip
        }
    },
    
    // use this for initialization
    onLoad: function () {
        var self = this;
        var listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function() {
                var loc = cc.moveBy(0.1, cc.p(0, 110));
                self.node.runAction( loc );
            }
        };
        cc.eventManager.addListener(listener, self.node);
    
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //element
        var player = cc.find("Canvas/normal").getComponent( playerTmp );
        if( cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(), this.node.getBoundingBoxToWorld()) ) {
            cc.audioEngine.play(this.dgM);
            cc.director.loadScene("OverScene");
        }
        //node
        //console.log(cc.find("Canvas/normal"));

    },
});
