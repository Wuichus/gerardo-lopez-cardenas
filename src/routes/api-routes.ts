import express from 'express'

const router = express.Router()

// Test route api/v1
router.get('/working', (_, res) => {
  res.send('Consulta correcta v1')
})

export default router
