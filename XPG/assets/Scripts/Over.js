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
        },
        lb : {
            default : null,
            type : cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.lb.string = "得分 :" + cc.sys.localStorage.getItem("score");
        this.btn.on("touchstart", function() {
            cc.director.loadScene("MainScene");
        })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
