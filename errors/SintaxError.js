const BadInputError = require("./BadInputError")

class SintaxError extends BadInputError {
	constructor(message) {
		super(message)
		this.name = "SintaxError"
	}
}

module.exports = SintaxError
