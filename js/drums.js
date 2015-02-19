var beat;

function getDrumOffset(space, intensity) {
	if (space == 1)
		return 0;
	switch (intensity) {
	case 1:
		return 0;
	case 2:
		return Math.floor(Math.random()*2)*2;
	case 3:
		return Math.floor(Math.random()*2)*2;
	case 4:
		var num = Math.floor(Math.random()*2)*3;
		if (num)
			return 2;
		return 0;
	case 5:
		return Math.floor(Math.random()*4);
	}
}

function getDrumSpace(intensity) {
	switch (intensity) {
	case 1:
		var num = Math.floor(Math.random()*2)+1;
		return num*8;
	case 2:
		var num = Math.floor(Math.random()*2)+1;
		return num*8;
	case 3:
		var num = Math.floor(Math.random()*3);
		if (num)
			return 8;
		return 16;
	case 4:
		var num = Math.floor(Math.random()*5);
		if (num == 0)
			return 16;
		if (num <= 3)
			return 8;
		return 4;
	case 5:
		return Math.floor(Math.random()*4)+4;
	}
}

function getHiHatSpace (intensity) {
	switch(intensity) {
	case 1:
		return 4;
	case 2:
		return (Math.floor(Math.random()*2)+1)*2;
	case 3:
		var num = Math.floor(Math.random()*3);
		if (num == 2)
			return 4;
		if (num == 1)
			return 2;
		return 1;
	case 4:
		var num = Math.floor(Math.random()*5);
		if (!num)
			return 4;
		if (num <= 2)
			return 2;
		return 1;
	case 5:
		return Math.floor(Math.random()*4)+1;
	}
}

function scheduleKick(offset, space, intensity) {
	var sc = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	if (intensity < 5) {
		for (var i = 0; i < 16; i += space)
			sc[0][i] = sc[1][i] = 1;
		for (var i = 1; i < 15; i++) {
			if (sc[1][i+1] && Math.floor(Math.random()*(8-intensity)) == 3)
				sc[1][i] = 1;
			if (sc[1][i-1] && Math.floor(Math.random()*(8-intensity)) == 3)
				sc[1][i] = 1;
		}
	}
	else {
		for (var i = 0; i < 32; i += space)
			sc[Math.floor(i/16)][i%16] = 1;
	}

	return sc;
}

function scheduleSnare(offset, space, intensity) {
	var sc = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	if (intensity < 5) {
		for (var i = space/2; i < 16; i += space)
			sc[0][i] = sc[1][i] = 1;
		for (var i = 1; i < 15; i++) {
			if (sc[1][i+1] && Math.floor(Math.random()*(9-intensity)) == 3)
				sc[1][i] = 1;
			if (sc[1][i-1] && Math.floor(Math.random()*(9-intensity)) == 3)
				sc[1][i] = 1;
		}
		if (!sc[1][15])
			sc[1][15 - Math.floor(Math.random()*2)] = Math.floor(Math.random()*2);
	}
	else {
		for (var i = 0; i < 32; i += Math.floor(space/2)) {
			var toPut = (i%16) + Math.floor(space/2) + Math.floor(Math.random()*3) - 1;
			if (toPut < 16) {
				console.log(toPut);
				console.log(i);
				console.log(i/16);
				console.log(Math.floor(i/16));
				console.log(sc[Math.floor(i/16)]);
				sc[Math.floor(i/16)][toPut] = 1;
			}
		}
	}

	return sc;
}

function scheduleHiHat(offset, space, intensity) {
	var sc = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	if (intensity < 5) {
		for (var i = offset; i < 16; i += space)
			sc[0][i] = sc[1][i] = 1;
	}
	else {
		for (var i = offset; i < 32; i += space)
			sc[Math.floor(i/16)][i%16] = 1;
	}

	return sc;
}

function getDrumVolume(drum, intensity) {
	return .11;
}

function DrumBeat(intensity) {
	this.space = getDrumSpace(intensity);
	this.hhspace = getHiHatSpace(intensity);
	this.offset = getDrumOffset(this.hhspace, intensity);
	this.on = true;

	this.schedule = {};
	this.schedule["kick"] = scheduleKick(this.offset, this.space, intensity);
	this.schedule["snare"] = scheduleSnare(this.offset, this.space, intensity);
	this.schedule["hihat"] = scheduleHiHat(this.offset, this.hhspace, intensity);

	this.volume = {};
	this.volume["kick"] = getDrumVolume("kick", intensity);
	this.volume["snare"] = getDrumVolume("snare", intensity);
	this.volume["hihat"] = getDrumVolume("hihat", intensity);
}

function playDrum(buffer, time) {
	console.log("playDrum!\n");
	console.log(time);
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	//source.noteOn(time);
}

DrumBeat.prototype.play = function(beatNumber, time) {
	var measure = Math.floor(beatNumber/16);
	var number = Math.floor(beatNumber%16);

	if (this.schedule["kick"][measure][number])
		playDrum(BUFFERS.kick, time);
	if (this.schedule["snare"][measure][number])
		playDrum(BUFFERS.snare, time);
	if (this.schedule["hihat"][measure][number])
		playDrum(BUFFERS.hihat, time);
}
