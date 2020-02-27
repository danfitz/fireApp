// Modules
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// HOC
import withAuth from './hoc/withAuth'

const App = props => {
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get(`/api/investments/${props.username}`)
      .then(response => {
        const rows = response.data.investments
        const rowsAsString = rows.map(row => JSON.stringify(row, null, '\t')).join('\n')
        setText(rowsAsString)
      })
      .catch(error => console.log(error.response))
  })
  
  return (
    <div className='App'>
      <p>{text}</p>
    </div>
  );
}

export default withAuth(App)