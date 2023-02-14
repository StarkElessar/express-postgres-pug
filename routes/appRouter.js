import { Router } from 'express'
import { AppController } from '../controllers/index.js'

const router = new Router()

router.get('/', AppController.getIndexPage)
router.get('/create-user', AppController.createUser)
router.get('/users', AppController.allUsers)

export default router
