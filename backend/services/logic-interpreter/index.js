const Interpreter = require('./interpreter/Interpreter')
const BadInputError = require('./errors/BadInputError')

const handle = async (req, res) => {
    const {input} = req.body || null
    if(!input) req.status(400).send({error: "Field 'input' is missing!"})

    try {
        const table = await Interpreter.interprete(input)
        res.status(200).send({table})
    } catch(error) {
        if(error instanceof BadInputError) {
            res.status(422).send({error: error.message})
        } else {
            console.log(error)
            res.status(500).send({error: 'Internal Server Error'})
        }
    }
}

module.exports = handle
