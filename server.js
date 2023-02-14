import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { webpackConfig } from './webpack.config.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/index.js'
import sequelize from './dp.js'
import { User } from './models/index.js'
import errorHandler from './middlewares/errorHandlingMiddleware.js'
/**
 * Load environment variables from .env file,
 * where API keys and passwords are configured.
 */
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compiler = webpack(webpackConfig)
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
    webpackHotMiddleware(compiler, { log: false, path: '/__webpack_hmr' })
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
app.use('/', router)
app.use(errorHandler)
/**
 * Start Express server.
 */
const startServer = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })

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
