import jwt from 'jsonwebtoken'

import { type NextFunction, type Response } from 'express'

import db from '@Providers/db'

import { compareSync as bcryptCompare, hashSync as bcryptHash } from 'bcryptjs'

// Función para extraer el token del header de autorización
const getTokenFromHeader = (header?: string): string => {
  if (header === undefined || !header.startsWith('Bearer ')) {
    throw new Error('No token provided or token is malformed')
  }
  return header.split(' ')[1]
}

// Middleware para autenticar rutas usando JWT
const authenticate = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const { JWT_SECRET = '' } = process.env

  try {
    const token = getTokenFromHeader(req.headers.authorization)

    const { token: tokenDb } = await db.tokens.get()

    const hash = bcryptHash(token, 10)

    // Verifica la token en header contra token en db
    const comparePass = bcryptCompare(tokenDb, hash)

    if (!comparePass) throw new Error('invalid token')

    const decoded = jwt.verify(tokenDb, JWT_SECRET)

    req.user = decoded
    next()
  } catch (error: any) {
    let status = 401
    let message = 'Authentication failed'
    switch (error.message) {
      case 'No token provided or token is malformed':
        message = 'The authorization token is missing or is malformed.'
        break
      case 'jwt expired':
        message = 'Token expired.'
        break
      case 'invalid token':
        message = 'Invalid Token'
        break
      default:
        status = 500
        message = 'Error processing authentication.'
    }
    res.status(status).json({ error: message })
  }
}

export default authenticate
