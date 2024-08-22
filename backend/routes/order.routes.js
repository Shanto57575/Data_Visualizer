import express from 'express'
import {
    getAllOrders,
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getCustomerLifetimeValueByCohorts,
} from '../controllers/orders.controller.js'

const orderRoutes = express.Router()

orderRoutes.get('/', getAllOrders)
orderRoutes.get('/sales-over-time', getTotalSalesOverTime)
orderRoutes.get('/sales-growth-rate', getSalesGrowthRateOverTime)
orderRoutes.get('/customer-lifetime-value-cohorts', getCustomerLifetimeValueByCohorts)

export default orderRoutes