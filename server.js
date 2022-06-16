const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')

mongoose.connect('mongodb+srv://harry:harry@cluster0.bb6v5.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connected to MongoDB')
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/', authRoute)
app.use('/', userRoute)
