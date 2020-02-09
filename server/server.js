// % % %
// * ===== MODULES =====
// % % %
const express = require('express')

// % % %
// * ===== SET UP =====
// % % %
const app = express()

// % % % 
// * ===== ENDPOINTS ======
// % % %
app.get('/api', (req, res) => {
  res.send('API up!')
})

// % % %
// * ===== LISTENING =====
// % % %
app.listen(3001, () => {
  console.log('API up!')
})