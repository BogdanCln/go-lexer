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

let dgt = {
	dec: new RegExp(/\d(_?\d)*/),
	bin: new RegExp(/[01](_?[01])*/),
	oct: new RegExp(/[0-7](_?[0-7])*/),
	hex: new RegExp(/[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*/)
};

let intLiterals = {
	// EBNF decimal_digits = decimal_digit { [ "_" ] decimal_digit } .
	decimal_digits: dgt.dec,

	// EBNF binary_digits  = binary_digit { [ "_" ] binary_digit } .
	binary_digits: dgt.bin,

	// EBNF octal_digits   = octal_digit { [ "_" ] octal_digit } .
	octal_digits: dgt.oct,

	// EBNF hex_digits     = hex_digit { [ "_" ] hex_digit } .
	hex_digits: dgt.hex,

	// EBNF decimal_lit    = "0" | ( "1" … "9" ) [ [ "_" ] decimal_digits ] .
	decimal_lit: new RegExp(`0|\\d(_?${dgt.dec})?`),

	// EBNF binary_lit     = "0" ( "b" | "B" ) [ "_" ] binary_digits .
	binary_lit: new RegExp(`0[bB]_?${dgt.bin}`),

	// EBNF octal_lit      = "0" [ "o" | "O" ] [ "_" ] octal_digits .
	octal_lit: new RegExp(`0[oO]?_?${dgt.oct}`),

	// EBNF hex_lit        = "0" ( "x" | "X" ) [ "_" ] hex_digits .
	hex_lit: new RegExp(`0[xX]_?${dgt.hex}`)

	//  EBNF int_lit       = decimal_lit | binary_lit | octal_lit | hex_lit .
	//  will already match one of them, no need to run another regex
};

/**
 * https://golang.org/ref/spec#Floating-point_literals
 * A floating-point literal is a decimal or hexadecimal representation of a floating-point constant.
 * A decimal floating-point literal consists of an integer part (decimal digits), a decimal point, 
 *  a fractional part (decimal digits), and an exponent part (e or E followed by an optional sign and decimal digits). 
 * One of the integer part or the fractional part may be elided; one of the decimal point or the exponent part may be elided. 
 * An exponent value exp scales the mantissa (integer and fractional part) by 10exp.
 * A hexadecimal floating-point literal consists of a 0x or 0X prefix, an integer part (hexadecimal digits), a radix point, 
 *  a fractional part (hexadecimal digits), and an exponent part (p or P followed by an optional sign and decimal digits). 
 * One of the integer part or the fractional part may be elided; the radix point may be elided as well, but the exponent part is required. 
 *  (This syntax matches the one given in IEEE 754-2008 §5.12.3.) 
 * An exponent value exp scales the mantissa (integer and fractional part) by 2exp.
 * For readability, an underscore character _ may appear after a base prefix or between successive digits; 
 *  such underscores do not change the literal value.
 * 
 * EBNF = Extended Backus–Naur form:
 * EBNF float_lit         = decimal_float_lit | hex_float_lit .
 * EBNF decimal_float_lit = decimal_digits "." [ decimal_digits ] [ decimal_exponent ] | 
 * 							literals"." decimal_digits [ decimal_exponent ] .
 * EBNF decimal_exponent  = ( "e" | "E" ) [ "+" | "-" ] decimal_digits .
 * EBNF hex_float_lit     = "0" ( "x" | "X" ) hex_mantissa hex_exponent .
 * EBNF hex_mantissa      = [ "_" ] hex_digits "." [ hex_digits ] |
							[ "_" ] hex_digits | 
							"." hex_digits .
 * EBNF hex_exponent      = ( "p" | "P" ) [ "+" | "-" ] decimal_digits .
 */

let exp = {
	dec: new RegExp(`[eE][+-]?${dgt.dec}`),
	hex: new RegExp(`[pP][+-]?${dgt.dec}`)
};

// without constructing: /(_?[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*\.([\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)?)|(_[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)|(\.[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)/,
let hex_man = new RegExp(`(_?${dgt.hex}.(${dgt.hex})?)|(_${dgt.hex})|(.${dgt.hex})`);

let floatLiterals = {
	// EBNF decimal_exponent
	decimal_exponent: exp.dec,

	// EBNF decimal_float_lit
	decimal_float_lit: new RegExp(`(${dgt.dec}.(${dgt.dec})?(${exp.dec})?)|(${dgt.dec}${exp.dec})|(.${dgt.dec})(${exp.dec})?`),

	// EBNF hex_mantissa
	hex_mantissa: hex_man,

	// EBNF hex_exponent
	hex_exponent: exp.hex,

	// EBNF hex_float_lit
	// without constructing: /0[xX](_?[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*\.([\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)?)|(_[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)|(\.[\d(A-F)(a-f)](_?[\d(A-F)(a-f)])*)[pP][+-]?\d(_?\d)*/
	hex_float_lit: new RegExp(`0[xX]${hex_man}${exp.hex}`)

	// EBNF float_lit         = decimal_float_lit | hex_float_lit .
	// will already match one of them, no need to run another regex
};

module.exports = {...intLiterals, ...floatLiterals};