const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectToDatabase = require('./config/db')
const cors = require('cors')

connectToDatabase()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/search', require('./routes/searchRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))
