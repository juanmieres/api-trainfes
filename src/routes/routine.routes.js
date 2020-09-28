import {Router} from 'express';
const router = Router();

import * as routineController from '../controllers/Routine.controller'
import {verifyToken} from '../middlewares/authentication'
import permit from '../middlewares/authentication'

// routine
router.get('/list', [verifyToken, permit('administrator')], routineController.getRoutines)
router.get('/list/:id', [verifyToken, permit('administrator')], routineController.getRoutineById)
router.post('/create', [verifyToken, permit('administrator')], routineController.createRoutine)
router.put('/update/:id', [verifyToken, permit('administrator')], routineController.updateRoutineById)
router.delete('/delete/:id', [verifyToken, permit('administrator')], routineController.deleteRoutineById)

export default router;