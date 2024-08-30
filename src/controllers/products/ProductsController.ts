import { type Request, type Response } from 'express'
import db from '@Providers/db'
import { type Product } from '@Types/Product'
import { createProductSchema, updateProductSchema, deleteProductSchema } from '@Utils/schemas/ProductSchema'

interface Controller {
  get: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  post: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  put: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

const ProductsController = (): Controller => {
  const get = async (_req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const productsInDb = await db.products.get()
    return res.json(productsInDb)
  }
  const post = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { body } = req
    try {
      const newProducts: Product[] = await createProductSchema.validateAsync(body)

      const productsCreated = await db.products.create(newProducts)

      return res.json(productsCreated)
    } catch (e: any) {
      if (e?.details !== undefined) return res.status(400).json(e?.details)
      return res.status(500).json(e?.message)
    }
  }
  const put = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { body } = req
    try {
      const newProducts: Product = await updateProductSchema.validateAsync(body)

      const productsUpdated = await db.products.update(newProducts)

      return res.json(productsUpdated)
    } catch (e: any) {
      if (e?.details !== undefined) return res.status(400).json(e?.details)
      return res.status(500).json(e?.message)
    }
  }
  const remove = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const {
      body
    }: { body: { id: number } } = req
    try {
      await deleteProductSchema.validateAsync(body)

      await db.products.remove(body.id)

      return res.json('ok')
    } catch (e: any) {
      if (e?.details !== undefined) return res.status(400).json(e?.details)
      return res.status(500).json(e?.message)
    }
  }

  return {
    get,
    post,
    put,
    remove
  }
}
export default ProductsController
