
class Symbol {
    symbol = null
    precedence = 0
    
    setSymbol(symbol) {
        this.symbol = symbol
        return this
    }

    getSymbol() {
        return this.symbol
    }

    setPrecedence(precedence) {
        this.precedence = precedence
        return this
    }

    getPrecedence() {
        return this.precedence
    }
}

module.exports = Symbol