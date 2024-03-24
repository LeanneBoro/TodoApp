

export function TodoList({todos}) {

    return (<ul>
        {todos.map((todo) =>
        <li key={todo._id}>{todo.txt}</li>
        )}
    </ul>
    )
}