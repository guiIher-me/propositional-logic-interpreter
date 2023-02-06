const String = require("../../utils/String")

class LexicalPreprocess {
    static execute(input) {
        const process1 = String.removeWhiteSpaces(input)
        return process1
    }
}

module.exports = LexicalPreprocess
