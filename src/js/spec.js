(function(ctx){

	var spec = {

		loadedTrack: null,
		context: new AudioContext(),
		gainNode: null,
		mute: $("#mute"),
		cw: $(window).width(),
		ch: 500,
		canvas: $("#canvas"),

		init: function(){
			this.preperApp();
			this.loadTrack();
			this.setCanvas();
			this.voiceMute();
			console.log(this.cw);


		},

		preperApp: function() {

			window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
			window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
			window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
			try {
				this.audioContext = new AudioContext();
			} catch (e) {
				this._updateInfo('!Your browser does not support AudioContext', false);
				console.log(e);
			}
		},

		loadTrack: function(){

			this.setupAudioNodes();
			loadSound("src/sound/track2.ogg");

			function loadSound(url) {
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				request.responseType = 'arraybuffer';

				// When loaded decode the data
				request.onload = function() {

					// decode the data
					spec.context.decodeAudioData(request.response, function(buffer) {
						// when the audio is decoded play the sound
					    playSound(buffer);
					}, onError);
				}
				request.send();

				//console.log(request);
			};

			function playSound(buffer) {
				sourceNode.buffer = buffer;
				sourceNode.start(0);
			};

			// log if an error occurs
			function onError(e) {
				console.log(e);
			};

		},

		setupAudioNodes: function() {

			// setup a javascript node
			javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
			// connect to destination, else it isn't called
			javascriptNode.connect(this.context.destination);


			// setup a analyzer
			analyser = this.context.createAnalyser();
			analyser.smoothingTimeConstant = 0.3;
			analyser.fftSize = 512;

			// create a buffer source node
			sourceNode = this.context.createBufferSource();
			sourceNode.connect(analyser);
			analyser.connect(javascriptNode);

			// Create a gain node.
			this.gainNode = this.context.createGain();
			// Connect the source to the gain node.
			sourceNode.connect(this.gainNode);
			// Connect the gain node to the destination.
			this.gainNode.connect(this.context.destination);



		},

		setCanvas: function(){
			var ctx = this.canvas.get()[0].getContext("2d"),
				meterNum = spec.cw / (10 + 5), //count of the meters
				capYPositionArray = [],
				capHeight = 2,
				meterWidth = 10, //width of the meters in the spectrum
				capStyle = '#fff';

			this.canvas.css({width:this.cw, height:'600px', position: 'absolute', bottom:0});

			var gradient = ctx.createLinearGradient(0,0,0,500);
			gradient.addColorStop(1, '#272727');
			gradient.addColorStop(0, '#E74C3C');

			javascriptNode.onaudioprocess = function() {

				// get the average for the first channel
				var array =  new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);

				// clear the current state
				ctx.clearRect(0, 0, spec.cw, spec.ch);

				// set the fill style
				//ctx.globalAlpha=0.7;
				ctx.fillStyle=gradient;
				drawSpectrum(array);

			};

			function drawSpectrum(array) {
				var step = Math.round(array.length / meterNum); //sample limited data from the total array

				for ( var i = 0; i < meterNum; i++ ){
					var value = array[i * step];

					if (capYPositionArray.length < Math.round(meterNum)) {
						capYPositionArray.push(value);
					};
					ctx.fillStyle = capStyle;

					//draw the cap, with transition effect
					if (value < capYPositionArray[i]) {
						ctx.fillRect(i * (meterWidth + 3), spec.ch - (--capYPositionArray[i]), meterWidth, capHeight);
					} else {
						ctx.fillRect(i * (meterWidth + 3), spec.ch - value, meterWidth, capHeight);
						capYPositionArray[i] = value;
					};
					ctx.fillStyle = gradient;
					ctx.fillRect(i * (meterWidth + 3), spec.ch - value + capHeight, meterWidth, spec.ch); //the meter

					//ctx.fillRect(i*25,spec.ch-value,20,spec.ch);
					//  console.log([i,value])
				}
			};

		},

		changeVolume: function (element) {
			var volume = element.value;
			var fraction = element.value / parseInt(element.max);
			// Let's use an x*x curve (x-squared) since simple linear (x) does not
			// sound as good.
			this.gainNode.gain.value = fraction * fraction;
			console.log(fraction * fraction);
		},


		voiceMute: function() { // toggle to mute and unmute sound
			$(this.mute).on('click', function(){
				if($(spec.mute).attr('data') == "off") {
					spec.gainNode.gain.value = 0; // gain set to 0 to mute sound
					$(this).attr('data', 'on').html('Mute').css({"background-color":"#E74C3C", width: "50px"});
					$("#vol_btn").val(0);
				} else {
					spec.gainNode.gain.value = 1; // gain set to 1 to unmute sound
					$(this).attr('data', 'off').html('Unmute').css({"backgroundColor":"#34495E", width: "75px"});
					$("#vol_btn").val(50);
				}
			});
		},


	};


	ctx.spec = spec;
	var self = spec;
})(app);