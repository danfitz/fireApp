import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        setText(response.data)
      })
  })
  
  return (
    <div className='App'>
      <p>{text}</p>
    </div>
  );
}

export default App