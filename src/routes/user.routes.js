import {Router} from 'express';
const router = Router();

import * as userController from '../controllers/user.controller'
import {verifyToken} from '../middlewares/authentication'
import permit from '../middlewares/authentication'
import {patientSearchValidator} from '../middlewares/validators'

// administrator
router.get('/administrator/list', [verifyToken, permit('superadmin')], userController.getAdministrators)
router.get('/administrator/list/:id', [verifyToken, permit('superadmin')], userController.getAdministratorById)
router.post('/administrator/create', [verifyToken, permit('superadmin')], userController.createAdministrator)
router.put('/administrator/update/:id', [verifyToken, permit('superadmin')], userController.updateAdministratorById)
router.delete('/administrator/delete/:id', [verifyToken, permit('superadmin')], userController.deleteAdministratorById)

// patient
router.get('/patient/list', [verifyToken, permit('administrator')], userController.getPatients)
router.get('/patient/list/:id', [verifyToken, permit('administrator')], userController.getPatientById)
router.post('/patient/create', [verifyToken, permit('administrator')], userController.createPatient)
router.put('/patient/update/:id', [verifyToken, permit('administrator')], userController.updatePatientById)
router.delete('/patient/delete/:id', [verifyToken, permit('administrator')], userController.deletePatientById)

// search patient by dni
router.get('/patient/search', [verifyToken, permit('administrator'), patientSearchValidator()], userController.searchPatient)

// search all planning by patient
router.get('/patient/plannings/:id', [verifyToken, permit('administrator, patient')], userController.searchPlannings)

// search all sessions for planning by patient
router.get('/patient/sessions/:id', [verifyToken , permit('administrator, patient')], userController.searchSessions)

export default router;