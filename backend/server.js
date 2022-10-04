const express = require('express')
const path = require('path')

const app = express()

app.get('/todos', (req, res) => res.sendFile(path.join(`${__dirname}/todo.json`)))

app.listen(9000, () => console.log('server is running at http://127.0.0.1:9000'))
