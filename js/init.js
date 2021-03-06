var BUFFERS = {};
var context = null;
var player = null;

var BUFFERS_TO_LOAD = {
  kick: '/CreativityOutsourced/sounds/kick.wav',
  snare: '/CreativityOutsourced/sounds/snare.wav',
  hihat: '/CreativityOutsourced/sounds/hihat.wav',
  bass: '/CreativityOutsourced/sounds/bass.wav',
  epiano: '/CreativityOutsourced/sounds/epiano.wav'
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
