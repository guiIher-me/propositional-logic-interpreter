const Operator = require("./Operator")

class OperatorUnary extends Operator {
    execute(p) {
        throw new Error("Unimplemented execute method!")
    }
}

module.exports = OperatorUnary
