const LexicalPreprocess = require("./LexicalPreprocess")
const LexicalTokenizer = require("./LexicalTokenizer")

class LexicalAnalyzer {
    constructor(input) {
        this.input = input
    }

    async getTokens() {
        const input_preprocessed = await LexicalPreprocess.execute(this.input)
        const tokens = await LexicalTokenizer.execute(input_preprocessed)
        return tokens
    }
}

module.exports = LexicalAnalyzer
