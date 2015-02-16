var isPlaying = false;			// Are we currently playing?
var startTime;					// The start time of the entire sequence.
var current16thNote;			// What note is currently last scheduled?
var lookahead = 25.0;			// How frequently to call scheduling function 
								//(in milliseconds)
var last16thNoteDrawn = -1;
var scheduleAheadTime = 0.1;	// How far ahead to schedule audio (sec)
								// This is calculated from lookahead, and overlaps 
								// with next interval (in case the timer is late)
var nextNoteTime = 0.0;			// when the next note is due.
var noteResolution = 0;			// 0 == 16th, 1 == 8th, 2 == quarter note
var noteLength = 0.05;			// length of "beep" (in seconds)
var timerID = 0;				// setInterval identifier.
var notesInQueue = [];			// the notes that have been put into the web audio,
								// and may or may not have played yet. {note, time}

// First, let's shim the requestAnimationFrame API, with a setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / BPM;	// Notice this picks up the CURRENT 
    									// tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;	// Add beat length to last beat time

    current16thNote++;	// Advance the beat number, wrap to zero
    if (current16thNote == 32) {
        current16thNote = 0;
    }
}

function scheduleNote(beatNumber, time) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );

    if (beat.on)
        beat.play(beatNumber, time);
    if (bass.on)
        bass.play(beatNumber, time);
    if (harmony.on)
        harmony.play(beatNumber, time);
/*    if (thrills.on)
        thrills.play(beatNumber, time);*/
}

function scheduler() {
	// while there are notes that will need to play before the next interval, 
	// schedule them and advance the pointer.
	while (nextNoteTime < context.currentTime + scheduleAheadTime) {
		scheduleNote(current16thNote, nextNoteTime);
		nextNote();
	}
	timerID = window.setTimeout(scheduler, lookahead);
}

function play() {
    //changePlaySign();

    isPlaying = !isPlaying;

	if (isPlaying) { // start playing
        var button = document.getElementById("stbt");
        button.innerHTML = ">";

		current16thNote = 0;
        nextNoteTime = context.currentTime;
		scheduler(); // kick off scheduling
		return "stop";
	}
	else {
        var button = document.getElementById("stbt");
        button.innerHTML = "&#127771";
		window.clearTimeout(timerID);
		return "play";
	}
}

function keepTime() {
    var currentNote = last16thNoteDrawn;
    var currentTime = context.currentTime;

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        currentNote = notesInQueue[0].note;
        notesInQueue.splice(0,1);   // remove note from queue
    }
    requestAnimFrame(keepTime);

    // We only need to draw if the note has moved.
    if (last16thNoteDrawn != currentNote) {
        last16thNoteDrawn = currentNote;
    }
}
