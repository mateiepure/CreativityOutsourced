var ln = 0;
var curElem = 0;

function addHarmLine(div, high, measure) {
	var line = document.createElement("div");
	line.className = "line";
	div.appendChild(line);

	var name = document.createElement("div");
	name.className = "name";
	name.innerHTML = high;
	line.appendChild(name);

	for (var i = 0; i < 16; ++i) {
		var div = document.createElement("div");
		div.setAttribute("id", "harm"+i+"_"+high);
		var str = "changeHarm("+i+", "+high+", "+measure+")";
		div.setAttribute("onclick", str);
		div.setAttribute("onMouseOver", "this.style.background = 'lightblue'");

		if (harmony.schedule[measure][i] != high) {
			div.style.backgroundColor = 'lightgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
		}
		else {
			div.style.backgroundColor = 'darkgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
		}

		div.className = "note";

		line.appendChild(div);
	}
}

function addBassLine(div, high, measure) {
	var line = document.createElement("div");
	line.className = "line";
	div.appendChild(line);

	var name = document.createElement("div");
	name.className = "name";
	name.innerHTML = high;
	line.appendChild(name);

	for (var i = 0; i < 16; ++i) {
		var div = document.createElement("div");
		div.setAttribute("id", "bass"+i+"_"+high);
		var str = "changeBass("+i+", "+high+", "+measure+")";
		div.setAttribute("onclick", str);
		div.setAttribute("onMouseOver", "this.style.background = 'lightblue'");

		if (bass.schedule[measure][i] != high) {
			div.style.backgroundColor = 'lightgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
		}
		else {
			div.style.backgroundColor = 'darkgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
		}

		div.className = "note";

		line.appendChild(div);
	}
}

function addDrumLine(div, drum, measure) {
	var line = document.createElement("div");
	line.className = "line";
	div.appendChild(line);

	var name = document.createElement("div");
	name.className = "name";
	name.innerHTML = drum;
	line.appendChild(name);

	for (var i = 0; i < 16; ++i) {
		var div = document.createElement("div");
		div.setAttribute("id", drum + i);
		var str = "changeDrum(\""+drum+"\", "+i+", "+measure+")";
		div.setAttribute("onclick", str);
		div.setAttribute("onMouseOver", "this.style.background = 'lightblue'");

		if (!beat.schedule[drum][measure][i]) {
			div.style.backgroundColor = 'lightgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
		}
		else {
			div.style.backgroundColor = 'darkgrey';
			div.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
		}

		div.className = "note";

		line.appendChild(div);
	}
}

function changeHarm(time, high, line) {
	if (harmony.schedule[line][time] == high) {
		harmony.schedule[line][time] = 0;
		element = document.getElementById("harm"+time+"_"+high);
		element.style.backgroundColor = 'lightgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
	}
	else {
		if (harmony.schedule[line][time]) {
			element = document.getElementById("harm"+time+"_"+harmony.schedule[line][time]);
			element.style.backgroundColor = 'lightgrey';
			element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
			element.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
		}

		harmony.schedule[line][time] = high;
		element = document.getElementById("harm"+time+"_"+high);
		element.style.backgroundColor = 'darkgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
	}
}

function changeBass(time, high, line) {
	if (bass.schedule[line][time] == high) {
		bass.schedule[line][time] = 0;
		element = document.getElementById("bass"+time+"_"+high);
		element.style.backgroundColor = 'lightgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
	}
	else {
		if (bass.schedule[line][time]) {
			element = document.getElementById("bass"+time+"_"+bass.schedule[line][time]);
			element.style.backgroundColor = 'lightgrey';
			element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
			element.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
		}

		bass.schedule[line][time] = high;
		element = document.getElementById("bass"+time+"_"+high);
		element.style.backgroundColor = 'darkgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
	}
}

function changeDrum(type, time, line) {
	id = type + time;
	element = document.getElementById(id);

	beat.schedule[type][line][time] ^= 1;
	if (beat.schedule[type][line][time]) {
		element.style.backgroundColor = 'darkgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'darkgrey'");
	}
	else {
		element.style.backgroundColor = 'lightgrey';
		element.setAttribute("onMouseOver", "this.style.background = 'lightblue'");
		element.setAttribute("onMouseOut", "this.style.background = 'lightgrey'");
	}
}
/*
function initScene() {
	var commandSpace = document.createElement("div");
	commandSpace.setAttribute("id", "commands");
	commandSpace.className = "line";
	document.body.appendChild(commandSpace);

	var playButton = document.createElement("div");
	var pl = document.createElement("img");
	playButton.setAttribute("id", "play");
	pl.setAttribute("src", "css/play.png");
	playButton.setAttribute("onclick", "play()");
	playButton.className = "note";
	playButton.appendChild(pl);
	commandSpace.appendChild(playButton);
}
*/
function initDrums(toAdd, line) {
	var element = document.getElementById("drums");
	if (element) {
		document.body.removeChild(element);
	}
	if (toAdd) {
		var drumSpace = document.createElement("div");
		drumSpace.setAttribute("id", "drums");
		drumSpace.className = "space";
		document.body.appendChild(drumSpace);

		addDrumLine(drumSpace, "hihat", line);
		addDrumLine(drumSpace, "snare", line);
		addDrumLine(drumSpace, "kick", line);
	}
}

function initHarm(toAdd, line) {
	var element = document.getElementById("harmony");
	if (element) {
		document.body.removeChild(element);
	}
	if (toAdd) {
		var harmSpace = document.createElement("div");
		harmSpace.setAttribute("id", "harmony");
		harmSpace.className = "space";
		document.body.appendChild(harmSpace);

		addHarmLine(harmSpace, 8, line);
		addHarmLine(harmSpace, 7, line);
		addHarmLine(harmSpace, 6, line);
		addHarmLine(harmSpace, 5, line);
		addHarmLine(harmSpace, 4, line);
		addHarmLine(harmSpace, 3, line);
		addHarmLine(harmSpace, 2, line);
		addHarmLine(harmSpace, 1, line);
	}
}

function initBass(toAdd, line) {
	var element = document.getElementById("bass");
	if (element) {
		document.body.removeChild(element);
	}
	if (toAdd) {
		var bassSpace = document.createElement("div");
		bassSpace.setAttribute("id", "bass");
		bassSpace.className = "space";
		document.body.appendChild(bassSpace);

		addBassLine(bassSpace, 8, line);
		addBassLine(bassSpace, 7, line);
		addBassLine(bassSpace, 6, line);
		addBassLine(bassSpace, 5, line);
		addBassLine(bassSpace, 4, line);
		addBassLine(bassSpace, 3, line);
		addBassLine(bassSpace, 2, line);
		addBassLine(bassSpace, 1, line);
	}
}

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 90) {
		var button = document.getElementById("bassB");
		button.style.background = 'lightgrey';
		button = document.getElementById("drumB");
		button.style.background = 'darkgrey';
		button = document.getElementById("harmB");
		button.style.background = 'lightgrey';
		elem = 0; // show drums
		initBass(0, 0);
		initDrums(1, 0);
		initHarm(0, 0);
	}
});

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 88) {
		var button = document.getElementById("bassB");
		button.style.background = 'darkgrey';
		button = document.getElementById("drumB");
		button.style.background = 'lightgrey';
		button = document.getElementById("harmB");
		button.style.background = 'lightgrey';
		elem = 1; // show bass
		initBass(1, 0);
		initDrums(0, 0);
		initHarm(0, 0);
	}
});

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 67) {
		var button = document.getElementById("bassB");
		button.style.background = 'lightgrey';
		button = document.getElementById("drumB");
		button.style.background = 'lightgrey';
		button = document.getElementById("harmB");
		button.style.background = 'darkgrey';
		elem = 2; // show harm
		initBass(0, 0);
		initDrums(0, 0);
		initHarm(1, 0);
	}
});

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 37) {
		if (ln > 0) {
			var button = document.getElementById("oneB");
			button.style.background = 'darkgrey';
			button = document.getElementById("twoB");
			button.style.background = 'lightgrey';
			if (elem == 2) {
				initHarm(1, ln-1);
				initBass(0, ln-1);
				initDrums(0, ln-1);
				--ln;
			}
			if (elem == 1) {
				initHarm(0, ln-1);
				initBass(1, ln-1);
				initDrums(0, ln-1);
				--ln;
			}
			if (!elem) {
				initHarm(0, ln-1);
				initBass(0, ln-1);
				initDrums(1, ln-1);
				--ln;
			}
		}
	}
});

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 39) {
		if (ln < 1) {
			var button = document.getElementById("oneB");
			button.style.background = 'lightgrey';
			button = document.getElementById("twoB");
			button.style.background = 'darkgrey';
			if (elem == 2) {
				initHarm(1, ln+1);
				initBass(0, ln+1);
				initDrums(0, ln+1);
				++ln;
			}
			if (elem == 1) {
				initHarm(0, ln+1);
				initBass(1, ln+1);
				initDrums(0, ln+1);
				++ln;
			}
			if (!elem) {
				initHarm(0, ln+1);
				initBass(0, ln+1);
				initDrums(1, ln+1);
				++ln;
			}
		}
	}
});
