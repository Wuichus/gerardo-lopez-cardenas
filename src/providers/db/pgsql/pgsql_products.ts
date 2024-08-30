import { type Product } from '@Types/Product'
import { executeQuery } from '../PGSQL'

const table = 'product'

const get = async (): Promise<any> => {
  const query = `SELECT * FROM "${table}"`

  const values: any[] = []

  const result = await executeQuery(query, values)
  return result
}

const create = async (product: Product[]): Promise<Product> => {
  const keys = Object.keys(product)
    .map(key => `"${key}"`)
    .join()

  const values = Object.values(product)

  const valuesInQuery = values.map((_, index) => `$${index + 1}`).join()

  const query = `INSERT INTO "${table}" (${keys}) VALUES(${valuesInQuery}) RETURNING *`

  const result: Product[] = await executeQuery(query, values)

  return result[0]
}

const update = async (product: Product): Promise<Product> => {
  const { id, ...updateProduct } = product

  const keys = Object.keys(updateProduct)
    .map((value, index) => `"${value}" = $${index + 1}`)
    .join()

  const values = Object.values(updateProduct)

  const query = `UPDATE "${table}" SET ${keys} WHERE "id" = ${id} returning *`

  const result: Product[] = await executeQuery(query, values)

  return result[0]
}

const remove = async (id: number): Promise<any> => {
  const query = `DELETE FROM "${table}" WHERE id = ${id}`

  const values: any[] = []

  const result = await executeQuery(query, values)
  return result
}
export default { get, create, update, remove }
