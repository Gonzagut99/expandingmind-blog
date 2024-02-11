import React,{useState} from 'react'
import { useAuth } from './auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const auth = useAuth()
    let from = location.state?.from?.pathname || -1;
    const [userName, setUserName] = useState('')
    const login = (e) => {
        e.preventDefault()
        auth.login({userName, callback: ()=>{navigate(from, { replace: true })}})
    }
    if (auth.user.role) {
      return  <Navigate to="/profile"></Navigate>
    }
    return (
        //crea un formulario de login
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">Eescribe tu nombre de usuario:</label>
          <input type="text" id="username" name="username" value={userName} onChange={e=>setUserName(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage