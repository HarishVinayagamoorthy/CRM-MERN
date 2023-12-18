// routes/tasks.js
import express from 'express';
import taskController from '../controllers/taskController.js';
import Auth from '../common/auth.js'
const router = express.Router();

// Create a new task (admin)
router.post('/create',Auth.validate,Auth.adminGaurd,taskController.createTask)
// Submit a task (user)
router.put('/submit/:taskId',Auth.validate ,taskController.submitTask)
router.get('/taskID/:taskId',Auth.validate ,taskController.getTaskbyTaskId)

router.get('/user',Auth.validate,taskController.getTaskById)
router.get('/tasks/status',Auth.validate,Auth.adminGaurd,taskController.getTasksByStatus)
router.get('/tasks',Auth.validate,Auth.adminGaurd,taskController.getAllTask)
router.put('/edit/:taskId',Auth.validate,Auth.adminGaurd,taskController.editTask);
router.delete('/delete/:taskId', Auth.validate,Auth.adminGaurd,taskController.deleteTask);

export default router;
