const OperatorBinary = require("./OperatorBinary")

class And extends OperatorBinary {   
    static execute(p, q) {
        return p & q
    }

    execute(p, q) {
        return And.execute(p, q)
    }
}

module.exports = And
