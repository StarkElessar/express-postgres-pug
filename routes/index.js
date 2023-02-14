import { Router } from 'express'
import userRouter from './userRouter.js'
import appRouter from './appRouter.js'

const router = new Router()

router.use('/api/user', userRouter)
router.use('/', appRouter)

export default router
