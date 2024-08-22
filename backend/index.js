import dotenv from 'dotenv'
import express from "express"
import connectDB from "./config/connectDB.js"
import customerRoutes from './routes/customer.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import cors from 'cors'

dotenv.config()

const app = express()

const allowedOrigins = [
    'https://data-visualizer3.netlify.app',
    'http://localhost:5173',
];

app.use(cors({
    origin: allowedOrigins
}));

connectDB()

app.get('/', (req, res) => {
    res.send('Server is running Fine!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/customer', customerRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})