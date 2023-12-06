import { Router } from 'express';
import { appVersionController } from '@/controllers/common';

const router = Router();

router.get('/version', appVersionController);

export default router;
