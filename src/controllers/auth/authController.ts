import jwt from 'jsonwebtoken'
import { compareSync as bcryptCompare, hashSync as bcryptHash } from 'bcryptjs'
import { type Request, type Response } from 'express'
import db from '@Providers/db'

const login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const {
    password = ''
  }: {
    password?: string
  } = req.body

  const { ADMIN_PASSWORD = '', JWT_SECRET = '' } = process.env

  if (JWT_SECRET === undefined) return res.status(400).json({ error: 'There is no JWT_SECRET in env' })

  // Comprueba que las credenciales sean enviadas en la solicitud
  if (password === '') {
    return res.status(400).json({ error: 'User name and password required' })
  }

  if (ADMIN_PASSWORD === '') {
    return res.status(400).json({ error: 'There is no ADMIN_PASSWORD in env' })
  }

  const hash = bcryptHash(password, 10)

  // Verifica el nombre de usuario y la contraseña contra las variables de entorno
  const comparePass = bcryptCompare(ADMIN_PASSWORD, hash)

  // Si las credenciales son incorrectas, envía un error
  if (!comparePass) return res.status(401).json({ error: 'Wrong credentials' })

  // Si las credenciales son correctas, genera un token JWT
  try {
    const { token: tokenInDb } = await db.tokens.get()

    const decoded: {
      username: string
      iat: number
      exp: number
    } = jwt.verify(tokenInDb, JWT_SECRET) as any

    if (decoded.exp * 1000 > new Date().getDate()) return res.json({ message: 'Login successful', tokenInDb })

    await db.tokens.remove(tokenInDb)

    const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '1h' })

    await db.tokens.create(token)

    return res.json({ message: 'Login successful', token })
  } catch (e) {
    return res.status(401).json({ error: 'Wrong credentials' })
  }
}
export default login
