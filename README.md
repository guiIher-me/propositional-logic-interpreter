
# Propositional Logic Interpreter

Um Interpretador de Lógica Proposicional escrito em Node.js
 
https://user-images.githubusercontent.com/20153932/218207611-36c58331-056b-488c-a132-03118ff1ee8a.mp4


## 💻 Pré-requisitos

 - Node.js
 - NPM


## 🚀 Como Executar

1. Faça o download do repositório;
2. No terminal, acesse o diretório `backend`, instale as dependências necessárias e em seguida inicie o servidor:
```
cd backend
npm install
node .
```
3. Abra o arquivo `frontend/public/index.html` usando um navegador web moderno.
4. Divirta-se!


## 📖 Gramática

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

## 📜 Licença

Esse projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
