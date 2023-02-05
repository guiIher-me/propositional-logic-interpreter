const OperatorBinary = require("./OperatorBinary")

class Or extends OperatorBinary {
    static execute(p, q) {
        return p | q
    }

    execute(p, q) {
        return Or.execute(p, q)
    }
}

module.exports = Or
