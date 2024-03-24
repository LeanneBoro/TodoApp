import { todoService } from '../../services/todo.service.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../reducers/todo.reducer.js'
import { store } from '../store.js'


export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({
                type: SET_TODOS,
                todos
            })
            return todos
        })
        .catch(err => {
            console.error('Cannot load todos:', err)
            throw err
        })
}


export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({
                type,
                todo: savedTodo
            })
            return savedTodo
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.removeTodo(todoId)
        .then(() => {
            store.dispatch({
                type: REMOVE_TODO,
                todoId
            })
        })
        .catch(err => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}


export function updateTodo(todo) {
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({
                type: UPDATE_TODO,
                todo: savedTodo
            })
        })
}

