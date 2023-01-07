const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const appRouter = require('./routes')
/**
 * Load environment variables from .env file,
 * where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 3030
/**
 * Create Express server.
 */
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
/**
 * Webpack Hot Reload configuration.
 */
if (process.env.NODE_ENV) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  )
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: '/__webpack_hmr'
    })
  )
}
/**
 * Express configuration.
 */
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: '*' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'static')))
app.use('/', appRouter)
/**
 * Start Express server.
 */
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log('=-------------------------------------------=')
      console.log(`Server started on port: http://localhost:${PORT}`)
      console.log('Press CTRL-C to stop')
      console.log('=-------------------------------------------=')
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
