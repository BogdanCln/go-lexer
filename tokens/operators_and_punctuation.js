/**
 * https://golang.org/ref/spec#Operators_and_punctuation
 * The following character sequences represent operators (including assignment operators) and punctuation:
 * +    &     +=    &=     &&    ==    !=    (    )
 * -    |     -=    |=     ||    <     <=    [    ]
 * *    ^     *=    ^=     <-    >     >=    {    }
 * /    <<    /=    <<=    ++    =     :=    ,    ;
 * %    >>    %=    >>=    --    !     ...   .    :
 * &^   &^=
 */

// Special characters in regular expressions which have to be escaped are:
// . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -
module.exports = [
    /\+/,
    /&/,
    /\+\=/,
    /&\=/,
    /&&/,
    /\=\=/,
    /\!\=/,
    /\(/,
    /\)/,
    /\-/,
    /\|/,
    /\-\=/,
    /\|\=/,
    /\|\|/,
    /\</,
    /\<\=/,
    /\[/,
    /\]/,
    /\*/,
    /\^/,
    /\*\=/,
    /\^\=/,
    /\<\-/,
    /\>/,
    /\>\=/,
    /\{/,
    /\}/,
    /\//,
    /\<\</,
    /\/\=/,
    /\<\<\=/,
    /\+\+/,
    /\=/,
    /\:\=/,
    /,/,
    /;/,
    /%/,
    /\>\>/,
    /%\=/,
    /\>\>\=/,
    /\-\-/,
    /\!/,
    /\.\.\./,
    /\./,
    /\:/,
    /\&\^/,
    /\&\^\=/
]