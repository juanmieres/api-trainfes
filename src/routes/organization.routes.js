import {Router} from 'express';
const router = Router();

import * as organizationController from '../controllers/organization.controller'
import {verifyToken} from '../middlewares/authentication'
import permit from '../middlewares/authentication'

router.get('/list', [verifyToken, permit('superadmin')], organizationController.getOrganizations)
router.get('/list/:id', [verifyToken, permit('superadmin')], organizationController.getOrganizationById)
router.post('/create', [verifyToken, permit('superadmin')], organizationController.createOrganization)
router.put('/update/:id', [verifyToken, permit('superadmin')], organizationController.updateOrganizationById)
router.delete('/delete/:id', [verifyToken, permit('superadmin')], organizationController.deleteOrganizationById)

export default router;