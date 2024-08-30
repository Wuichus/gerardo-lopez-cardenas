import { Pool } from 'pg'

import products from './pgsql/pgsql_products'
import tokens from './pgsql/pgsql_tokens'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, MODE } = process.env

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: Number(PGPORT),
  ssl: MODE === 'prod'
})

export const executeQuery = async (query: string, values: any[]): Promise<any[]> => {
  const client = await pool.connect()

  try {
    if (query === undefined) throw Error('You should provide query or queries')
    const result = await client.query(query, values)
    return result.rows
  } catch (error: any) {
    throw new Error(error)
  } finally {
    client.release()
  }
}

export default { products, tokens }
