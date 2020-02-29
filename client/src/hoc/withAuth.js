import React, { useState } from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'

const withAuth = Component => {
  return props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(undefined)
  
    const handleAuthentication = ({ username, password }) => {
      axios.get('/auth', { auth: { username, password }})
        .then(response => {
          setIsAuthenticated(response.data.authenticated)
          setUsername(username)
        })
        .catch(error => console.log(error.response))
    }
  
  
    if (isAuthenticated && username !== undefined) {
      return <Component {...props} username={username} />
    } else {
      return (
        <LoginForm onFinish={handleAuthentication} />
      )
    }
  }
}

export default withAuth