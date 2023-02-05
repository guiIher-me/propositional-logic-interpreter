
class BadInputError extends Error {
    constructor(message) {
		super(message)
		this.name = "BadInputError"
	}
}

module.exports = BadInputError
