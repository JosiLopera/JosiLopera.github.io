(function(ctx){

	

	var settings = {

		cols: [],
		cels: [],

		tCols: 10,
		tCels: 20,
		minCels: 3,

		height: 10,
		bottom: 5,
		colors: ['#E74C3C','#34495E','#2C3E50','#d35400','#ecf0f1','#34495e','#c0392b','#8e44ad','#2980b9','#bdc3c7'],
		winWid: $(window).width(),

		tlp: new TimelineLite({paused:true}),
		tlw: new TimelineLite({paused:true}),
		tls: new TimelineLite({paused:true}),
		tlc: new TimelineLite({paused:true}),

		stateP: true,
		stateW: true,
		stateS: true,
		stateC: true,
	};
		
	ctx.settings = settings;
	var self = settings;

})(app);