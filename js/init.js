var BUFFERS = {};
var context = null;
var player = null;

var BUFFERS_TO_LOAD = {
  kick: 'sounds/kick.wav',
  snare: 'sounds/snare.wav',
  hihat: 'sounds/hihat.wav',
  bass: 'sounds/bass.wav',
  epiano: 'sounds/epiano.wav'
//  guitar: 'TODO'
};

// Loads all sound samples into the buffers object.
function loadBuffers() {
    context = new webkitAudioContext();
	// Array-ify
	var names = [];
	var paths = [];

	for (var name in BUFFERS_TO_LOAD) {
		var path = BUFFERS_TO_LOAD[name];
		names.push(name);
		paths.push(path);
	}

	bufferLoader = new BufferLoader(context, paths, function(bufferList) {
		for (var i = 0; i < bufferList.length; i++) {
			var buffer = bufferList[i];
			var name = names[i];
			BUFFERS[name] = buffer;
		}
	});
	bufferLoader.load();
}
