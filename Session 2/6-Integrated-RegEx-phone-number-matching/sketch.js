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
	let r = /\(?\d{3}\)?[-.]?\d{3}[-.]\d{4}/g;

	let result = r.test(s);
	let resultP = createP("Are there any phone numbers in this text? >> " + (result ? "Yes" : "No"));
	output.child(resultP);

	let matches = s.match(r);
	for (let match of matches) {
		let p = createP(match);
		output.child(p);
	}
}
