const LogicEnum = require("../../utils/LogicEnum")
const OperatorUnary = require("./OperatorUnary")

class Not extends OperatorUnary {
    static execute(p) {
        return p ? LogicEnum.FALSY : LogicEnum.TRUTHY
    }

    execute(p) {
        return Not.execute(p)
    }
}

module.exports = Not
