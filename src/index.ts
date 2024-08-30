import express from 'express'

import cors from 'cors'

import dotenv from 'dotenv'

import MainRouter from './routes/index'

import authRoutes from '@Middlewares/auth/authMiddleware'

import AuthRoutes from '@Routes/auth'

dotenv.config()

const port = process.env.PORT ?? '3000'

const app = express()

app.use(express.json())

app.use('/api/v1', cors(), AuthRoutes)

app.use(authRoutes)

app.use('/api/v1', cors(), MainRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`) // eslint-disable-line no-console
})
