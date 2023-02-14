import { Router } from 'express'
import { UserController } from './../controllers/index.js'

const router = new Router()

router.post('/create', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUser)
router.put('/', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router
