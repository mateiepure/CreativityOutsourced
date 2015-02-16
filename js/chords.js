var harmony;

function makeSchedule(intensity, space, offset){
	var sc = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	for (var i = offset; i < 32; i += space) {
		if (flavor)
			sc[Math.floor(i/16)][i%16] = Math.floor(Math.random()*6)+1;
		else
			sc[Math.floor(i/16)][i%16] = Math.floor(Math.random()*6)+3;
	}
	sc[1][12+offset] = 1;

	var chance3 = Math.floor(Math.random()*2);
	if (intensity > 3 && chance3) {
		for (var i = offset + (space/2); i < 32; i += space) {
			sc[Math.floor(i/16)][i%16] = sc[Math.floor((i-(space/2))/16)][(i-(space/2))%16];
		}
		if (offset) {
			sc[0][0] = sc[1][16-offset];
		}
	}

	var chance = Math.floor(Math.random()*3);
	if (intensity > 4 && chance == 2) {
		for (var i = offset + (space/4)*3; i < 32; i += space) {
			sc[Math.floor(i/16)][i%16] = sc[Math.floor((i-(space/4)*3)/16)][(i-(space/4)*3)%16];
		}
	}

	return sc;
}

function Harmony(intensity) {
	this.space = 8;

	if (intensity >= 3)
		this.offset = Math.floor(Math.random()*2) * Math.floor((this.space/2));
	else
		this.offset = 0;

	this.on = true;

	this.schedule = makeSchedule(intensity, this.space, this.offset);
}

function playSound(value, time) {
	var source = context.createBufferSource();
	source.buffer = BUFFERS.epiano;
	source.playbackRate.value = value;
	source.connect(context.destination);
	source.noteOn(time);
	if (intensity < 3)
		source.noteOff(time + (240.0/BPM));
	else
		source.noteOff(time + (120.0/BPM));
}

function playChord(root, time) {
	var baseSound = freq[scale[flavor][root]];
	playSound(baseSound, time);
	playSound(baseSound*freq[3+flv[flavor][root]], time);
	playSound(baseSound*freq[7], time);
}

Harmony.prototype.play = function(beatNumber, time) {
	var measure = Math.floor(beatNumber/16);
	var number = beatNumber%16;

	if (this.schedule[measure][number])
		playChord(this.schedule[measure][number], time);
}
