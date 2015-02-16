function start() {
	var startSpace = document.createElement("div");
	startSpace.className = "space";
	startSpace.setAttribute("id", "start");
	document.body.appendChild(startSpace);

	var qst = document.createElement("div");
	qst.className = "text";
	qst.innerHTML = "How intense do you want the song to be?";
	startSpace.appendChild(qst);

	var btsp = document.createElement("div");
	btsp.className = "line";
	startSpace.appendChild(btsp);

	for (var i = 1; i <= 5; ++i) {
		var button = document.createElement("div");
		button.className = "note";
		button.innerHTML = i;
		button.setAttribute("onclick", "getFlavor("+i+")");
		btsp.appendChild(button);
	}
}

function getFlavor(ints) {
	var startSpace = document.getElementById("start");
	document.body.removeChild(startSpace);
	startSpace = document.createElement("div");
	startSpace.className = "space";
	startSpace.setAttribute("id", "flavor");
	document.body.appendChild(startSpace);

	var qst = document.createElement("div");
	qst.className = "text";
	qst.innerHTML = "What flavor do you want it to have?";
	startSpace.appendChild(qst);

	var btsp = document.createElement("div");
	btsp.className = "line";
	startSpace.appendChild(btsp);

	var button = document.createElement("div");
	button.className = "note";
	button.setAttribute("id", "good");
	button.setAttribute("onclick", "init("+ints+", 1)");
	btsp.appendChild(button);

	var button = document.createElement("div");
	button.className = "note";
	button.setAttribute("id", "sad");
	button.setAttribute("onclick", "init("+ints+", 0)");
	btsp.appendChild(button);
}

function makeControlLine() {
	var cLine = document.createElement("div");
	cLine.className = "line";
	document.body.appendChild(cLine);

	var startButton = document.createElement("div");
	startButton.className = "note";
	startButton.setAttribute("id", "stbt");
	startButton.setAttribute("onclick", "play()");
	startButton.innerHTML = "&#127771";
	cLine.appendChild(startButton);

	var drumButton = document.createElement("div");
	drumButton.className = "note";
	drumButton.setAttribute("id", "drumB");
	drumButton.innerHTML = "Dr";
	cLine.appendChild(drumButton);

	var bassButton = document.createElement("div");
	bassButton.className = "note";
	bassButton.setAttribute("id", "bassB");
	bassButton.innerHTML = "Ba";
	cLine.appendChild(bassButton);

	var harmButton = document.createElement("div");
	harmButton.className = "note";
	harmButton.setAttribute("id", "harmB");
	harmButton.innerHTML = "Ch";
	cLine.appendChild(harmButton);

	var oneButton = document.createElement("div");
	oneButton.className = "note";
	oneButton.setAttribute("id", "oneB");
	oneButton.innerHTML = "1";
	cLine.appendChild(oneButton);

	var twoButton = document.createElement("div");
	twoButton.className = "note";
	twoButton.setAttribute("id", "twoB");
	twoButton.innerHTML = "2";
	cLine.appendChild(twoButton);
}

function makeInfoLine() {
	var info = document.createElement("div");
	info.setAttribute("id", "info");
	document.body.appendChild(info);

	var button = document.createElement("div");
	button.innerHTML = "Info";
	button.setAttribute("id", "infoTitle");
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "Space -> Play/Stop";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "Z -> Show Drums";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "X -> Show Bass";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "C -> Show Chord Progression";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "Left Arrow -> Measure 1";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "Right Arrow -> Measure 2";
	button.className = "infotxt";
	info.appendChild(button);

	var button = document.createElement("div");
	button.innerHTML = "Play notes using the keys on the row a to \"";
	button.className = "infotxt";
	info.appendChild(button);
}

function makePlayLine() {
	var blackLine = document.createElement("div");
	blackLine.className = "soundLine";
	document.body.appendChild(blackLine);

	var whiteLine = document.createElement("div");
	whiteLine.className = "soundLine";
	document.body.appendChild(whiteLine);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "C");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "D");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "E");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "F");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "G");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "A");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "B");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "Cu");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "Du");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "Eu");
	whiteLine.appendChild(button);

	var button = document.createElement("div");
	button.className = 'key';
	button.setAttribute("id", "Fu");
	whiteLine.appendChild(button);
}

function init(ints, flvr) {
	var startSpace = document.getElementById("flavor");
	document.body.removeChild(startSpace);

	intensity = ints;
	flavor = flvr;

	makeControlLine();
	makeInfoLine();
	makePlayLine();

	loadBuffers();
	requestAnimFrame(keepTime); // start the loop
	//initScene();
	beat = new DrumBeat(intensity);
	harmony = new Harmony(intensity);
	bass = new BassLine(intensity);
	player = new Player();
}
