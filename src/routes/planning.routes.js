import {Router} from 'express';
const router = Router();

import * as planningController from '../controllers/planning.controller'
import {verifyToken} from '../middlewares/authentication'
import permit from '../middlewares/authentication'

// planning
router.get('/list', [verifyToken, permit('administrator')], planningController.getPlannings)
router.get('/list/:id', [verifyToken, permit('administrator')], planningController.getPlanningById)
router.post('/create', [verifyToken, permit('administrator')], planningController.createPlanning)
router.put('/update/:id', [verifyToken, permit('administrator')], planningController.updatePlanningById)
router.delete('/delete/:id', [verifyToken, permit('administrator')], planningController.deletePlanningById)

// to asign patients with plannings
// router.post('/assign/:id', [verifyToken, permit('administrator')], planningController.assignPlanning)

export default router;