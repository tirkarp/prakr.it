let isPlaying = false;

function manageAudio() {
	let song = document.getElementById("song");
	let ret = isPlaying ? song.pause() : song.play();
	isPlaying = !isPlaying;
}