const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = new Router()

router.post('/create', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUser)
router.put('/', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
