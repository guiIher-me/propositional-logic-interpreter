const GrammarUtil = require("../GrammarUtil")
const PrecedenceTable = require("../precedence/PrecedenceTable")
const Token = require("../token/Token")

class PostfixConverter {

    constructor(tokens) {
        this.tokens = Token.getValues(tokens)
        this.expression = []
        this.stack = []
    }

    converte() {
        let item
        while(item = this.tokens.shift()) {
            if(GrammarUtil.isID(item))
                this.expression.push(item)
            else if(GrammarUtil.isLeftParentheses(item))
                this.stack.push(item)
            else if(GrammarUtil.isRightParentheses(item)) {
                let popped
                while(!!(popped = this.stack.pop()) && 
                      !GrammarUtil.isLeftParentheses(popped)) {
                    this.expression.push(popped)
                }
            } else {
                let peek
                while(!!(peek = this.stack[this.stack.length-1]) && 
                      !GrammarUtil.isLeftParentheses(peek) && 
                      !PrecedenceTable.isGreater(item, peek)) {
                    
                    const popped = this.stack.pop()
                    this.expression.push(popped)
                }
                this.stack.push(item)
            }
        }

        let popped
        while(popped = this.stack.pop())
            this.expression.push(popped)

        return this.expression
    }
}

module.exports = PostfixConverter
