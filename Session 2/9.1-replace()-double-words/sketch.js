let input;
let button;
let output;

function setup() {
	noCanvas();
	input = select("#input");
	button = select("#submit");
	output = select("#output");

	button.mousePressed(newText);
}

function newText() {
	output.remove();

	output = createDiv();

	let s = input.value();
	let r = /\b(\w+)\b\s\b\1\b/g;

	let result = s.replace(r, replacer);
	
	input.value(result);
}

function replacer(match, group1) {
	let p = createP(match + " -> " + group1);
	output.child(p);
	return group1;
}
