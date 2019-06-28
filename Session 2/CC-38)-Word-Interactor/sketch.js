let input, button, output, outputDiv;
let dropdown;

function setup() {
	noCanvas();
	input = select("#input");
	button = select("#submit");
	output = select("#output");
	outputDiv = select("#outputDiv");
	dropdown = select("#dropdown");

	button.mousePressed(newText);
}

function click() {
	let newWord = translator(this.html());
	this.html(newWord);
}

function newText() {
	output.remove();
	output = createP();
	output.parent(outputDiv);

	let s = input.value();
	let r = /(\W+)/g;

	let words = s.split(r);
	for (let i = 0; i < words.length; i ++) {
		let newSpan = createSpan(words[i]);
		newSpan.parent(output);

		if (/\W+/.test(words[i]) == false) {
			newSpan.class("wordSpan");
			newSpan.mouseClicked(click);
		}
	}
}

function replacer(match, word) {
	let newWord = translator(word);

	return newWord;
}

function translator(_word) {
	let word = _word.toLowerCase();
	let result = "";
	let firstVowel;
	let consonants;

	if (word[0] != "y") {
		firstVowel = word.search(/[aeiouy]/);
	} else {
		firstVowel = word.slice(1, word.length).search(/[aeiouy]/) + 1;
	}

	if (firstVowel == -1) {
		result = word;
	} else {
		result = word.slice(firstVowel, word.length);
		consonants = word.slice(0, firstVowel);
	}

	if (firstVowel == 0) {
		result += "-" + dropdown.value();
	} else {
		if (firstVowel != -1) {
			result += "-" + consonants + "ay";
		}
	}

	return result;
}
