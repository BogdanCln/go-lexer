/**
 * golang lexical tokenizer
 * Student: Calina Bogdan-Ionut
 * Grupa: 342
 * Referinta: https://golang.org/ref/spec - martie 2020
 */

require("dotenv").config({ path: "parse.env" });
const fs = require("fs");

const lexer = require("./lexWrapper");
const debug = require("debug")("parse.js");
const debugFile = require("debug")("input >");

const sourcePath = process.argv[2];

if (!sourcePath) {
	debug("No input path specified as process argument");
	process.exit(0);
}

let sourceContent;
try {
	// Go source code is Unicode text encoded in UTF-8.
	sourceContent = fs.readFileSync(sourcePath, { encoding: "utf-8", flag: "r" });
	debugFile(sourceContent);

	lexer.input = sourceContent;
} catch (error) {
	debug("Failed to read the specified source file.");
	debug(error);
	process.exit(0);
}

const results = [];
let gotErrors = false;

function recursiveLex () {
	try {
		const result = lexer.lex();
		if (result) {
			results.push(result);

			recursiveLex();
		} else if (result === undefined) {
			debug("Reached end of source file");

			if (!gotErrors) {
				for (const result of results) {
					console.table(result);
				}
			}
		}
	} catch (error) {
		gotErrors = true;
		debug(error.message);
		recursiveLex();
	}
}

recursiveLex();
