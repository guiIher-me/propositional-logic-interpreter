
class SymbolUtil {
    static GREATER = '>'
    static LESS = '<'
    static EQUAL = '='

    static isGreater(symbol1, symbol2) {
        return symbol1.getPrecedence() > symbol2.getPrecedence()
    }

    static isLess(symbol1, symbol2) {
        return symbol1.getPrecedence() < symbol2.getPrecedence()
    }

    static compare(symbol1, symbol2) {
        if (SymbolUtil.isGreater(symbol1, symbol2)) return SymbolUtil.GREATER
        if (SymbolUtil.isLess(symbol1, symbol2)) return SymbolUtil.LESS
        return SymbolUtil.EQUAL
    }
}

module.exports = SymbolUtil
