import React from 'react'
import { useAuth } from './auth'

function LogoutPage() {
    const auth = useAuth()
    const logout = (e) => {
        e.preventDefault()
        auth.logout()
    }
  return (
    //crea un formulario de login
    <>
      <h1>Logout</h1>
      <form onSubmit={logout}>
        <label htmlFor="username">¿Seguro que quieres salir?</label>
        <button type="submit">Salir</button>
      </form>
    </>
  )
}

export default LogoutPage