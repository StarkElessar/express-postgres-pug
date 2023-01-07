const { Router } = require('express')
const appController = require('../controllers/appController')

const router = new Router()

router.get('/', appController.getIndexPage)

module.exports = router
