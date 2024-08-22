import express from 'express'
import { getAllCustomers, getCustomerGeographicalDistribution, getNewCustomersOverTime, getRepeatCustomers } from '../controllers/customer.controller.js'

const customerRoutes = express.Router()

customerRoutes.get('/', getAllCustomers)
customerRoutes.get('/repeat-customers', getRepeatCustomers)
customerRoutes.get('/new-customers-over-time', getNewCustomersOverTime)
customerRoutes.get('/customer-geographical-distribution', getCustomerGeographicalDistribution)

export default customerRoutes