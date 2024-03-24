const TODOS_KEY = 'myTodos'
const PAGE_SIZE = 8
import { storageService } from '../services/async-storage.service.js'
// import { userService } from './user.service.js'

export const todoService = {
    query,
    save,
    removeTodo,
    getTodoById,
    debounce
}


function query(filterBy = { txt: '', isDone: 'all', pageIdx: 0 }) {
    return storageService.query(TODOS_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.txt))
            }
            if (filterBy.isDone !== 'all') {
                todos = todos.filter((todo) => (filterBy.isDone === 'done' ? todo.isDone : !todo.isDone))
            }
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }
            return todos
        })
}

function getTodoById(id) {
    return storageService.get(TODOS_KEY, id)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODOS_KEY, todo).then((savedTodo) => {
            userService.addActivity('Updated', savedTodo._id)
            return savedTodo
        })
    } else {
        todo.isDone = false
        todo.createdAt = Date.now()
        return storageService.post(TODOS_KEY, todo).then((savedTodo) => {
            userService.addActivity('Added', savedTodo._id)
            return savedTodo
        })
    }
}

function removeTodo(todoId) {
    return storageService.remove(TODOS_KEY, todoId).then(() => {
        userService.addActivity('Removed', todoId)
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


// DEMO TODOS
// storageService.post(TODOS_KEY, { txt: "Something Important", isDone: false, createdAt: new Date(2023, 8, 12).getTime(), _id: "4x9VI" })
//     .then(() => {
//         storageService.post(TODOS_KEY, { txt: "Become a developer", isDone: false, createdAt: new Date(2024, 2, 20).getTime(), _id: "hB9u1" })
//             .then(() => {
//                 storageService.post(TODOS_KEY, { txt: "Make a sandwich", isDone: true, createdAt: new Date(2024, 0, 5).getTime(), _id: "1ks8B" })
//             })
//     })