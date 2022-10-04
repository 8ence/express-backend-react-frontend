import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const fetchTodos = () => {
        fetch('/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data))
    }

    const addTodo = (id) => {
        const bodyObject = {
            id: id,
            desc: input,
        }

        console.log(bodyObject)

        fetch('/addTodo', {
            method: 'POST',
            body: JSON.stringify(bodyObject),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    useEffect(fetchTodos, [])

    return (
        <div className="App">
            {todos.map((todo, index) => (
                <h2 key={index}>
                    id:{todo.id}
                    <br />
                    {todo.desc}
                </h2>
            ))}

            <input
                type="text"
                value={input}
                placeholder="enter description"
                onChange={(evt) => setInput(evt.target.value)}
            />
            <button onClick={() => addTodo(todos[todos.length - 1].id + 1)}>add Todo</button>
        </div>
    )
}

export default App
