let input, button, output, dropdown;

function setup() {
	noCanvas();
	input = select("#input");
	button = select("#submit");
	output = select("#output");
	dropdown = select("#dropdown");

	button.mousePressed(newText);
}

function newText() {
	let s = input.value();
	let r = /\b(\w+)\b/g;

	let result = s.replace(r, replacer);

	output.value(result);
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
