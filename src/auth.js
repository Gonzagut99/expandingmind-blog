import React from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuthReducer } from './AuthReducer'

const AuthContext = React.createContext();
  const roles = {
      admin: 'admin',
      editor: 'editor',
      customer: 'customer',
      visitor: 'visitor',
    };
  
  export const users = [
    {
      id: 1,
      userName: "Andres",
      role: roles.admin,
    },
    {
      id: 2,
      userName: "Felipe",
      role: roles.editor,
    },
    {
      id: 3,
      userName: "Pedro",
      role: roles.customer,
    },
  ];

export function AuthProvider({children}) {
    //const [user, setUser] = useState(null)
    const [user, dispatchUser] = useAuthReducer();
    const navigate = useNavigate()

    const login = ({ userName, callback }) => {
      //revisar si el usuario existe o lo crea como visitante
      const userFound = users.find((usu) => usu.userName === userName);
      if (userFound !== undefined) {
        dispatchUser({ userName: userFound.userName, userRole: userFound.role })}else{
          dispatchUser(null);
        }
      if (callback){
        callback();
      } else{
        navigate("/profile");
      }
      
    }

    const logout = () => {
      dispatchUser(null);
      navigate('/')     
    }

    const auth = { user, login, logout}
  return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    const auth = React.useContext(AuthContext)
    return auth
}

export function RequireAuth(props) {
    const auth = useAuth();
    let location = useLocation();
  
    if (!auth.user.role) {
      return <Navigate to="/login" state={{ from: location }} replace/>
    }
  
    return props.children
  }

