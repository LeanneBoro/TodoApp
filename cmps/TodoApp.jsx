
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { todoService } from '../services/todo-service.js'

const { useEffect, useState } = React


export function TodoApp() {

    const [todos, setTodos] = useState(null)
    const [filterBy, setFilterBy] = useState(' ')

    useEffect(() => {
        loadTodos()
    }, [])

    function loadTodos() {
        todoService
            .query(filterBy)
            .then(setTodos())
            .catch(err => console.log('Had issues', err))
    }

    console.log(todos)
    return (
        <section>
            <h1>to do...to do...</h1>
            <TodoFilter />
            <div className='main-container'>
                <img src="./assets/img/panther.jpg"></img>
                <TodoList />
            </div>
        </section>
    )
}