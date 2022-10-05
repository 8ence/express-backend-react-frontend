const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.json())

function readJson() {
    const todos = fs.readFileSync(`${__dirname}/todo.json`, (err) =>
        err ? console.log(err) : null
    )

    return JSON.parse(todos)
}

function writeJson(todosJson) {
    fs.writeFileSync(`${__dirname}/todo.json`, JSON.stringify(todosJson, null, 2), (err) =>
        err ? console.log(err) : null
    )
}

app.get('/todos', (req, res) => res.sendFile(path.join(`${__dirname}/todo.json`)))

app.post('/addTodo/:id', (req, res) => {
    const todosJson = readJson()
    todosJson.push(req.body)
    writeJson(todosJson)
    res.send({ response: `todo id:${req.params.id} has been added. :)` })
})

app.delete('/todos/:id', (req, res) => {
    const todosJson = readJson()
    const filteredList = todosJson.filter((todoElem) => todoElem.id !== +req.params.id)
    writeJson(filteredList)
    res.status(204).end()
})

app.listen(9000, () => console.log('server is running at http://127.0.0.1:9000'))
