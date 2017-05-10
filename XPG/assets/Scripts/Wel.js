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
        btn : {
            default : null,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene("MainScene");
        var s1 = cc.scaleTo(0.8, 0.8);
        var s2 = cc.scaleTo(1, 1);
        var sq = cc.sequence(s1, s2);
        var req = cc.repeatForever(sq);
        this.btn.runAction(req);
        this.btn.on("touchstart", function() {
            cc.director.loadScene("MainScene"); 
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
