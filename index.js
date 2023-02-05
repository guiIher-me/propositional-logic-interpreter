const LexicalAnalyzer = require("./interpreter/lexical/LexicalAnalyzer")
const PostfixConverter = require("./interpreter/notation/PostfixConverter")
const SintaxAnalyzer = require("./interpreter/sintax/SintaxAnalyzer")
const Register = require("./registers/Register")
const TruthTable = require("./interpreter/table/TruthTable")
const BadInputError = require("./errors/BadInputError")

;(async () => {
    try {
        await Register.registerAll()
        const input = "(~A v B) ^ C"

        const tokenizer = new LexicalAnalyzer(input)
        const tokens = await tokenizer.getTokens()

        const sintax = new SintaxAnalyzer(tokens)
        await sintax.analyze()

        const converter = new PostfixConverter(tokens)
        const postfix_stack = await converter.converte()

        const generator = new TruthTable(postfix_stack, input)
        const table = generator.generate()
        
        console.table(table)
        
    } catch (error) {
        if(error instanceof BadInputError) {
            console.log(error.message)
        } else {
            console.log(error)
            console.log("Internal Server Error!")
        }
    }
})()