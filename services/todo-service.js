import { storageService } from "./async-storage.service.js"
import { utilService } from "./util-service.js"

export const todoService = {
    query,
    remove,
    save
}

_createTodos()
const TODO_KEY = 'todoDB'

function query(filterBy) {

    return storageService.query(TODO_KEY)
        .then(todos => {
            return todos
        })

}


function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
}


function save(todo) {
    if (todo.id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}


function _createTodos() {
    let todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo('Go Shopping', false))
        todos.push(_createTodo('Make Dinner', false))
        todos.push(_createTodo('Understand node', false))
        todos.push(_createTodo('Live laugh love', true))
        utilService.saveToStorage(TODO_KEY, todos)
    }
}

function _createTodo(txt, isDone = false) {
    return {
        txt: txt,
        isDone: isDone
    }
}