const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.json())

app.get('/todos', (req, res) => res.sendFile(path.join(`${__dirname}/todo.json`)))

app.post('/addTodo/:id', (req, res) => {
    const todos = fs.readFileSync(`${__dirname}/todo.json`, (err) =>
        err ? console.log(err) : null
    )

    const todosJson = JSON.parse(todos)

    todosJson.push(req.body)

    fs.writeFileSync(`${__dirname}/todo.json`, JSON.stringify(todosJson, null, 2), (err) =>
        err ? console.log(err) : null
    )

    res.send({ response: `todo id:${req.params.id} has been added. :)` })
})

app.listen(9000, () => console.log('server is running at http://127.0.0.1:9000'))
