(function(ctx){

	var skills = {

		bSkills: $("#bSkills"),
		skillsBox: $("#skills"),
		closeSkills: $("#closeSkills"),
		skillbar: $('.skillbar'),
		h2: $("#sb2").find("h2"),
		speed: 0.8,

		
		init: function(){
			
			this.animation();
			this.on();
			this.off();

		},

		animation: function(){	
			app.settings.tls.to(this.skillsBox, this.speed, {opacity: 1, top: 20+'%', ease:Back.easeOut.config(1.5)}, "label--1")
							.to(this.skillsBox, this.speed, {left: 10+'%', ease:Power3.easeNone}, "label--2")
							.to(this.skillsBox, this.speed, {'background-color': 'rgba(0,0,0,0.8)',width: 80+'%', height: 70+'%', ease:Back.easeOut.config(1.5)}, "label--3")
							.to(this.closeSkills, this.speed, {opacity: 1, left: 94+'%', ease:Back.easeOut.config(1.5)}, "label--4")
							.to(this.skillbar, this.speed, {opacity: 1, left: 0, ease:Back.easeOut.config(1.5), onComplete: this.circles}, "label--3")
							.to(this.h2, 1, {opacity: this.speed, 'font-size': 30, ease:Elastic.easeOut.config(3, 2), onComplete: this.falgs}, "label--3");

			$(this.skillbar).each(function(){
				var tsb = $(this).find('.skillbar-bar'),
					dataPercent = $(this).attr('data-percent');

				app.settings.tls.to(tsb, 1, {width: dataPercent, ease:Power3.easeNone}, "label--3");

			});
		},

		on: function(){
			$(this.bSkills).on('click', function(){
				$("#skills").removeClass("boxesBack");
				$(".eleMenu").removeClass("eleMenuAct");
				$(this).addClass("eleMenuAct");
				if (app.settings.stateS) { 
					if (!app.settings.stateP || !app.settings.stateW || !app.settings.stateC) {
						$("#works").addClass("boxesBack");
						$("#profil").addClass("boxesBack");
						$("#contact").addClass("boxesBack");
						app.settings.tlp.reverse();
						app.settings.tlw.reverse();
						app.settings.tlc.reverse();
						app.settings.stateP = true;
						app.settings.stateW = true;
						app.settings.stateC = true;
						setTimeout(function(){
							app.settings.tls.play();
							app.settings.stateS = !app.settings.stateS;
						}, 2000);
					}else{
						app.settings.tls.play();
						app.settings.stateS = !app.settings.stateS;
					
					};
				};
			});
		},

		off: function(){
			$(this.closeSkills).on('click', function(){
				$("#skills").addClass("boxesBack");
				$("#lanSkills").find("canvas").fadeOut(1000, function(){$(this).remove();});
				app.settings.tls.reverse();
				app.settings.stateS = true;
				$(".eleMenu").removeClass("eleMenuAct");

			});
		},

		circles: function() {
			//add canvas skills
			var n, id, progress,
				n2, id2, progress2,
				n3, id3, progress3, 
				lanSkills = $("#lanSkills");

			progress = new CircularProgress({
				radius: 70,
				strokeStyle: '#fff',
				lineWidth: 10,
				fillStyle: '#fff',
				text: {
					font: 'bold 20px esta'
				},
				initial: {
					strokeStyle: '#2C3E50',
					lineWidth: 10
				}
			});

	      	$(lanSkills).append(progress.el);

			n = 0;
			id = setInterval(function () {
				if (n == 100) clearInterval(id);
				progress.update(n++);
			}, 30);

			progress2 = new CircularProgress({
				radius: 70,
				strokeStyle: '#fff',
				fillStyle: '#fff',
				text: {
					font: 'bold 20px esta'
				},
				lineWidth: 10,
				initial: {
					strokeStyle: '#2C3E50',
					lineWidth: 10
					}
			});

	      	$(lanSkills).append(progress2.el);

			n2 = 0;
			id2 = setInterval(function () {
				if (n2 == 75) clearInterval(id2);
				progress2.update(n2++);
			}, 30);

			progress3 = new CircularProgress({
				radius: 70,
				strokeStyle: '#fff',
				lineWidth: 10,
				fillStyle: '#fff',
				text: {
					font: 'bold 20px esta'
				},
				initial: {
					strokeStyle: '#2C3E50',
					lineWidth: 10
				}
			});

	      	$(lanSkills).append(progress3.el);

			n3 = 0;
			id3 = setInterval(function () {
				if (n3 == 50) clearInterval(id3);
				progress3.update(n3++);
			}, 30);

			//add id to canvas
			var allCanvas = $("#lanSkills").children(),
				cCount = 1;

			for (var i = 0; i < allCanvas.length; i++) {
				var tarc = allCanvas[i];
				$(tarc).attr('id', 'canvas'+cCount);
				cCount++;
			};
		},

		falgs: function(){
	    	//add falgs to canvas
			var c1 = document.getElementById("canvas1"),
				ctx1 = c1.getContext("2d"),
				img1 = document.getElementById("spain"),

				c2 = document.getElementById("canvas2"),
				ctx2 = c2.getContext("2d"),
				img2 = document.getElementById("france"),

				c3 = document.getElementById("canvas3"),
				ctx3 = c3.getContext("2d"),
				img3 = document.getElementById("england"),

				x = 55,
				y = 70,
				w = 30,
				h = 30;

			setTimeout(function(){
			    ctx3.drawImage(img3, x, y, w, h);
			},2000);
			setTimeout(function(){
			    ctx2.drawImage(img2, x, y, w, h);
			},3000);
			setTimeout(function(){
			    ctx1.drawImage(img1, x, y, w, h);
			},4000);
				
		}
	};

	ctx.skills = skills;
	var self = skills;

})(app);