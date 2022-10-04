import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        fetch('/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data))
    }

    useEffect(fetchTodos, [])

    return (
        <div className="App">
            {todos.map((todo) => (
                <h2>{todo.desc}</h2>
            ))}
        </div>
    )
}

export default App
