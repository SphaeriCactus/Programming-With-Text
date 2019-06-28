let textArea;
let button;
let output;

function setup() {
	noCanvas();
	textArea = select("#area");
	button = select("#submit");
	output = select("#output");

	button.mousePressed(newText);
	textArea.input(newTyping);
}

function newText() {
	createP(textArea.value());
}

function newTyping() {
	output.html(textArea.value());
}
