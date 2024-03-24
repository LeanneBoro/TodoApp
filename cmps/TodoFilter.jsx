const { useState } = React


export function TodoFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState({ txt: '', isDone: 'all', pageIdx: 0 })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }


    return (
        <section className="todo-filter">
            <form onSubmit={onSubmit}>
                <div className="radio-sort flex justify-center align-center">
                    <label htmlFor="all">

                        <input defaultChecked type="radio" name="isDone" value="all" id="all" onChange={handleChange} />
                        All
                    </label>
                    <label htmlFor="done">
                        <input type="radio" name="isDone" value="done" id="done" onChange={handleChange} />
                        Done
                    </label>
                    <label htmlFor="undone">
                        <input type="radio" name="isDone" value="undone" id="undone" onChange={handleChange} />
                        Active
                    </label>
                </div>
                <div className="search-inputs">
                    <input
                        className="filter-input"
                        placeholder="Search todo..."
                        name="txt"
                        value={filterBy.txt}
                        onChange={handleChange}
                    />
                    <label htmlFor="pageIdx">Page:</label>
                    <input type="number"
                        id="pageIdx"
                        name="pageIdx"
                        placeholder="0"
                        value={filterBy.pageIdx}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}