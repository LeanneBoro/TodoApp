const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return (
        <div>
            <h1>Home...let me go home!!!!!</h1>
            <NavLink to={'/todo'}>
             <button>Todos</button>   
            </NavLink>         
        </div>
    )
}