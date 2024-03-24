const { Link, NavLink } = ReactRouterDOM
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { todoService } from '../services/todo-service.js'

const { useEffect, useState } = React


export function TodoApp() {



    const [todos, setTodos] = useState(null)
    // const [filterBy, setFilterBy] = useState(' ')

    useEffect(() => {
        loadTodos()
    }, [])

    function loadTodos() {
        todoService
            .query()
            .then(todos => setTodos(todos))
    }

    function onUpdateTodo() {
        console.log('app')
    }

    function onRemove(todoId) {
        removeTodo(todoId)
            .then(() => {
                console.log('removed todo ' + todoId);
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the todo'))
    }

    function onSetFilter() {
        console.log('got filter!')
    }

    if (!todos) return <div>Loading..</div>
    return (
        <section>
            <h1>to do...to do...</h1>
            <NavLink to={'/'}>
             <button>Go home!!</button>   
            </NavLink>  
            <TodoFilter onSetFilter={onSetFilter}/>
            <div className='main-container'>
                <img src="./assets/img/panther.jpg"></img>
                <TodoList todos={todos} onRemove={onRemove} onUpdateTodo={onUpdateTodo}/>
            </div>
        </section>
    )
}