const And = require("../symbols/operators/AND")
const Biimplication = require("../symbols/operators/Biimplication")
const Implication = require("../symbols/operators/Implication")
const Not = require("../symbols/operators/Not")
const Or = require("../symbols/operators/Or")

class RegisterOperator {
    static registers = { }
    static cache_symbols_array = null

    static registerAll() {
        RegisterOperator.register(new Not().setSymbol('~').setPrecedence(6))
        RegisterOperator.register(new And().setSymbol('^').setPrecedence(5))
        RegisterOperator.register(new Or().setSymbol('v').setPrecedence(4))
        RegisterOperator.register(new Implication().setSymbol('->').setPrecedence(3))
        RegisterOperator.register(new Biimplication().setSymbol('<->').setPrecedence(2))
    }

    static register(operator) {
        RegisterOperator.registers[operator.getSymbol()] = operator
    }

    static getSymbolsByFilter(filter) {
        const registers = Object.values(this.registers)
        const filtered_registers = registers.filter(register => filter(register))
        return filtered_registers.map(register => register.getSymbol())
    }

    static getBySymbol(symbol) {
        return RegisterOperator.registers[symbol]
    }
}

module.exports = RegisterOperator