const Operator = require("./Operator")

class OperatorBinary extends Operator {
    execute(p, q) {
        throw new Error("Unimplemented execute method!")
    }
}

module.exports = OperatorBinary
