import { NavLink } from 'react-router'

const Header = () => {
  return (
   <header className="bg-gray-800 text-white p-4">
    <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">TableStack</h1>
        <nav>
            <ul className="flex gap-4">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/trad">Traditional</NavLink></li>
                <li><NavLink to="/rq">React Query</NavLink></li>
            </ul>
        </nav>
    </div>
   </header>
  )
}

export default Header