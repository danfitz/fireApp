// Modules
import React from 'react'
// Container Components
import Settings from './containers/Settings/Settings'
// HOC
import withAuth from './hoc/withAuth'

const App = ({ username }) => {
  return (
    <Settings username={username} />
  )
}

export default withAuth(App)
// export default App