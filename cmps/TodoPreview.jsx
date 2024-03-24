


export function TodoPreview({ todo, onRemove, onUpdateTodo }) {


    function onToggleDone() {
        console.log('yass')
        const newTodo = { ...todo, isDone: !todo.isDone }
        onUpdateTodo(newTodo)
    }

    return (

        <li className={`todo-preview ${todo.isDone ? 'done' : ''}`}>
            <h4 className="todo-text" onClick={onToggleDone} title="Done/Undone">
                {todo.txt}
            </h4>
            <button onClick={() => onRemove(todo._id)}>x</button>
        </li>
    )
}