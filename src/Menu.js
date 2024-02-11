import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from './auth'

function Menu() {
  const auth = useAuth()
  // React.useEffect(() => {
  //   console.log(auth.user)
  // }, [])
  return (
    <nav>
        {routes.map((route, index) => {
          if (route.publicOnly && auth.user.role) return null
          //if(auth.user && (route.path === '/login')) return null
          if (route.private && !auth.user.role) return null
          return (
              <li key={index}>
                <NavLink
                  to={route.path}
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "blue",
                  })}
                >
                  {route.name}
                </NavLink>
              </li>
            );
        })}
        {/* <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#/blog">Blog</a></li>
            <li><a href="/profile">Profile</a></li>
        </ul> */}
        {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul> */}
        {/* <ul>
            <li><NavLink to="/" style={({isActive})=>({color:isActive?'red':'blue'})}>Home</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
        </ul> */}

    </nav>
  )
}

const routes = [
    { path: '/', name: 'Home', private:false },
    { path: '/blog', name: 'Blog', private:false },
    { path: '/profile', name: 'Profile', private:true },
    { path: '/login', name: 'Login', private:false, publicOnly:true },
    { path: '/logout', name: 'Logout', private:true },
  ]

export default Menu