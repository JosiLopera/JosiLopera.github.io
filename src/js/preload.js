var img = [
	//{id:   '1', src:  'http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg'},
	//{id:   '4', src:  'http://upload.wikimedia.org/wikipedia/commons/c/cb/WA_-_Dry_Falls_-_Huge_Channel_v1.png'},
	//{src:"./src/sound/track.ogg", id:"track"},
	{src:"./src/img/spain.png", id:"spain"},
	{src:"./src/img/france.png", id:"france"},
	{src:"./src/img/england.png", id:"england"},
	{src:"./src/img/losEspanoles.png", id:"losEspanoles"},
	{src:"./src/img/pongMotion.png", id:"pongMotion"},
	{src:"./src/img/selfication.png", id:"selfication"},
	{src:"./src/img/raid.png", id:"raid"},
	{src:"./src/img/sensile.png", id:"sensile"},
	{src:"./src/img/vgg.png", id:"vgg"},
	{src:"./src/img/fond.png", id:"fond"},
	
];

var loader = new createjs.LoadQueue();

loader.on('complete', onComplete);
loader.on('progress', onProgress);

function onComplete(event){
	setTimeout(function(){
		$("#loadBox").fadeOut(500);
		app.init();
	},1000);
};
function onProgress(event){
// 	var progress = Math.round(event.loaded * 100);
// 	//console.log('progress', progress);
// 	$('#progressbar .bar').css({'width': progress + '%'});
};

loader.loadManifest(img);