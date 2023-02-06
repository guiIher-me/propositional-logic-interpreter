const BadInputError = require("./BadInputError")

class LexicalError extends BadInputError {
    constructor(message) {
        super(message)
        this.name = "LexicalError"
    }
}

module.exports = LexicalError
