/**
 * golang lexical tokenizer
 * Student: Calina Bogdan-Ionut
 * Grupa: 342
 * Referinta: https://golang.org/ref/spec - martie 2020
 */

const Lexer = require("lex");

// 1-based row / column count
let row = 1;
let col = 1;
let pointer = 0;

const lexer = new Lexer(function (char) {
	const errm = `Unexpected character at row ${row}, col ${col}: '${char}'`;
	// debug(errm);

	col++;
	pointer++;

	throw (new Error(errm));
});

function parseSelection (selection, token) {
	const stats = {
		type: token,
		// selection: selection,
		length: selection.length,
		line: row,
		pointer: pointer
	};

	pointer += selection.length;

	// Add the number of newlines to the row counter
	const NLNO = (selection.match(/\n/g) || []).length;
	row += NLNO;

	// Set the column counter as the number of characters from the last newline
	if (NLNO === 0) { col += selection.length; } else { col += selection.length - selection.lastIndexOf("\n"); }

	return stats;
}

/**
 * https://golang.org/ref/spec#Comments
 * Comments serve as program documentation. There are two forms:
 * Line comments start with the character sequence // and stop at the end of the line.
 * General comments start with the character sequence /* and stop with the first subsequent character sequence */ /*
* A comment cannot start inside a rune or string literal, or inside a comment.
* A general comment containing no newlines acts like a space.
* Any other comment acts like a newline.
*/

// Single line comment rule
lexer.addRule(/\/\/.*/, s => parseSelection.call(this, s, "Single line comment"));

// Multi line comment rule
lexer.addRule(/\/\*(.|\s)*?\*\//, s => parseSelection.call(this, s, "Multi line comment"));

/**
 * https://golang.org/ref/spec#Tokens
 * Tokens form the vocabulary of the Go language.
 * There are four classes: identifiers, keywords, operators and punctuation, and literals.
 * White space, formed from spaces (U+0020), horizontal tabs (U+0009),
 *  carriage returns (U+000D), and newlines (U+000A), are ignored except as they separate tokens
 *  that would otherwise combine into a single token.
 * Also, a newline or end of file may trigger the insertion of a semicolon.
 * While breaking the input into tokens, the next token is the longest sequence of characters that form a valid token.
*/

const TOKENS = [
	"identifiers",
	"keywords",
	"operators_and_punctuation",
	"literals"
];

for (const token of TOKENS) {
	const PATTERNS = require("./tokens/" + token);
	for (const pattern of PATTERNS) {
		lexer.addRule(pattern, s => parseSelection.call(this, s, token));
	}
}

/**
 * https://golang.org/ref/spec#Semicolons
 * The formal grammar uses semicolons ";" as terminators in a number of productions.
 * Go programs may omit most of these semicolons using the following two rules:
 * When the input is broken into tokens, a semicolon is automatically inserted into the token
 *  stream immediately after a line's final token if that token is
 *  an identifier an integer, floating-point, imaginary, rune,
 *  or string literal one of the keywords break, continue, fallthrough,
 *  or return one of the operators and punctuation ++, --, ), ], or }
 * To allow complex statements to occupy a single line, a semicolon may be omitted before a closing ")" or "}".
 * To reflect idiomatic use, code examples in this document elide semicolons using these rules.
*/

lexer.addRule(/;/g, s => parseSelection.call(this, s, "semicolon"));

/**
 * Other tokens that help debugging the lexer
 * newline
 * innocent whitespace
 * non-lexed characters
 */

// Newline rule
// Updates row number and column number
lexer.addRule(/\n/g, s => parseSelection.call(this, s, "newline"));

// Innocent whitespace
// Update column number and pointer
lexer.addRule(/\s/g, s => parseSelection.call(this, s, "whitespace"));

// Any character out of rules - throws error
// Update column number and pointer
lexer.addRule(/./, function () { this.reject = true; }, []);

module.exports = lexer;
