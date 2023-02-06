
class String {
    static removeWhiteSpaces(str) {
        return str.replace(/\s/g, '')
    }

    static upper(str) {
        return str.toUpperCase()
    }
}

module.exports = String
