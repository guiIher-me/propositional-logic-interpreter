
# Propositional Logic Interpreter

Um Interpretador de Lógica Proposicional escrito em Node.js
 
<video>
<source src="frontend/public/assets/demo.mp4" type="video/mp4"  alt="Vídeo de demonstração de uso do interpretador">
</video>
 

## 💻 Pré-requisitos

 - Node.js
 - NPM


## Como Executar

 1. Na raiz do projeto, acesse o diretório `backend` via linha de
    comando e em seguida inicie o servidor:

```
cd backend
node .
```
2. Abra o arquivo `frontend/public/index.html` usando um navegador web moderno.
3. Aproveite!


## Gramática

A gramática utilizada pelo interpretador pode ser expressada pelo seguinte Formalismo de Backus-Naur Estendido (EBNF):

```
<E> = <T>
<T> = <F> { ( '^' | 'v' | '->' | '<->' ) <F> }
<F> = {'~'} ( '(' <E> ')' | <ID> )
<ID> = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
```

Exemplos de linguagens aceitas:

```
1. A
2. AvB
3. A^~B
4. (AvB)^~(~C)
```    

Exemplos de linguagens **não** aceitas:
```
5. Av
6. A~B
7. ((A)
```

## Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.