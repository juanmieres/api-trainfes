import {Router} from 'express';
import {signInValidator} from '../middlewares/validators'

const router = Router();

import * as authController from '../controllers/auth.controller'

router.post('/sign-in', signInValidator(), authController.signIn)

export default router;