/**
 * https://golang.org/ref/spec#Integer_literals
 * An integer literal is a sequence of digits representing an integer constant. 
 * An optional prefix sets a non-decimal base: 0b or 0B for binary, 0, 0o, or 0O for octal, and 0x or 0X for hexadecimal. 
 * A single 0 is considered a decimal zero. 
 * In hexadecimal literals, letters a through f and A through F represent values 10 through 15.
 * For readability, an underscore character _ may appear after a base prefix or between successive digits; such underscores do not change the literal's value.
 * 
 * EBNF = Extended Backus–Naur form:
 * EBNF int_lit        = decimal_lit | binary_lit | octal_lit | hex_lit .
 * EBNF decimal_lit    = "0" | ( "1" … "9" ) [ [ "_" ] decimal_digits ] .
 * EBNF binary_lit     = "0" ( "b" | "B" ) [ "_" ] binary_digits .
 * EBNF octal_lit      = "0" [ "o" | "O" ] [ "_" ] octal_digits .
 * EBNF hex_lit        = "0" ( "x" | "X" ) [ "_" ] hex_digits .
 *  
 * EBNF decimal_digits = decimal_digit { [ "_" ] decimal_digit } .
 * EBNF binary_digits  = binary_digit { [ "_" ] binary_digit } .
 * EBNF octal_digits   = octal_digit { [ "_" ] octal_digit } .
 * EBNF hex_digits     = hex_digit { [ "_" ] hex_digit } .
 * 
 * decimal_digit = "0" … "9" .
 * binary_digit  = "0" | "1" .
 * octal_digit   = "0" … "7" .
 * hex_digit     = "0" … "9" | "A" … "F" | "a" … "f" .
 */

module.exports = [
    // EBNF decimal_digits = decimal_digit { [ "_" ] decimal_digit } .
    /\d(_?\d)*/,

    // EBNF binary_digits  = binary_digit { [ "_" ] binary_digit } .
    /[01](_?[01])*/,

    // EBNF octal_digits   = octal_digit { [ "_" ] octal_digit } .
    /[0-7](_?[0-7])*/,

    // EBNF hex_digits     = hex_digit { [ "_" ] hex_digit } .
    /[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*/,

    // EBNF decimal_lit    = "0" | ( "1" … "9" ) [ [ "_" ] decimal_digits ] .
    /0|\d(\d(_?\d)*)?/,

    // EBNF binary_lit     = "0" ( "b" | "B" ) [ "_" ] binary_digits .
    /0|[bB]_?[01](_?[01])*/,

    // EBNF octal_lit      = "0" [ "o" | "O" ] [ "_" ] octal_digits .
    /0[oO]?_?[0-7](_?[0-7])*/,

    // EBNF hex_lit        = "0" ( "x" | "X" ) [ "_" ] hex_digits .
    /0[xX]_?[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*/,

    //  EBNF int_lit       = decimal_lit | binary_lit | octal_lit | hex_lit .
    //  will already match one of them, no need to run another regex
]