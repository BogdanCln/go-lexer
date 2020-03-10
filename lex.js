const Lexer = require("lex");

// 1-based row / column count, as in any popular text editor
let row = 1,
    col = 1,
    pointer = 0;

let lexer = new Lexer(function (char) {
    throw new Error("Unexpected character at row " + row + ", col " + col + ": " + char);
});

// Newline rule
lexer.addRule(/\n/, function () {
    row++;
    col = 1;
}, []);

// Any character rule - column counting
lexer.addRule(/./, function () {
    this.reject = true;
    col++;
    pointer++;
}, []);

// package definition

lexer.addRule(/package .+/, function () {
    return {
        type: "package",
        length: "TODO",
        line: row,
        pointer: pointer,
        errMsg: null  
    };
);

module.exports = lexer;