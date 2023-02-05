const And = require("./And")
const OperatorBinary = require("./OperatorBinary")
const Implication = require("./Implication")

class Biimplication extends OperatorBinary {
    static execute(p, q) {
        return And.execute(Implication.execute(p, q), Implication.execute(q, p))
    }

    execute(p, q) {
        return Biimplication.execute(p, q)
    }
}

module.exports = Biimplication
