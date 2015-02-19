function paPlay(buffer, high, volume) {
	player.source = context.createBufferSource();
	player.source.buffer = buffer;
	player.source.playbackRate.value = high;
	player.source.connect(context.destination);
	player.source.noteOn(0);
	player.source.noteOff(context.currentTime + 4*(60.0/BPM)/5);
}
function Player() {
	this.buffer = BUFFERS.epiano;
	var source;
}

Player.prototype.getBuffer = function() {
	if (!this.buffer)
		this.buffer= BUFFERS.epiano;

	return this.buffer;
}

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 65) { // C
		paPlay(player.getBuffer(), freq[0], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 87) { // C#
		paPlay(player.getBuffer(), freq[1], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 83) { // D
		paPlay(player.getBuffer(), freq[2], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 69) { // Eb
		paPlay(player.getBuffer(), freq[3], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 68) { // E
		paPlay(player.getBuffer(), freq[4], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 70) { // F
		paPlay(player.getBuffer(), freq[5], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 84) { // F#
		paPlay(player.getBuffer(), freq[6], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 71) { // G
		paPlay(player.getBuffer(), freq[7], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 89) { // Ab
		paPlay(player.getBuffer(), freq[8], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 72) { // A
		paPlay(player.getBuffer(), freq[9], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 85) { // Bb
		paPlay(player.getBuffer(), freq[10], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 74) { // B
		paPlay(player.getBuffer(), freq[11], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 75) { // C
		paPlay(player.getBuffer(), freq[12], 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 79) { // C#
		paPlay(player.getBuffer(), freq[1]*2, 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 76) { // D
		paPlay(player.getBuffer(), freq[2]*2, 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 80) { // Eb
		paPlay(player.getBuffer(), freq[3]*2, 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 186) { // E
		paPlay(player.getBuffer(), freq[4]*2, 0);
	}
});
document.addEventListener('keydown', function (event) {
	if (event.keyCode == 222) { // F
		paPlay(player.getBuffer(), freq[5]*2, 0);
	}
});
/*document.addEventListener('keydown', function (event) {
	if (event.keyCode == 32) {
		play();
	}
});*/
