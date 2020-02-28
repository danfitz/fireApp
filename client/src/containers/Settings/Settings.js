// Modules
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// Child Components
import SettingsForm from '../../components/SettingsForm'

const Settings = props => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    axios.get(`/api/users/${props.username}`)
      .then(response => {
        setUser(response.data.user)
      })
      .catch(error => console.log(error.response))
  }, [props.username])

  if (user) return <SettingsForm values={user} /> 
  else return <div>No user...</div>
}

export default Settings