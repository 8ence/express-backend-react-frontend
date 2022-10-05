import './App.css'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Route, Link, Router } from 'react-router-dom'

function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingPost, setLoadingPost] = useState(false)

    const fetchTodos = () => {
        fetch('/todos')
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setTodos(data)
            })
    }

    const addTodo = (id) => {
        setLoadingPost(true)
        const bodyObject = {
            id: id,
            desc: input,
        }

        fetch(`/addTodo/${id}`, {
            method: 'POST',
            body: JSON.stringify(bodyObject),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setLoadingPost(false))
        fetchTodos()
    }

    useEffect(fetchTodos, [])

    return (
        <div className="App">
            {loading ? (
                <div className="loading">
                    <h1>loading...</h1>
                </div>
            ) : (
                <div>
                    {todos.map((todo, index) => (
                        <div key={index}>
                            <h2>
                                id:{todo.id}
                                <br />
                                {todo.desc}
                            </h2>
                            <button
                                onClick={() => {
                                    fetch(`/todos/${todo.id}`, { method: 'DELETE' })
                                        .then(() => fetchTodos())
                                        .catch((err) => console.log(err))
                                }}
                            >
                                delete
                            </button>
                        </div>
                    ))}

                    <input
                        type="text"
                        value={input}
                        placeholder="enter description"
                        onChange={(evt) => setInput(evt.target.value)}
                    />
                    <button
                        disabled={loadingPost}
                        onClick={() => addTodo(todos[todos.length - 1].id + 1)}
                    >
                        add Todo
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
