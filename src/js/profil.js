(function(ctx){

	var profil = {

		bProfil: $("#bProfil"),
		profilBox: $("#profil"),
		eleProfil: (".eleProfil"),
		closeProfil: $("#closeProfil"),
		speed: 0.8,

		init: function(){
			
			this.animation();
			this.on();
			//this.off();

		},

		animation: function(){
				
			app.settings.tlp.to(this.profilBox, this.speed, {opacity: 1, top: 20+'%', ease:Back.easeOut.config(1.5)}, "label--1")
						.to(this.profilBox, this.speed, {left: 15+'%', ease:Power3.easeNone}, "label--2")
						.to(this.profilBox, this.speed, {'background-color': 'rgba(0,0,0,0.8)',width: 70+'%', height: 60+'%', padding: 5+'%', ease:Back.easeOut.config(1.5)}, "label--3")
						.to(this.eleProfil, this.speed, {opacity: 1, delay: 0.3, ease:Back.easeOut.config(1.5)}, "label--3")
						.to(this.closeProfil, this.speed, {opacity: 1, left: 92+'%', ease:Back.easeOut.config(1.5)}, "label--4");
		},

		on: function(){
			$(this.bProfil).on('click', function(){
				$("#profil").removeClass("boxesBack");
				$(".eleMenu").removeClass("eleMenuAct");
				$(this).addClass("eleMenuAct");
				if (app.settings.stateP) { 
					if (!app.settings.stateW || !app.settings.stateS || !app.settings.stateC) {
						$("#works").addClass("boxesBack");
						$("#skills").addClass("boxesBack");
						$("#contact").addClass("boxesBack");

						app.settings.tlw.reverse();
						app.settings.tls.reverse();
						app.settings.tlc.reverse();
						app.settings.stateW = true;
						app.settings.stateS = true;
						app.settings.stateC = true;

						$("#lanSkills").find("canvas").fadeOut(1000, function(){$(this).remove();});

						setTimeout(function(){
							app.settings.tlp.play();
							app.settings.stateP = !app.settings.stateP;
						}, 2000);
					}else{
						app.settings.tlp.play();
						app.settings.stateP = !app.settings.stateP;
					};
				};
			});
		},

		/*off: function(){
			$(closeProfil).on('click', function(){
				$("#profil").addClass("boxesBack");
				app.settings.tlp.reverse();
				app.settings.stateP = true;
				$(".eleMenu").removeClass("eleMenuAct");
			});
		}*/
	};

	ctx.profil = profil;
	var self = profil;

})(app);