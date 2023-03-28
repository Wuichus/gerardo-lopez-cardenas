import express, { type Express, type Request, type Response } from 'express'

import cors from 'cors'

import dotenv from 'dotenv'

import router from './routes/api-routes'

dotenv.config()

const app: Express = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', cors(), router)

const port = process.env.PORT ?? '3000'

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`) // eslint-disable-line no-console
})
