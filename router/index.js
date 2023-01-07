const { Router } = require('express')
const appController = require('../controllers/appController')

const router = new Router()

router.get('/', appController.getIndexPage)
router.get('/home', appController.home)

module.exports = router
