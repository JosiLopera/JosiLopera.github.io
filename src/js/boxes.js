(function(ctx){

    var boxes = {

        init: function(){
            this.posBoxes();
        },

        posBoxes: function(){

            var tBoxes = ["#profil", "#works", "#skills", "#contact"];

            for (var i = 0; i < tBoxes.length; i++) {
                var num = Math.floor(Math.random() * (app.settings.winWid-10)) - 1,
                    tBox = tBoxes[i];
                $(tBox).css({left: num });
            };

        }

    };


    ctx.boxes = boxes;
    var self = boxes;
})(app);