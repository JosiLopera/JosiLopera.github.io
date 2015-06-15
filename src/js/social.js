(function(ctx){

	var social = {

		shareButtons: $(".share-button"),
		toggleButton: $(".share-toggle-button"),
		menuOpen: false,
		spacing: 75,

		init: function(){
			this.toggleButton.on("mousedown",function(){
				social.toggleShareMenu();
				console.log(social.menuOpen);
			})
		},

		openShareMenu: function(){
			var buttonsNum = this.shareButtons.length,
				buttonsMid = buttonsNum/2,
				tb = this.toggleButton;
				console.log(buttonsMid);
			TweenMax.to(tb,0.1,{
				scaleX:1.2,
				scaleY:0.6,
				ease:Quad.easeOut,
				onComplete:function(){
					TweenMax.to(tb,.8,{
						scale:0.6,
						ease:Elastic.easeOut,
						easeParams:[1.1,0.6]
					})
					TweenMax.to(tb.children(".share-icon"),.8,{
						scale:1.4,
						ease:Elastic.easeOut,
						easeParams:[1.1,0.6]
					})
				}
			})
			this.shareButtons.each(function(i){
				var cur=$(this);
				var pos=i-buttonsMid;
				if(pos>=0) pos+=1;
				var dist=Math.abs(pos);
				$(cur).css({
					zIndex:buttonsMid-dist
				});
				TweenMax.to(cur,1.1*(dist),{
					x:pos*social.spacing,
					scaleY:0.6,
					scaleX:1.1,
					ease:Elastic.easeOut,
					easeParams:[1.01,0.5]
				});
				TweenMax.to(cur,.8,{
					delay:(0.2*(dist))-0.1,
					scale:0.6,
					ease:Elastic.easeOut,
					easeParams:[1.1,0.6]
				})
					
				TweenMax.fromTo(cur.children(".share-icon"),0.2,{
					scale:0
				},{
					delay:(0.2*dist)-0.1,
					scale:1,
					ease:Quad.easeInOut
				})
			})
		},

		closeShareMenu: function(){
			var buttonsNum = this.shareButtons.length,
				buttonsMid = buttonsNum/2,
				tb = this.toggleButton;
			TweenMax.to([tb,this.toggleButton.children(".share-icon")],1.4,{
				delay:0.1,
				scale:1,
				ease:Elastic.easeOut,
				easeParams:[1.1,0.3]
			});
			this.shareButtons.each(function(i){
				var cur=$(this);
				var pos=i-buttonsMid;
				if(pos>=0) pos+=1;
				var dist=Math.abs(pos);
				$(cur).css({
					zIndex:dist
				});

				TweenMax.to(cur,0.4+((buttonsMid-dist)*0.1),{
					x:0,
					scale:.95,
					ease:Quad.easeInOut,
				});
					
				TweenMax.to(cur.children(".share-icon"),0.2,{
					scale:0,
					ease:Quad.easeIn
				});
			})
		},

		toggleShareMenu: function(){
			this.menuOpen=!this.menuOpen
			this.menuOpen?this.openShareMenu():this.closeShareMenu();
		}
	};

	ctx.social = social;
	var self = social;

})(app);