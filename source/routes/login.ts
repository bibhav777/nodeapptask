import express from 'express';
import controller from '../controllers/auth';

const router = express.Router();

router.post('/login', controller.userLogin);
router.post('/verify/multifactor-auth', controller.verifyMultifactorAuth);
router.post('/verify/totpcode', controller.verifyTotpCode);

export = router;
