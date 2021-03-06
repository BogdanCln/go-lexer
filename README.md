# Golang lexer
#### Compilation Techniques - Project #1 - Faculty of Mathematics and Computer Science, University of Bucharest

## Requirements (RO):

Analizator lexical (~~manual sau~~ automat)

Pentru prima tema trebuie sa scrieti un analizor lexical pentru un limbaj de programare la alegere (aleg go). 

Scrieti analizorul sub forma unei functii care returneaza:

```
- tipul token-ului curent
- lungimea sirului corespunzator din fisierul de intrare
- linia din fisierul de intrare pe care se afla token-ul curent
- pointer catre primul caracter al token-ulului curent
- un mesaj de eroare atunci cand este intalnita o eroare lexicala.
```

Functia este apelata din programul principal, in care este citit un fisier de intrare care va fi scanat cu ajutorul acestei functii, astfel incat sa se afiseze toti token-ii care apar in fisierul de intrare. 

Atunci cand este apelata, functia de scanare:

- incepand de la pointerul curent (care initial indica catre primul caracter al fisierului de intrare) sare peste un nr de caractere egal cu lungimea token-ului anterior (initial aceasta lungime este 0);
- sare peste spatii, tab-uri, linii noi, pana intalneste primul caracter diferit de acestea; 
- seteaza pointerul curent astfel ca sa indice catre acest caracter;
- identifica token-ul curent, ce corespunde sirului ce incepe cu caracterul depistat la pasul anterior; 
- determina tipul acestuia si lungimea sirului corespunzator;
- in cazul in care este intalnita o eroare lexicala, semneleaza aceasta printr-un mesaj, scaneaza fisierul de intrare in continuare, pana gaseste primul caracter de tip spatiu, linie noua, tab, seteaza pointerul curent catre acest caracter, seteza lungimea token-ului curent cu 0 (in felul acesta programul va afisa in continuare token-ii urmatori, fara sa se opreasca la prima eroare intalnita).
- se opreste cu scanarea cand a intalnit sfarsitul fisierului de intrare.

Pentru cazul automat trebuie doar sa returnati pentru fiecare token structura de mai sus.

EN: TODO

## Implementation: 
Node.js with lex node module.

- [x] Comments
- [x] Tokens
- [x] Semicolons
- [x] Identifiers
- [x] Keywords
- [x] Operators and punctuation
- [x] Integer literals
- [x] Floating-point literals
- [ ] Imaginary literals
- [ ] Rune literals
- [ ] String literals
