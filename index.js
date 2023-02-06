const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const Register = require("./services/logic-interpreter/registers/Register")
const Interpreter = require('./services/logic-interpreter/interpreter/Interpreter')
const BadInputError = require('./services/logic-interpreter/errors/BadInputError')

app.use(cors())
app.use(express.json())

app.post('/interpreter', async (req, res, next) => {
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
})

app.listen(port, () => {
    console.log(`Listening port ${port}`)
    Register.registerAll()
})