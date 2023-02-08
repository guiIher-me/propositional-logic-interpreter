const RegisterOperator = require("../../registers/RegisterOperator")
const OperatorUnary = require("../../symbols/operators/OperatorUnary")
const GrammarUtil = require("../GrammarUtil")
const TableIterator = require("./TableIterator")

class TruthTable {
    constructor(postfix_stack, input) {
        this.stack = postfix_stack
        this.input = input
    }

    static getUniqueIDs(symbols) {
        const checked = {}
        return symbols.filter((symbol) => {
            const isID = GrammarUtil.isID(symbol)
            const valid = isID && !checked[symbol]

            if(valid) checked[symbol] = true
            return valid
        })
    }

    generate() {
        const ids = TruthTable.getUniqueIDs(this.stack).sort()
        const iterator = new TableIterator(ids)

        const table = [['#', ...ids, this.input]]

        while(iterator.hasNext()) {
            const next = iterator.next()
            const result = this.evaluate(next)
     
            const line = Object.values(next)
            line.unshift(iterator.getIteration())
            line.push(result)
            table.push(line)
        }

        return table
    }

    evaluate(IDs) {
        const stack = [...this.stack]
        const eval_stack = []

        let item
        while(!!(item = stack.shift())) {

            if(GrammarUtil.isID(item)) {
                eval_stack.push(IDs[item])
            } else {
                const operator = RegisterOperator.getBySymbol(item)

                if(operator instanceof OperatorUnary) {
                    const operand = eval_stack.pop()
                    const result = operator.execute(operand)
                    eval_stack.push(result)
                } else {
                    const operand2 = eval_stack.pop()
                    const operand1 = eval_stack.pop()
                    const result = operator.execute(operand1, operand2)
                    eval_stack.push(result)
                }
            }
        }

        const final_result = eval_stack.pop()
        return final_result
    }
}

module.exports = TruthTable
