(function(ctx){

	var ui = {

        body: $("body"),

		init: function(){

			this.aniLogo();
			this.aniMenu();
			this.controls();
            this.ctr_menu();
			setTimeout(function(){
				$("#profil").removeClass("boxesBack");
				app.settings.tlp.play();
				app.settings.stateP = !app.settings.stateP;
			}, 4000);

		},

		aniMenu: function(){

			var menu = $("#menu"),
				navRight = $("#navRight"),
				social = $(".share-button, .share-toggle-button");
				speed = 1,
				tl = new TimelineLite({paused:true});
				
			tl 	.to(menu, speed, {rotation: -90, right:7.5, ease:Bounce.easeOut}, "label--1")
				.to(navRight, speed, {width: 30+'%', ease:Back.easeOut.config(1.5), onComplete:app.works.setEleMask}, "label--1")
				.to(social, speed, {display: 'inherit', ease:Back.easeOut.config(1.5)}, "label--1");
				

			$(menu).on('click', function(event){
				event.preventDefault();
				if(menu.attr('state')=='off'){
					tl.play();
					menu.attr('state','on');
					ui.body.attr('state','on');
				}else{
					app.social.closeShareMenu();
					tl.reverse();
					menu.attr('state','off');
					ui.body.attr('state','off');
				};
			});

			$(ui.body).on('click', function(event){
                event.preventDefault()
	            if (ui.body.attr('state')=='on') {
	                if (event.target.className.split(" ")[0] != "menu" && event.target.className.split(" ")[0] != "menuBar" && event.target.className.split(" ")[0] != "share-toggle-button" && event.target.className.split(" ")[0] != "share-icon" && event.target.className.split(" ")[0] != "share-button") {
						app.social.closeShareMenu();
						tl.reverse(); 
	                    menu.attr('state','off');
						ui.body.attr('state','off');
	                } 
	            }              
        	});	

		},

		aniLogo: function(){
			var svg = $('#logo').find('svg')[0],
				tl = new TimelineLite({});

			tl  .to($("#textLogo"), 2, {text:" ", ease:Linear.easeNone}, "label--1")
                .to($("#logo"), 0.1, {opacity: 0, ease:Bounce.easeOut}, "label--2")
				.to($("#textLogo"), 0.1, {text: "JL", ease:Power0.easeNone}, "label--3")
                .to($("#logo"), 0.1, {top: 1 +'%', left:1 +'%', 'z-index': 500, ease:Power0.easeNone}, "label--3")
                .to($("#logo"), 0.5, {opacity: 1, ease:Bounce.easeOut}, "label--4");

            setTimeout(function(){
				svg.removeAttribute('viewBox');
				svg.setAttribute('viewBox', '450 0 1800 300');
			}, 2000);		
		},

		controls: function(){

            var ctr = $("#controls"),
                tl_ctr = new TimelineLite({});

			$(ctr).on('click', function(){
				if($(this).attr('data')=='off'){
					$(this).css("z-index","10000").attr('data', 'on');
                    $(ui.body).attr('data','off');
                }
			});

			$(ui.body).on('click', function(event){
                event.preventDefault();
                if(event.target.className.split(" ")[0] != "tControls"){
                    if($(ui.body).attr('data')=='off'){
                        $(ctr).css("z-index","800").attr('data', 'off');
                        $(ui.body).attr('data','on');
                    }
                }
			});

		},

        ctr_menu: function(){
            var tl_ctr_menu = new TimelineLite({paused:true});

            tl_ctr_menu .to($("#cMenu"), speed, {rotation: -90, right:2.5, ease:Back.easeOut.config(1.5)}, "label--1")
                        .to($("#controls"), 1, {'left': 0, ease:Back.easeOut.config(1.5)},"label--1");

            $("#cMenu").on('click', function(){
                if($(this).attr('state')=='off'){
                    tl_ctr_menu.play();
                    $(this).attr('state','on');
                }else{
                    tl_ctr_menu.reverse();
                    $(this).attr('state','off');
                };
            });

        }

	};

	ctx.ui = ui;
	var self = ui;

})(app);