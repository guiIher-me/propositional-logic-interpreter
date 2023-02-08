const RegisterOperator = require("../registers/RegisterOperator")
const OperatorBinary = require("../symbols/operators/OperatorBinary")
const OperatorUnary = require("../symbols/operators/OperatorUnary")

class GrammarUtil {
    static EOI = 'END_OF_INPUT'

    static isEOI(item) {
        return item == GrammarUtil.EOI
    }

    static isID(item) {
        return item.match(/^[A-F]$/i)
    }

    static isLeftParentheses(item) {
        return item == '('
    }

    static isRightParentheses(item) {
        return item == ')'
    }

    static isParentheses(item) {
        return GrammarUtil.isLeftParentheses(item) ||
               GrammarUtil.isRightParentheses(item)
    }

    static isSymbol(item) {
        const symbol = RegisterOperator.getBySymbol(item)
        return !!symbol
    }

    static isBinaryOperator(item) {
        const filter = (register => register instanceof OperatorBinary)
        const symbols = RegisterOperator.getSymbolsByFilter(filter)
        return symbols.includes(item)
    }

    static isUnaryOperator(item) {
        const filter = (register => register instanceof OperatorUnary)
        const symbols = RegisterOperator.getSymbolsByFilter(filter)
        return symbols.includes(item)
    }

    static isNot(item) {
        return item == '~'
    }
}

module.exports = GrammarUtil
