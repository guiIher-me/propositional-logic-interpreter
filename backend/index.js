const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const Register = require("./services/logic-interpreter/registers/Register")
const handle = require('./services/logic-interpreter')

app.use(cors())
app.use(express.json())

app.post('/interpreter', async (req, res) => {
    return await handle(req, res)
})

app.listen(port, () => {
    console.log(`Listening port ${port}`)
    Register.registerAll()
})