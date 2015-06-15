(function(ctx){

	var works = {

		bWorks: $("#bWorks"),
		works: $("#works"),
		worksBox: $(".worksBox"),
		closeWorks: $("#closeWorks"),
		speed: 0.8,

		init: function(){

			this.animation();
			this.on();
			this.off();			
		},

		animation: function(){
			app.settings.tlw.to(this.works, this.speed, {opacity: 1, top: 10+'%', ease:Back.easeOut.config(1.5)}, "label--1")
							.to(this.works, this.speed, {left: 1+'px', ease:Power3.easeNone}, "label--2")
							.to($("#logo"), this.speed, {display: 'none', ease:Back.easeOut.config(1.5)}, "label--1")
							.to(this.works, this.speed, {'background-color': 'rgba(0,0,0,0.8)',width: 100+'%', height: 80+'%', top: 10+'%', 'padding-top': 2+'%', 'padding-bottom': 2+'%', ease:Back.easeOut.config(1.5)}, "label--3")
							.to(this.closeWorks, this.speed, {opacity: 1, left: 1+'%', ease:Back.easeOut.config(1.5)}, "label--4")
							.to(this.worksBox, this.speed, {opacity: 1, left: 2+'%', ease:Back.easeOut.config(1.5), onComplete: works.setMask}, "label--4");
		
		},

		on: function(){
			$(this.bWorks).on('click', function(){
				$("#works").removeClass("boxesBack");
				$(".eleMenu").removeClass("eleMenuAct");
				$(this).addClass("eleMenuAct");
				if (app.settings.stateW) { 
					if (!app.settings.stateP || !app.settings.stateS || !app.settings.stateC) {
						$("#profil").addClass("boxesBack");
						$("#skills").addClass("boxesBack");
						$("#contact").addClass("boxesBack");
						app.settings.tlp.reverse();
						app.settings.tls.reverse();
						app.settings.tlc.reverse();
						app.settings.stateP = true;
						app.settings.stateS = true;
						app.settings.stateC = true;
						$("#lanSkills").find("canvas").fadeOut(1000, function(){$(this).remove();});
						
						setTimeout(function(){
							app.settings.tlw.play();
							app.settings.stateW = !app.settings.stateW;
							
						}, 2000);
					}else{
						app.settings.tlw.play();
						app.settings.stateW = !app.settings.stateW;
						
					};
				};
			});
		},

		off: function(){
			$(this.closeWorks).on('click', function(){
				$("#works").addClass("boxesBack");
				app.settings.tlw.reverse();
				app.settings.stateW = true;
				$(".eleMenu").removeClass("eleMenuAct");
			});
		},

		setMask: function(){

			var maskWid = $(".mask").width(),
				h3Wid = $(".mask").find("h3"),
				icon = $(".viewBtn");
		
	

			$(h3Wid).each(function(){
				var tH3 = $(this).width(),
					posLeft = (maskWid/2) - (tH3/2);
				$(this).css({left:posLeft});
			});

			$(icon).each(function(){
				var tIcon = $(this).width(),
					posLeft = (maskWid/2) - (tIcon/2);
				$(this).css({left:posLeft});
			});

		},

		setEleMask: function(){

			var eleMaskWid = $(".eleMask").width(),
				eleIcon = $(".eleViewBtn"),
				eleMaskHei = $(".eleMask").height();

				console.log(eleMaskWid);
				console.log(eleMaskHei);

			$(eleIcon).each(function(){
				var tEleIconW = $(this).width(),
					tEleIconH = $(this).width(),
					posLeft = (eleMaskWid/2) - (tEleIconW/2),
					posTop = (eleMaskHei/2) - (tEleIconH/2);
				$(this).css({left:posLeft, top:posTop});
			});

		}

		
	};

	ctx.works = works;
	var self = works;

})(app);