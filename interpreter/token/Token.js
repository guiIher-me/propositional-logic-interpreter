
class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
    }

    getType() {
        return this.type
    }

    getValue() {
        return this.value
    }

    static getValues(tokens) {
        return tokens.map((token) => token.getValue())
    }
}

module.exports = Token