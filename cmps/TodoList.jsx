import { TodoPreview } from "./TodoPreview.jsx"

export function TodoList({ todos, onRemove, onUpdateTodo }) {

    return (<ul>
        {todos.map((todo) =>
            <TodoPreview key={todo._id} todo={todo} onRemove={onRemove} onUpdateTodo={onUpdateTodo}/>
        )}
    </ul>
    )
}