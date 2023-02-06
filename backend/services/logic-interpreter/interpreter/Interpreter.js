const LexicalAnalyzer = require("./lexical/LexicalAnalyzer")
const PostfixConverter = require("./notation/PostfixConverter")
const SintaxAnalyzer = require("./sintax/SintaxAnalyzer")
const TruthTable = require("./table/TruthTable")

class Interpreter {
    static async interprete(input) {
        const tokenizer = new LexicalAnalyzer(input)
        const tokens = await tokenizer.getTokens()

        const sintax = new SintaxAnalyzer(tokens)
        await sintax.analyze()

        const converter = new PostfixConverter(tokens)
        const postfix_stack = await converter.converte()

        const generator = new TruthTable(postfix_stack, input)
        const table = generator.generate()
        
        console.table(table)
        return table
    }
}

module.exports = Interpreter
