/**
 * https://golang.org/ref/spec#Identifiers
 * Identifiers name program entities such as variables and types. 
 * An identifier is a sequence of one or more letters and digits. 
 * The first character in an identifier must be a letter.
 * 
 * EBNF = Extended Backus–Naur form:
 * EBNF identifier = letter { letter | unicode_digit } .
 * EBNF letter     = unicode_letter | "_" .
 */

module.exports = [
    //  EBNF identifier
    /(\w|_)((\w|_)|\d)*/,
]