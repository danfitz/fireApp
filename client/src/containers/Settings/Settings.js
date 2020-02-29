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

  const updateUser = updatedUser => {
    axios.post(`/api/users/${props.username}`, { data: updatedUser })
      .then(response => {
        setUser(response.data.user)
      })
      .catch(error => console.log(error.response))
  }

  if (user) {
    return (
      <React.Fragment>
        <div>{JSON.stringify(user, null, 2)}</div>
        <SettingsForm values={user} onFinish={updateUser} />
      </React.Fragment>
    )  
  }
  else return null
}

export default Settings