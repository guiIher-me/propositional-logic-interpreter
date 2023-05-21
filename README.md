
# Propositional Logic Interpreter

A Propositional Logic Interpreter written in Node.js
 
https://user-images.githubusercontent.com/20153932/218207611-36c58331-056b-488c-a132-03118ff1ee8a.mp4


## 💻 Prerequisites

 - Node.js
 - NPM


## 🚀 How to Execute

1. Download the repository;
2. In the terminal, access the `backend` directory, install the necessary dependencies and then start the server:
```
cd backend
npm install
node .
```
3. Open the `frontend/public/index.html` file using a modern web browser
4. Enjoy!


## 📖 Grammar

The grammar used by the interpreter can be expressed by the following Extended Backus-Naur Form (EBNF):
```
<E> = <T>
<T> = <F> { ( '^' | 'v' | '->' | '<->' ) <F> }
<F> = {'~'} ( '(' <E> ')' | <ID> )
<ID> = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
```

Examples of accepted languages:
```
1. A
2. AvB
3. A^~B
4. (AvB)^~(~C)
```    

Examples of **not** accepted languages:
```
5. Av
6. A~B
7. ((A)
```

## 📜 License

This project is licensed under MIT. See the [LICENSE](LICENSE) file for more details.
