/**
 * Linguagem livre de contexto
 * 
 * E ::= T
 * T ::= F { ( '^' | 'v' | '->' | '<->' ) F }
 * F ::= {'~'} ( '(' E ')' | ID )
 * ID ::= 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
 */

const SintaxError = require("../../errors/SintaxError")
const GrammarUtil = require("../GrammarUtil")

class SintaxAnalyzer {
    
    constructor(tokens) {
        this.tokens = tokens
        this.lookposition = 0
        this.lookahead = null
    }

    async analyze() {
        this.next()
        this.E()
        this.match(GrammarUtil.EOI)
        return true
    }

    next() {
        if (this.lookposition >= this.tokens.length) {
            this.lookahead = GrammarUtil.EOI
            return
        }

        const token = this.tokens[this.lookposition]
        this.lookposition++
        this.lookahead = token.getValue()
    }

    match(expected) {
        if(this.lookahead != expected)
            throw new SintaxError(`Expected '${expected}', received '${this.lookahead}' at position ${this.lookposition}`)
        this.next()
    }

    E() {
        this.T()
    }

    // T ::= F { ( '^' | 'v' | '->' | '<->' ) F }
    T() {
        this.F()
        while(GrammarUtil.isBinaryOperator(this.lookahead)) {
            this.match(this.lookahead)
            this.F()
        }
    }

    // F ::= {'~'} ( '(' E ')' | ID )
    F() {
        while(GrammarUtil.isNot(this.lookahead))
            this.match(this.lookahead)
        
        if(GrammarUtil.isLeftParentheses(this.lookahead)) {
            this.match('(')
            this.E()
            this.match(')')
        } else {
            this.ID()
        }
    }

    // ID ::= 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
    ID() {
        if(GrammarUtil.isID(this.lookahead))
            this.match(this.lookahead)
        else
            throw new SintaxError(`Expected ID received '${this.lookahead}' at position ${this.lookposition}`)
    }
}

module.exports = SintaxAnalyzer
