import express from 'express'
import getAllProducts from '../controllers/product.controller.js'

const productRoutes = express.Router()

productRoutes.get('/', getAllProducts)

export default productRoutes