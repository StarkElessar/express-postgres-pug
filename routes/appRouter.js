const { Router } = require('express')
const AppController = require('../controllers/AppController')

const router = new Router()

router.get('/', AppController.getIndexPage)
router.get('/create-user', AppController.createUser)
router.get('/users', AppController.allUsers)

module.exports = router