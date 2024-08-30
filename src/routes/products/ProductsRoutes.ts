import ProductsController from '@Controllers/products/ProductsController'

import { Router, type Request, type Response } from 'express'

const router = Router()

const { get, post, put, remove } = ProductsController()

router.get('/products', async (req: Request, res: Response) => {
  await get(req, res)
})

router.post('/products', async (req: Request, res: Response) => {
  await post(req, res)
})

router.put('/products', async (req: Request, res: Response) => {
  await put(req, res)
})

router.delete('/products', async (req: Request, res: Response) => {
  await remove(req, res)
})

export default router
