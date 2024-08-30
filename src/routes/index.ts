import ProductRoutes from './products'
import { Router } from 'express'

const router = Router()

router.use(ProductRoutes)

export default router
