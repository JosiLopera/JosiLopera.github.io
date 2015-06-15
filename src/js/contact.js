(function(ctx){

	var contact = {

		bContact: $("#bContact"),
		contactBox: $("#contact"),
		closeContact: $("#closeContact"),
		speed: 0.8,
		
		init: function(){
			
			this.animation();
			this.on();
			this.off();

		},

		animation: function(){
			app.settings.tlc.to(this.contactBox, this.speed, {opacity: 1, top: 10+'%', ease:Back.easeOut.config(1.5)}, "label--1")
							.to(this.contactBox, this.speed, {left: 40+'%', ease:Power3.easeNone}, "label--2")
							.to(this.contactBox, this.speed, {'background-color': 'rgba(0,0,0,0.8)', width: 50+'%', height: 80+'%', ease:Back.easeOut.config(1.5)}, "label--3")
							.to(this.closeContact, this.speed, {opacity: 1, left: 2+'%', ease:Back.easeOut.config(1.5)}, "label--3");
					
		},

		on: function(){
			$(this.bContact).on('click', function(){
				$("#contact").removeClass("boxesBack");
				$(".eleMenu").removeClass("eleMenuAct");
				$(this).addClass("eleMenuAct");
				if (app.settings.stateC) { 
					if (!app.settings.stateP || !app.settings.stateW || !app.settings.stateS) {
						$("#works").addClass("boxesBack");
						$("#skills").addClass("boxesBack");
						$("#profil").addClass("boxesBack");
						app.settings.tlp.reverse();
						app.settings.tlw.reverse();
						app.settings.tls.reverse();
						app.settings.stateP = true;
						app.settings.stateW = true;
						app.settings.stateS = true;
						$("#lanSkills").find("canvas").fadeOut(1000, function(){$(this).remove();});
						setTimeout(function(){
							app.settings.tlc.play();
							app.settings.stateC = !app.settings.stateC;
						}, 2000);
					}else{
						app.settings.tlc.play();
						app.settings.stateC = !app.settings.stateC;
					};
				};
			});
		},

		off: function(){
			$(this.closeContact).on('click', function(){
				$("#contact").addClass("boxesBack");
				app.settings.tlc.reverse();
				app.settings.stateC = true;
				$(".eleMenu").removeClass("eleMenuAct");

			});
		}
	};

	ctx.contact = contact;
	var self = contact;

})(app);