import React, { useState } from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'

const withAuth = Component => {
  return props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  
    const handleUsername = event => setUsername(event.target.value)
    const handlePassword = event => setPassword(event.target.value)
  
    const handleAuthentication = event => {
      event.preventDefault()
  
      axios.get('/auth', { auth: { username, password }})
        .then(response => {
          setIsAuthenticated(response.data.authenticated)
        })
        .catch(error => console.log(error.response))
    }
  
  
    if (isAuthenticated) {
      return <Component {...props} username={username} />
    } else {
      return (
        <LoginForm
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleSubmit={handleAuthentication}
        />
      )
    }
  }
}

export default withAuth