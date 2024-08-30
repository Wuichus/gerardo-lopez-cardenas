import { executeQuery } from '../PGSQL'

const table = 'token'

const get = async (): Promise<any> => {
  const query = `SELECT * FROM "${table}"`

  const values: any[] = []

  const result = await executeQuery(query, values)
  return result[0]
}
const create = async (token: string): Promise<string> => {
  const query = `INSERT INTO "${table}" ("token") VALUES('${token}') RETURNING *`

  const result: string[] = await executeQuery(query, [])

  return result[0]
}
const remove = async (token: string): Promise<any> => {
  const query = `DELETE FROM "${table}" WHERE token = '${token}'`

  const values: any[] = []

  const result = await executeQuery(query, values)
  return result
}
export default { get, create, remove }
