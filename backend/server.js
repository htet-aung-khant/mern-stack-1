import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

// Error Handler Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// product Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Env Config
dotenv.config()
// Db Connection
connectDB()

// Init Express
const app = express()

app.use(express.json())

// Home Routes
app.get('/', (req, res) => {
    res.send('API is running...')
})

// product Routes prefix with /api
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

// 404 error from Not Found
app.use(notFound)
// Error Handler from ErrorHander
app.use(errorHandler)


// PORT and ENV Variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
