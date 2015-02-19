var bass;

function getBassSpace(intensity) {
	if (intensity == 1)
		return (Math.floor(Math.random()*2)+1)*4;
	if (intensity == 2) {
		var num = Math.floor(Math.random()*3);
		if (num == 0)
			return 8;
		if (num == 1)
			return 4;
		if (num == 2)
			return 2;
	}
	if (intensity == 3)
		return (Math.floor(Math.random()*2)+1)*2;
	else {
		var num = Math.floor(Math.random()*3);
		if (num == 0)
			return 4;
		if (num == 1)
			return 2;
		if (num == 2)
			return 1;
	}
}

function scheduleBass(intensity, space, offset) {
	var sc = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	if (intensity <= 4) {
		for (var i = offset; i < 32; i += space) {
			var mes = Math.floor(i/16);
			var num = i%16;
			var root = harmony.schedule[mes][Math.floor((i%16)/8)*8 + offset];

			sc[mes][num] = root;
		}
	}
	if (intensity == 5) {
		for (var i = 0; i < 2; ++i) {
			for (var j = 0; j < 16; ++j)
				if (harmony.schedule[i][j]) {
					sc[i][j] = harmony.schedule[i][j];
					if (j < 15) {
							sc[i][j+1] = harmony.schedule[i][j];
					}
				}
		}
	}

	return sc;
}

function getBassVolume(intensity) {
	return .11;
}

function BassLine(intensity) {
	this.offset = harmony.offset;
	this.space = getBassSpace(intensity);
	this.on = true;

	this.schedule = scheduleBass(intensity, this.space, this.offset);
	this.volume = getBassVolume(intensity);
}

BassLine.prototype.play = function(beatNumber, time) {
	console.log("playBass!\n");
	console.log(time);
	var measure = Math.floor(beatNumber/16);
	var number = Math.floor(beatNumber%16);

	if (this.schedule[measure][number]) {
		var source = context.createBufferSource();
		source.buffer = BUFFERS.bass;
		source.playbackRate.value = freq[scale[flavor][this.schedule[measure][number]]];
		source.connect(context.destination);
		source.noteOn(time);
		source.noteOff(time + (60.0/(BPM*4)));
	}
}
