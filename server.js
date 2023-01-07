require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const appRouter = require('./router')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3030
const app = express()

app.set('view engine', 'pug')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: '*', }))
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/views`))
app.use('/', appRouter)

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port: http://${HOST}:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
