import React from 'react'
import { useAuth } from './auth'

function HomePage() {
  const auth = useAuth()
  React.useEffect(() => {
    console.log(auth.user)
  }, [])
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage