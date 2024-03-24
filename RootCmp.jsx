const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { TodoDetails } from './cmps/TodoDetails.jsx'
import { TodoApp } from './cmps/TodoApp.jsx'
import { Home } from './cmps/homePage.jsx'

export function App() {
    return ( <Router>
        <main>
            <Routes>
                <Route element={<Home/>} path={'/'} />
                <Route element={<TodoApp />} path={'/todo'} />
                <Route element={<TodoDetails />} path={'/todo/:id'} />
            </Routes>
        </main>
        </Router>
    )
}
