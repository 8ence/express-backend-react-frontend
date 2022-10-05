import React from 'react'
import { Link } from 'react-router-dom'

export const MenuComponents = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={`/contacts`}>contacts</Link>
                </li>
                <li>
                    <Link to={`/todo`}>Todos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default MenuComponents
