import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        const rows = response.data
        const rowsAsString = rows.map(row => JSON.stringify(row, null, '\t')).join('\n')
        setText(rowsAsString)
      })
      .catch(error => console.log(error.response))
  }, [])
  
  return (
    <div className='App'>
      <p>{text}</p>
    </div>
  );
}

export default App