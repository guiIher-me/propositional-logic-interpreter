const Not = require("./Not")
const Or = require("./Or")
const OperatorBinary = require("./OperatorBinary")

class Implication extends OperatorBinary {
    static execute(p, q) {
        return Or.execute(Not.execute(p), q)
    }

    execute(p, q) {
        return Implication.execute(p, q)
    }
}

module.exports = Implication
