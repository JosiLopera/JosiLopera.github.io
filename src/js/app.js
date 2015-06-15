(function(ctx){

	var app = {

		init: function(){

			app.spec.init();
			app.boxes.init();
			app.ui.init();
			app.social.init();
			app.profil.init();
			app.works.init();
			app.skills.init();
			app.contact.init();


		}

	};


	ctx.app = app;
	var self = app;
})(window);