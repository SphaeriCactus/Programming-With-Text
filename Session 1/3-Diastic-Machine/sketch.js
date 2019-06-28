let inputPhrase, inputFile, button, output;
let file, fileContent;

function setup() {
	noCanvas();
	inputPhrase = select("#inputPhrase");
	inputFile = select("#inputFile");
	button = select("#submit");
	output = select("#output");

	button.mousePressed(check);
	//textArea.input(newTyping);

	$(document).ready(function() {
		$("#inputFile").change(function(d) {
			file = d.target.files[0];

			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(e) {
				fileContent = e.target.result.toString();
			};
		});
	});
}

function check() {
	if (inputPhrase.value().trim() != "") {
		if (file) {
			if (fileContent.trim() != "") {
				let result = generate(inputPhrase.value().trim(), fileContent.trim());
				createP(result);
			} else {
				console.error("Please select a file containing text before attempting to generate a story.");
			}
		} else {
			console.error("Please select a file before attempting to generate a story.");
		}
	} else {
		console.error("Please type in a seed phrase before attempting to generate a story.");
	}
}

/*
let pSeed = _seed.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); // Getting rid of punctuation
pSeed = pSeed.replace(/\s{2,}/g," ");
*/

function generate(_seed, _origin) {
	let result = ""; // This is the result of the algorithm; we will be adding on to it later

	// First, we will separate both the seed and the origin into words

	let seedPhrase = _seed.toLowerCase().trim();
	seedPhrase = splitTokens(seedPhrase, " \n\r[.,/#!$%^&*;:{}=-_`~()]\"'");
	let origin = _origin.toLowerCase().trim();
	origin = splitTokens(origin, " \n\r[.,/#!$%^&*;:{}=-_`~()]\"'");

	// Now we make one array storing all of the characters in the seed,
	// and we make another one storing all of the corresponding indices
	// of the characters from their original words
	let seedChars = [];
	let seedIndices = [];
	for (let w = 0; w < seedPhrase.length; w ++) {
		for (var i = 0; i < seedPhrase[w].length; i ++) {
			seedChars.push(seedPhrase[w][i]);
			seedIndices.push(i);
		}
	}

	// These variables store which index we are currently looking at
	// in our seed variables
	let index = 0;
	let totalIndex = 0;

	// Now we will loop through the origin text searching for words according
	// to the algorithm (Diastic Machine) and will add those words to the result
	for (var w = 0; w < origin.length; w ++) {
		let word = origin[w];
		// Now we check to see if the character in the word at the index we
		// are on matches the letter we are on
		if (word.length > index) {
			// ^ Just checks to make sure that the word is long enough to
			// even possibly have a letter at that index
			if (word[index] == seedChars[totalIndex]) {
				console.log(index);
				result += word + " ";

				index ++;
				totalIndex ++;

				if (seedIndices[totalIndex] == 0) {
					index = 0;
				}

				if (totalIndex >= seedChars.length) {
					break;
				}
			}
		}
	}

	return result;
}
