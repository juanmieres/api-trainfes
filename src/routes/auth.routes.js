import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller'

router.post('/sign-in', authController.signIn)


export default router;