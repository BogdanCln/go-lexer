
// Single line comment rule
lexer.addRule(/\/\/.*/, s => generateStat.bind(this)(s, "SLC"));

// Multi line comment rule
lexer.addRule(/\/\*(.|\s)*\*\//, s => generateStat.bind(this)(s, "MLC"));

// // package syntax rule
// lexer.addRule(/package .+/, s => generateStat.bind(this)(s, "package"));

// // import with () rule 
// lexer.addRule(/import(\n|\s)*\((\".+\"|\s)+\)/, s => generateStat.bind(this)(s, "import"));

// // import without rule 
// lexer.addRule(/import(\n|\s)*\".+"/, s => generateStat.bind(this)(s, "import"));
