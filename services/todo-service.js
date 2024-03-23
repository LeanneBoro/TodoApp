import { storageService } from "./async-storage.service.js"


export const todoService = {
    query,
    remove,
    save
}

const TODO_KEY = 'todoDB'

function query(filterBy) {

    return storageService.query(TODO_KEY)
        .then(todos => {
            return todos
        })

}


function remove(todoId) {
    return storageService.remove(TODO_KEY,todoId)
}


function save(todo) {
    if (todo.id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        return storageService.post(TODO_KEY, todo)
    }
}
