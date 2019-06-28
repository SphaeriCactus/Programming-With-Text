let input, button, output, processDropdown, posDropdown;

function setup() {
	noCanvas();
	input = select("#input");
	button = select("#submit");
	output = select("#output");
	processDropdown = select("#processDropdown");
	posDropdown = select("#posDropdown");

	button.mousePressed(process);
	input.changed(process);
}

function process() {
	let s = input.value();
	let rs = new RiString(s);
	let words = rs.words();
	let posD = posDropdown.value();
	let proD = processDropdown.value();
	let regex = new RegExp(posD + ".*");

	let outputTxt = "";
	for (let i = 0; i < words.length; i ++) {
		let word = words[i];
		let posC = rs.pos()[i];
		if (regex.test(posC)) {
			switch (proD) {
				case "rhyming":
					let rhymingWords = RiTa.rhymes(word);
					if (rhymingWords.length == 0) {
						outputTxt += word + " ";
					} else {
						outputTxt += random(rhymingWords) + " ";
					}
					break;
				case "similar sounding":
					let soundingWords = RiTa.similarBySound(word);
					if (soundingWords.length == 0) {
						outputTxt += word + " ";
					} else {
						outputTxt += random(soundingWords) + " ";
					}
					break;
				case "random":
					let randomW = RiTa.randomWord(posC);
					outputTxt += randomW + " ";
					break;
				case "same syllables":
					let syllables = splitTokens(RiTa.getSyllables(word), "/");
					let randomWS = RiTa.randomWord(posC, syllables.length);
					outputTxt += randomWS + " ";
					break;
			}
		} else {
			outputTxt += word + " ";
		}
	}

	output.html(outputTxt);
}
