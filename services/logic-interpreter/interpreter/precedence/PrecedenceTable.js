const RegisterOperator = require("../../services/logic-interpreter/registers/RegisterOperator")
const SymbolUtil = require("../../symbols/SymbolUtil")

class PrecedenceTable {

    static isGreater(token1, token2) {
        const symbol1 = PrecedenceTable.getSymbol(token1)
        const symbol2 = PrecedenceTable.getSymbol(token2)
        return SymbolUtil.isGreater(symbol1, symbol2)
    }

    static isLess(token1, token2) {
        const symbol1 = PrecedenceTable.getSymbol(token1)
        const symbol2 = PrecedenceTable.getSymbol(token2)
        return SymbolUtil.isLess(symbol1, symbol2)
    }

    static compare(token1, token2) {
        const symbol1 = PrecedenceTable.getSymbol(token1)
        const symbol2 = PrecedenceTable.getSymbol(token2)
        return SymbolUtil.compare(symbol1, symbol2)
    }

    static getSymbol(token) {
        const symbol = RegisterOperator.getBySymbol(token)
        if (!symbol) throw new Error(`Token '${token}' not found!`)
        return symbol
    }
}

module.exports = PrecedenceTable

