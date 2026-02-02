import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as controller from '../controllers/task.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.get('/:id', controller.getTaskById);
router.patch('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);
router.post('/:id/toggle', controller.toggleTask);

export default router;
