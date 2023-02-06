const GrammarUtil = require("../GrammarUtil")
const Token = require("../token/Token")
const TokenEnum = require("../token/TokenEnum")
const LexicalError = require("../../errors/LexicalError")

class LexicalTokenizer {

    static execute(input) {
        let left = 0, right = 0, substr = null
        const len = input.length
        const tokens = []
        
        while (right <= len && left <= right) {

            const isDelimiter = LexicalTokenizer.isDelimiter(input.charAt(right))
            const isEnd = LexicalTokenizer.isEOI(len, right)

            if (!isDelimiter && !isEnd) {
                right++
                continue
            }

            if (!isDelimiter && isEnd) substr = input.substring(left, right+1)
            else if (left == right) substr = input.charAt(left)
            else substr = input.substring(left, right)
            
            if (GrammarUtil.isID(substr)) {
                // console.log(`${substr} is ID!`)
                const token = new Token(TokenEnum.ID, substr) 
                tokens.push(token)
                right++
                left = right
            } else if (GrammarUtil.isParentheses(substr)) {
                // console.log(`${substr} is Parentheses!`)
                const token = new Token(TokenEnum.PARENTHESES, substr)
                tokens.push(token)
                right++
                left = right
            } else if (GrammarUtil.isNot(substr)) {
                // console.log(`${substr} is Not!`)
                const token = new Token(TokenEnum.OPERATOR, substr)
                tokens.push(token)
                right++
                left = right
            } else if (GrammarUtil.isSymbol(substr)) {
                // console.log(`${substr} is Symbol!`)
                const token = new Token(TokenEnum.OPERATOR, substr)
                tokens.push(token)
                left = right
            } else {
                throw new LexicalError(`${substr} is not a valid identifier!`)
            }

            if(!isDelimiter && isEnd) break
        }

        return tokens
    }

    static isEOI(length, right) {
        return right == length-1
    }

    static isDelimiter(char) {
        return GrammarUtil.isParentheses(char) || 
               GrammarUtil.isNot(char)  || 
               GrammarUtil.isID(char)
    }
}

module.exports = LexicalTokenizer
