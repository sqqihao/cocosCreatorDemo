cc.Class({
    extends: cc.Component,

    properties: {
        anim : cc.Animation
    },

    // use this for initialization
    onLoad: function () {

    },
    onJump: function() {
        this.anim.play("sheepJump");
    },
    onRun: function() {
        this.anim.play("sheep");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
