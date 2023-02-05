const RegisterOperator = require("./RegisterOperator")

class Register {
    static async registerAll() {
        await RegisterOperator.registerAll()
    }
}

module.exports = Register
