import express  from 'express'
import UserRoutes from './user.js'
import TicketsRoutes from './tickets.js'
import TaskRoutes from './task.js'
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send(`
   Welcome to Backend of CRM `)
})
router.use('/user', UserRoutes)
router.use('/tickets', TicketsRoutes)
router.use('/task', TaskRoutes)

export default router