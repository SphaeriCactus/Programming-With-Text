let nlp = window.nlp;
let input;
let submit;

function setup() {
	console.log(nlp("goose").nouns().toPlural().out());
	input = createInput();
	submit = createButton("Submit");
	submit.mousePressed(onSubmit);
}

function onSubmit() {
	let output = input.value();
	output = nlp(output).sentences().toNegative().toFutureTense().out();
	createP(output);
}
