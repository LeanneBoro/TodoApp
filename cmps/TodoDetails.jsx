const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { todoService } from "../services/todo-service.js"

export function TodoDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currTodo, setCurrTodo] = useState(null)

    useEffect(() => {
        const { id } = params
        todoService.getTodoById(id)
            .then(todo => {
                if (!todo) return navigate('/todo')
                setCurrTodo(todo)
            })
            .catch(() => {
                showErrorMsg('Had issues loading todo');
            })
    }, [])

    if (!currTodo) return <h4>loading</h4>
    const { _id, txt, isDone, createdAt } = currTodo
    const formattedDate = new Date(createdAt).toLocaleString('he')
    return (
        <div>
            <div>
                <h1>To Do: {txt}</h1>
                <h2>Created at: {formattedDate}</h2>
                <h2>is done? {isDone ? 'yes' : 'no'}</h2>
                <h2>Id: {_id}</h2>

                <button onClick={() => navigate('/todo')}>
                    Back to todos
                </button>
            </div>
        </div>
    )
}
